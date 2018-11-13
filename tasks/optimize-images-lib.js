/**
 * Tool to optimize images by:
 * - reducing too large images
 * - re-compress
 * - compares original and processed, to get the best (some cases lead to
 * originals having less quality or bigger compression than expected)
 */
'use strict';

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/**
 * @typedef {Object} FileOptimizationResult
 * @property {string} source Path to original file
 * @property {string} destination Path to destination file
 * @property {boolean} wasOptimized Whether the file was optimized or just the
 * original was used because optimization gots a bigger size.
 * @property {number} originalSize Size in bytes of the original file
 * @property {number} optimizedSize Size in bytes of the optimized file, that
 * matches the output file when wasOptimized is true, otherwise the original
 * file (and it's size) was used.
 */

/**
 * @param {Object} settings
 * @param {Size} maxSize Object with width and height properties for maximum allowed
 * image size
 * @param {string} source Folder
 * @param {string} destionation Folder
 * @param {Array<string>} extensions List of allowed extensions to be processed
 * @returns {Promise<Array<FileOptimizationResult>>} Set of results per file,
 * containing as much as processed files (excluded ones per extensions list are
 * excluded here too)
 */
module.exports = async function optimize({ maxSize, source, destination, extensions }) {
    const files = await readdir(source);
    return Promise.all(files
    .filter((fileName) => extensions.includes(path.extname(fileName)))
    .map(async (fileName) => {
        const filePath = path.join(source, fileName);
        const outPath = path.join(destination, fileName);
        // Creating a reusable sharp object for the file
        // from a buffer, so the metadata.size property is available
        const file = sharp(await readFile(filePath));
        // Get info of the file to compare later with the result
        const original = await file.metadata();
        const optimized = await optimizeFile(file, maxSize);
        return saveSmaller(original, optimized, filePath, outPath);
    }));
};

/**
 * Perform size optimizations in a file opened as a Sharp instance,
 * returning the resulting data as buffer plus info like final size
 * @param {sharp} file
 * @returns {Promise<Object>} With data {Buffer} and info {Object}
 */
async function optimizeFile(file, maxSize) {
    // Scale and re-compress file
    return file
    .resize(maxSize.width, maxSize.height, {
        // "outside" is like 'cover' in CSS (background or object-fit;
        // the "Sharp" option named "cover" does a crop too)
        fit: 'outside',
        withoutEnlargement: true
    })
    .jpeg({
        quality: 75,
        progressive: true,
        chromaSubsampling: '4:4:4',
        // Do this compression only if source is jpeg, otherwise does nothing
        force: false
    })
    .png({
        progressive: true,
        compressionLevel: 9,
        // Do this compression only if source is png, otherwise does nothing
        force: false
    })
    // If method 'withmetadata' is not called, Sharp by default does:
    // "strip all metadata and convert to the device-independent sRGB colour space."
    // "This will also convert to and add a web-friendly sRGB ICC profile"
    // @see http://sharp.pixelplumbing.com/en/stable/api-output/#withmetadata
    .toBuffer({ resolveWithObject: true });
}

/**
 * Save at outPath the smaller file comparing original and optimized
 * @param {sharp.metadata} original
 * @param {sharp.bufferAndInfo} result Optimizatino result, with processed bytes
 * as data property, metadata at info.
 * @param {string} filePath
 * @param {string} outPath
 * @returns {Promise<FileOptimizationResult>} Information of the task
 */
async function saveSmaller(original, result, filePath, outPath) {
    // Compare sizes, so we can keep with the smaller one
    const gotSmaller = original.size > result.info.size;
    if (gotSmaller) {
        // Save optimized file
        await writeFile(outPath, result.data);
    }
    // When original is smaller, copy file to new destination when different
    else if (filePath !== outPath) {
        await copyFile(filePath, outPath);
    }
    // Notice about result
    return {
        source: filePath,
        destination: outPath,
        originalSize: original.size,
        optimizedSize: result.info.size,
        wasOptimized: gotSmaller
    };
}

/// Promisified Utils

/**
 * Promisified version of fs.writeFile
 * @param {string} path
 * @param {any} data
 * @returns {Promise}
 */
function writeFile(path, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, (err) => {
            if (err) reject(err);
            else resolve();
        })
    });
}

/**
 * Promisified version of fs.copyFile
 * @param {string} source
 * @param {string} dest
 * @returns {Promise}
 */
function copyFile(source, dest) {
    return new Promise((resolve, reject) => {
        fs.copyFile(source, dest, (err) => {
            if (err) reject(err);
            else resolve();
        })
    })
}

/**
 * Promisified version of fs.readdir
 * @param {string} path
 * @returns {Promise<string[],Error>} Returns a list of file names
 */
function readdir(path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (err) reject(err);
            else resolve(files);
        })
    })
}

/**
 * Promisified version of fs.readFile
 * @param {string} path
 * @returns {Promise<(string|Buffer),Error>} Returns file content
 */
function readFile(path, options) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, options, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}
