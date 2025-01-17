"use strict";
/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
/* jslint node: true */
const utils = require("../lib/utils");
const security = require('../lib/insecurity');
const challenges = require('../data/datacache').challenges;
module.exports = (sequelize, { STRING, DECIMAL }) => {
    const Product = sequelize.define('Product', {
        name: STRING,
        description: {
            type: STRING,
            set(description) {
                if (!utils.disableOnContainerEnv()) {
                    utils.solveIf(challenges.restfulXssChallenge, () => { return utils.contains(description, '<iframe src="javascript:alert(`xss`)">'); });
                }
                else {
                    description = security.sanitizeSecure(description);
                }
                this.setDataValue('description', description);
            }
        },
        price: DECIMAL,
        deluxePrice: DECIMAL,
        image: STRING
    }, { paranoid: true });
    Product.associate = ({ Basket, BasketItem }) => {
        Product.belongsToMany(Basket, { through: BasketItem, foreignKey: { name: 'ProductId', noUpdate: true } });
    };
    return Product;
};
//# sourceMappingURL=product.js.map