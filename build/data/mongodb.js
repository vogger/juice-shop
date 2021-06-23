"use strict";
/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const MarsDB = require("marsdb");
const reviews = new MarsDB.Collection('posts');
const orders = new MarsDB.Collection('orders');
const db = {
    reviews,
    orders
};
module.exports = db;
//# sourceMappingURL=mongodb.js.map