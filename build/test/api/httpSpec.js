"use strict";
/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const frisby = require("frisby");
const URL = 'http://localhost:3000';
describe('HTTP', () => {
    it('response must contain CORS header allowing all origins', () => {
        return frisby.get(URL)
            .expect('status', 200)
            .expect('header', 'Access-Control-Allow-Origin', '*');
    });
    it('response must contain sameorigin frameguard header', () => {
        return frisby.get(URL)
            .expect('status', 200)
            .expect('header', 'X-Frame-Options', 'sameorigin');
    });
    it('response must contain CORS header allowing all origins', () => {
        return frisby.get(URL)
            .expect('status', 200)
            .expect('header', 'X-Content-Type-Options', 'nosniff');
    });
    it('response must not contain XSS protection header', () => {
        return frisby.get(URL)
            .expect('status', 200)
            .expectNot('header', 'X-XSS-Protection');
    });
});
//# sourceMappingURL=httpSpec.js.map