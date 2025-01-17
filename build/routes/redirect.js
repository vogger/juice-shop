"use strict";
/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("../lib/utils");
const security = require('../lib/insecurity');
const challenges = require('../data/datacache').challenges;
module.exports = function performRedirect() {
    return ({ query }, res, next) => {
        const toUrl = query.to;
        if (security.isRedirectAllowed(toUrl)) {
            utils.solveIf(challenges.redirectCryptoCurrencyChallenge, () => { return toUrl === 'https://explorer.dash.org/address/Xr556RzuwX6hg5EGpkybbv5RanJoZN17kW' || toUrl === 'https://blockchain.info/address/1AbKfgvw9psQ41NbLi8kufDQTezwG8DRZm' || toUrl === 'https://etherscan.io/address/0x0f933ab9fcaaa782d0279c300d73750e1311eae6'; });
            utils.solveIf(challenges.redirectChallenge, () => { return isUnintendedRedirect(toUrl); });
            res.redirect(toUrl);
        }
        else {
            res.status(406);
            next(new Error('Unrecognized target URL for redirect: ' + toUrl));
        }
    };
};
function isUnintendedRedirect(toUrl) {
    let unintended = true;
    for (const allowedUrl of security.redirectAllowlist) {
        unintended = unintended && !utils.startsWith(toUrl, allowedUrl);
    }
    return unintended;
}
//# sourceMappingURL=redirect.js.map