"use strict";
/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const models = require("../models/index");
const utils = require('../lib/utils');
exports.getRecycleItem = () => (req, res) => {
    models.Recycle.findAll({
        where: {
            id: JSON.parse(req.params.id)
        }
    }).then((Recycle) => {
        return res.send(utils.queryResultToJson(Recycle));
    });
};
exports.blockRecycleItems = () => (req, res) => {
    const errMsg = { err: 'Sorry, this endpoint is not supported.' };
    return res.send(utils.queryResultToJson(errMsg));
};
//# sourceMappingURL=recycles.js.map