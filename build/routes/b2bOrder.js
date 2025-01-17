"use strict";
/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vm = require("vm");
const utils = require('../lib/utils');
const security = require('../lib/insecurity');
const safeEval = require('notevil');
const challenges = require('../data/datacache').challenges;
module.exports = function b2bOrder() {
    return ({ body }, res, next) => {
        var _a;
        if (!utils.disableOnContainerEnv()) {
            const orderLinesData = body.orderLinesData || '';
            try {
                const sandbox = { safeEval, orderLinesData };
                vm.createContext(sandbox);
                vm.runInContext('safeEval(orderLinesData)', sandbox, { timeout: 2000 });
                res.json({ cid: body.cid, orderNo: uniqueOrderNumber(), paymentDue: dateTwoWeeksFromNow() });
            }
            catch (err) {
                if ((_a = err.message) === null || _a === void 0 ? void 0 : _a.match(/Script execution timed out.*/)) {
                    utils.solveIf(challenges.rceOccupyChallenge, () => { return true; });
                    res.status(503);
                    next(new Error('Sorry, we are temporarily not available! Please try again later.'));
                }
                else {
                    utils.solveIf(challenges.rceChallenge, () => { return err.message === 'Infinite loop detected - reached max iterations'; });
                    next(err);
                }
            }
        }
        else {
            res.json({ cid: body.cid, orderNo: uniqueOrderNumber(), paymentDue: dateTwoWeeksFromNow() });
        }
    };
    function uniqueOrderNumber() {
        return security.hash(new Date() + '_B2B');
    }
    function dateTwoWeeksFromNow() {
        return new Date(new Date().getTime() + (14 * 24 * 60 * 60 * 1000)).toISOString();
    }
};
//# sourceMappingURL=b2bOrder.js.map