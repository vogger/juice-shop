"use strict";
/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */
describe('/#/tokensale-ico-ea', () => {
    describe('challenge "tokenSale"', () => {
        it('should be possible to access token sale section even when not authenticated', () => {
            browser.get(`${protractor.basePath}/#/tokensale-ico-ea`);
            expect(browser.getCurrentUrl()).toMatch(/\/tokensale-ico-ea/);
        });
        protractor.expect.challengeSolved({ challenge: 'Blockchain Hype' });
    });
});
//# sourceMappingURL=tokenSaleSpec.js.map