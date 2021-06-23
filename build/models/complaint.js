"use strict";
/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */
module.exports = (sequelize, { STRING }) => {
    const Complaint = sequelize.define('Complaint', {
        message: STRING,
        file: STRING
    });
    Complaint.associate = ({ User }) => {
        Complaint.belongsTo(User, { constraints: true, foreignKeyConstraint: true });
    };
    return Complaint;
};
//# sourceMappingURL=complaint.js.map