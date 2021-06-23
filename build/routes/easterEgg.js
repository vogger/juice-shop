"use strict";
/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const utils = require('../lib/utils');
const challenges = require('../data/datacache').challenges;
module.exports = function serveEasterEgg() {
    return (req, res) => {
        utils.solveIf(challenges.easterEggLevelTwoChallenge, () => { return true; });
        res.sendFile(path.resolve('frontend/dist/frontend/assets/private/threejs-demo.html'));
    };
};
//# sourceMappingURL=easterEgg.js.map