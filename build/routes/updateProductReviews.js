"use strict";
/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("../lib/utils");
const challenges = require('../data/datacache').challenges;
const db = require('../data/mongodb');
const security = require('../lib/insecurity');
// vuln-code-snippet start noSqlReviewsChallenge forgedReviewChallenge noSqlCommandChallenge
module.exports = function productReviews() {
    return (req, res, next) => {
        const user = security.authenticatedUsers.from(req); // vuln-code-snippet vuln-line forgedReviewChallenge
        db.reviews.update({ _id: req.body.id }, // vuln-code-snippet vuln-line noSqlReviewsChallenge noSqlCommandChallenge
        { $set: { message: req.body.message } }, { multi: true }).then(result => {
            utils.solveIf(challenges.noSqlReviewsChallenge, () => { return result.modified > 1; }); // vuln-code-snippet hide-line
            utils.solveIf(challenges.forgedReviewChallenge, () => { return (user === null || user === void 0 ? void 0 : user.data) && result.original[0].author !== user.data.email && result.modified === 1; }); // vuln-code-snippet hide-line
            res.json(result);
        }, err => {
            res.status(500).json(err);
        });
    };
};
// vuln-code-snippet end noSqlReviewsChallenge forgedReviewChallenge noSqlCommandChallenge
//# sourceMappingURL=updateProductReviews.js.map