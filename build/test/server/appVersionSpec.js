"use strict";
/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const sinon = require("sinon");
const chai = require('chai');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);
describe('appVersion', () => {
    const retrieveAppVersion = require('../../routes/appVersion');
    it('should return version specified in package.json', () => {
        this.req = {};
        this.res = { json: sinon.spy() };
        retrieveAppVersion()(this.req, this.res);
        expect(this.res.json).to.have.been.calledWith({ version: require('../../package.json').version });
    });
});
//# sourceMappingURL=appVersionSpec.js.map