"use strict";
/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
/* jslint node: true */
const fs = require("fs");
const path = require('path');
const sequelizeNoUpdateAttributes = require('sequelize-notupdate-attributes');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    retry: {
        match: [
            /SQLITE_BUSY/
        ],
        name: 'query',
        max: 5
    },
    transactionType: 'IMMEDIATE',
    storage: 'data/juiceshop.sqlite',
    logging: false
});
sequelizeNoUpdateAttributes(sequelize);
const db = {};
fs.readdirSync(__dirname)
    .filter(file => (file.match(/\.[jt]s$/) != null) && !file.includes('index.'))
    .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
});
Object.keys(db).forEach(modelName => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
//# sourceMappingURL=index.js.map