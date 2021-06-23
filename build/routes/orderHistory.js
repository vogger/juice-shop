"use strict";
/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("../data/mongodb");
const security = require('../lib/insecurity');
module.exports.orderHistory = function orderHistory() {
    return async (req, res, next) => {
        var _a, _b, _c;
        const loggedInUser = security.authenticatedUsers.get((_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.replace('Bearer ', ''));
        if (((_c = loggedInUser === null || loggedInUser === void 0 ? void 0 : loggedInUser.data) === null || _c === void 0 ? void 0 : _c.email) && loggedInUser.data.id) {
            const email = loggedInUser.data.email;
            const updatedEmail = email.replace(/[aeiou]/gi, '*');
            const orders = await db.orders.find({ email: updatedEmail });
            res.status(200).json({ status: 'success', data: orders });
        }
        else {
            next(new Error('Blocked illegal activity by ' + req.connection.remoteAddress));
        }
    };
};
module.exports.allOrders = function allOrders() {
    return async (req, res, next) => {
        const orders = await db.orders.find();
        res.status(200).json({ status: 'success', data: orders.reverse() });
    };
};
module.exports.toggleDeliveryStatus = function toggleDeliveryStatus() {
    return async (req, res, next) => {
        const deliveryStatus = !req.body.deliveryStatus;
        const eta = deliveryStatus ? '0' : '1';
        await db.orders.update({ _id: req.params.id }, { $set: { delivered: deliveryStatus, eta: eta } });
        res.status(200).json({ status: 'success' });
    };
};
//# sourceMappingURL=orderHistory.js.map