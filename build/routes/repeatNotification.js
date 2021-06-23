"use strict";
/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("../lib/utils");
module.exports = function repeatNotification() {
    return ({ query }, res) => {
        const challengeName = decodeURIComponent(query.challenge);
        const challenge = utils.findChallenge(challengeName);
        if (challenge === null || challenge === void 0 ? void 0 : challenge.solved) {
            utils.sendNotification(challenge, true);
        }
        res.sendStatus(200);
    };
};
//# sourceMappingURL=repeatNotification.js.map