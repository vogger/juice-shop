"use strict";
/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
const replace = require('replace');
const utils = require('../utils');
const customizeEasterEgg = () => {
    if (config.has('application.easterEggPlanet.overlayMap')) {
        let overlay = config.get('application.easterEggPlanet.overlayMap');
        if (utils.isUrl(overlay)) {
            const overlayPath = overlay;
            overlay = utils.extractFilename(overlay);
            utils.downloadToFile(overlayPath, 'frontend/dist/frontend/assets/private/' + overlay);
        }
        replaceImagePath(overlay);
    }
    if (config.has('application.easterEggPlanet.name')) {
        replaceThreeJsTitleTag();
    }
};
const replaceImagePath = (overlay) => {
    const textureDeclaration = 'orangeTexture = THREE.ImageUtils.loadTexture("/assets/private/' + overlay + '");';
    replace({
        regex: /orangeTexture = .*;/,
        replacement: textureDeclaration,
        paths: ['frontend/dist/frontend/assets/private/threejs-demo.html'],
        recursive: false,
        silent: true
    });
};
const replaceThreeJsTitleTag = () => {
    const threeJsTitleTag = '<title>Welcome to Planet ' + config.get('application.easterEggPlanet.name') + '</title>';
    replace({
        regex: /<title>.*<\/title>/,
        replacement: threeJsTitleTag,
        paths: ['frontend/dist/frontend/assets/private/threejs-demo.html'],
        recursive: false,
        silent: true
    });
};
module.exports = customizeEasterEgg;
//# sourceMappingURL=customizeEasterEgg.js.map