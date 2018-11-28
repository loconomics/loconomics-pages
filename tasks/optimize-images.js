/**
 * Task CLI module performing optimizations of images with presets,
 * using the optimize-images-lib module.
 *
 * @example node ./optimize-images press
 * @example node ./optimize-images hero
 */
'use strict';

const optimizeImages = require('./optimize-images-lib');
const path = require('path');

const settings = {
    press: {
        maxSize: {
            width: 1008,
            height: 796
        },
        source: path.join(__dirname, '/../themes/loconomics/static/images/press/'),
        destination: path.join(__dirname, '/../themes/loconomics/static/images/press/'),
        extensions: ['.jpg', '.jpeg', '.png']
    },
    hero: {
        maxSize: {
            width: 1920,
            height: 1280
        },
        source: path.join(__dirname, '/../themes/loconomics/static/images/hero/'),
        destination: path.join(__dirname, '/../themes/loconomics/static/images/hero/'),
        extensions: ['.jpg']
    },
};

const task = process.argv[2];
if (!task || !settings.hasOwnProperty(task)) {
    console.error('Must provide a task name from:', Object.keys(settings));
    process.exit(1);
}
else {
    run(settings[task]);
}

async function run(settings) {
    try {
        console.log('Optimizing files from', settings.source);
        const results = await optimizeImages(settings);
        let delta = 0;
        results.forEach((result) => {
            const outSize = result.wasOptimized ? result.optimizedSize : result.originalSize;
            const source = path.relative(settings.source, result.source);
            const destination = path.relative(settings.source, result.destination);
            const fileDelta = result.originalSize - result.optimizedSize;
            delta += Math.max(0, fileDelta);
            console.log(`${source} ${prettyDelta(fileDelta)} ${prettyKB(result.originalSize)} -> ${prettyKB(outSize)} ${destination}`);
        });
        console.log(`Processed ${results.length} files with a full reduction of ${prettyDelta(delta)}`);
    }
    catch (ex) {
        console.error(ex);
    }
}

function prettyKB(sizeInBytes) {
    if (!sizeInBytes) return 'NONE';
    // Converted bytes into KB and rounded up to two decimals
    const kb = Math.round((sizeInBytes / 1024) * 100) / 100;
    return kb + 'KB';
}

const Reset = "\x1b[0m";
const FgRed = "\x1b[31m";
const FgGreen = "\x1b[32m";
const FgYellow = "\x1b[33m";

function prettyDelta(sizeInBytes) {
    if (sizeInBytes === 0) {
        return FgYellow + 'SAME' + Reset;
    }
    else if (sizeInBytes < 0) {
        return FgRed + prettyKB(sizeInBytes) + Reset;
    }
    else {
        return FgGreen + prettyKB(sizeInBytes) + Reset;
    }
}
