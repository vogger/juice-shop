"use strict";
/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */
module.exports = (sequelize, { INTEGER, BOOLEAN }) => {
    const PrivacyRequest = sequelize.define('PrivacyRequest', {
        UserId: { type: INTEGER },
        deletionRequested: { type: BOOLEAN, defaultValue: false }
    });
    PrivacyRequest.associate = ({ User }) => {
        PrivacyRequest.belongsTo(User, { constraints: true, foreignKeyConstraint: true });
    };
    return PrivacyRequest;
};
//# sourceMappingURL=privacyRequests.js.map