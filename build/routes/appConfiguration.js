"use strict";
/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
module.exports = function retrieveAppConfiguration() {
    return (req, res) => {
        res.json({ config });
    };
};
//# sourceMappingURL=appConfiguration.js.map