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
describe('appConfiguration', () => {
    const retrieveAppConfiguration = require('../../routes/appConfiguration');
    it('should return configuration object', () => {
        this.req = {};
        this.res = { json: sinon.spy() };
        retrieveAppConfiguration()(this.req, this.res);
        expect(this.res.json).to.have.been.calledWith({ config: require('config') });
    });
});
//# sourceMappingURL=appConfigurationSpec.js.map