"use strict";
/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */
module.exports = (sequelize, { INTEGER }) => {
    const Wallet = sequelize.define('Wallet', {
        balance: {
            type: INTEGER,
            validate: {
                isInt: true
            },
            defaultValue: 0
        }
    });
    Wallet.associate = ({ User }) => {
        Wallet.belongsTo(User, { constraints: true, foreignKeyConstraint: true });
    };
    return Wallet;
};
//# sourceMappingURL=wallet.js.map