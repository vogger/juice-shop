"use strict";
/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const models = require("../models/index");
const security = require('../lib/insecurity');
const utils = require('../lib/utils');
const cache = require('../data/datacache');
const challenges = cache.challenges;
module.exports = function updateUserProfile() {
    return (req, res, next) => {
        const loggedInUser = security.authenticatedUsers.get(req.cookies.token);
        if (loggedInUser) {
            models.User.findByPk(loggedInUser.data.id).then(user => {
                utils.solveIf(challenges.csrfChallenge, () => {
                    var _a, _b;
                    return (((_a = req.headers.origin) === null || _a === void 0 ? void 0 : _a.includes('://htmledit.squarefree.com')) ||
                        ((_b = req.headers.referer) === null || _b === void 0 ? void 0 : _b.includes('://htmledit.squarefree.com'))) &&
                        req.body.username !== user.username;
                });
                user.update({ username: req.body.username }).then(newuser => {
                    newuser = utils.queryResultToJson(newuser);
                    const updatedToken = security.authorize(newuser);
                    security.authenticatedUsers.put(updatedToken, newuser);
                    res.cookie('token', updatedToken);
                    res.location(process.env.BASE_PATH + '/profile');
                    res.redirect(process.env.BASE_PATH + '/profile');
                });
            }).catch(error => {
                next(error);
            });
        }
        else {
            next(new Error('Blocked illegal activity by ' + req.connection.remoteAddress));
        }
    };
};
//# sourceMappingURL=updateUserProfile.js.map