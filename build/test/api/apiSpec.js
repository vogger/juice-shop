"use strict";
/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const frisby = require("frisby");
const config = require('config');
const API_URL = 'http://localhost:3000/api';
const REST_URL = 'http://localhost:3000/rest';
describe('/api', () => {
    it('GET error when query /api without actual resource', () => {
        return frisby.get(API_URL)
            .expect('status', 500);
    });
});
describe('/rest', () => {
    it('GET error message with information leakage when calling unrecognized path with /rest in it', () => {
        return frisby.get(REST_URL + '/unrecognized')
            .expect('status', 500)
            .expect('bodyContains', '<h1>' + config.get('application.name') + ' (Express')
            .expect('bodyContains', 'Unexpected path: /rest/unrecognized');
    });
});
//# sourceMappingURL=apiSpec.js.map