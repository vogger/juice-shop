"use strict";
/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const models = require("../models/index");
const utils = require('../lib/utils');
const security = require('../lib/insecurity');
module.exports = function retrieveUserList() {
    return (req, res, next) => {
        models.User.findAll().then(users => {
            const usersWithLoginStatus = utils.queryResultToJson(users);
            usersWithLoginStatus.data.forEach(user => {
                user.token = security.authenticatedUsers.tokenOf(user);
                user.password = user.password ? user.password.replace(/./g, '*') : null;
                user.totpSecret = user.totpSecret ? user.totpSecret.replace(/./g, '*') : null;
            });
            res.json(usersWithLoginStatus);
        }).catch(error => {
            next(error);
        });
    };
};
//# sourceMappingURL=authenticatedUsers.js.map