"use strict";
/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const models = require("../models/index");
const utils = require('../lib/utils');
const security = require('../lib/insecurity');
const challenges = require('../data/datacache').challenges;
module.exports = function retrieveBasket() {
    return (req, res, next) => {
        const id = req.params.id;
        models.Basket.findOne({ where: { id }, include: [{ model: models.Product, paranoid: false }] })
            .then(basket => {
            /* jshint eqeqeq:false */
            utils.solveIf(challenges.basketAccessChallenge, () => {
                const user = security.authenticatedUsers.from(req);
                return user && id && id !== 'undefined' && id !== 'null' && id !== 'NaN' && user.bid && user.bid != id; // eslint-disable-line eqeqeq
            });
            if ((basket === null || basket === void 0 ? void 0 : basket.Products) && basket.Products.length > 0) {
                for (let i = 0; i < basket.Products.length; i++) {
                    basket.Products[i].name = req.__(basket.Products[i].name);
                }
            }
            res.json(utils.queryResultToJson(basket));
        }).catch(error => {
            next(error);
        });
    };
};
//# sourceMappingURL=basket.js.map