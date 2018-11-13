/**
 * Task script to optimize project images by:
 * - reducing too large images (based on purpose)
 * - re-compress
 */
'use strict';

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const maxWidth = 1008;
const maxHeight = 796;
const inputFolder = __dirname + '/../themes/loconomics/static/images/press/';
const outputFolder = __dirname + '/../themes/loconomics/static/images/press/optimized/';
const extensions = ['.jpg', '.jpeg', '.png'];

fs.readdir(inputFolder, async (err, files) => {
    if (err) {
        console.error(err);
    }
    else {
        try {
            await Promise.all(files.map(optimizeFile));
            console.log(`Optimized ${files.length} files`);
        }
        catch (ex) {
            console.error(ex);
        }
    }
});

async function optimizeFile(fileName) {
    if (!extensions.includes(path.extname(fileName))) {
        return null;
    }
    const filePath = path.join(inputFolder, fileName);
    console.log('Optimizing:', filePath);
    return await sharp(filePath)
    // "outside" is like 'cover' in CSS (background or object-fit;
    // the "Sharp" option named "cover" does a crop too)
    .resize(maxWidth, maxHeight, {
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
    // By saving to file, Sharp by default does:
    // "strip all metadata and convert to the device-independent sRGB colour space."
    // "This will also convert to and add a web-friendly sRGB ICC profile"
    // @see http://sharp.pixelplumbing.com/en/stable/api-output/#withmetadata
    .toFile(path.join(outputFolder, fileName));
}
