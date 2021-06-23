"use strict";
/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */
module.exports = (sequelize, { STRING }) => {
    const Basket = sequelize.define('Basket', {
        coupon: STRING
    });
    Basket.associate = ({ User, Product, BasketItem }) => {
        Basket.belongsTo(User, { constraints: true, foreignKeyConstraint: true });
        Basket.belongsToMany(Product, { through: BasketItem, foreignKey: { name: 'BasketId', noUpdate: true } });
    };
    return Basket;
};
//# sourceMappingURL=basket.js.map