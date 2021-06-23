"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */
const express_1 = __importDefault(require("express"));
const insecurity_1 = __importDefault(require("../lib/insecurity"));
const path_1 = __importDefault(require("path"));
const challenges = require('../data/datacache').challenges;
const models = require('../models/index');
const utils = require('../lib/utils');
const router = express_1.default.Router();
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', async (req, res, next) => {
    const loggedInUser = insecurity_1.default.authenticatedUsers.get(req.cookies.token);
    if (!loggedInUser) {
        next(new Error('Blocked illegal activity by ' + req.connection.remoteAddress));
        return;
    }
    const email = loggedInUser.data.email;
    try {
        const answer = await models.SecurityAnswer.findOne({
            include: [{
                    model: models.User,
                    where: { email }
                }]
        });
        const question = await models.SecurityQuestion.findByPk(answer.SecurityQuestionId);
        res.render('dataErasureForm', { userEmail: email, securityQuestion: question.dataValues.question });
    }
    catch (error) {
        next(error);
    }
});
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', async (req, res, next) => {
    const loggedInUser = insecurity_1.default.authenticatedUsers.get(req.cookies.token);
    if (!loggedInUser) {
        next(new Error('Blocked illegal activity by ' + req.connection.remoteAddress));
        return;
    }
    try {
        await models.PrivacyRequest.create({
            UserId: loggedInUser.data.id,
            deletionRequested: true
        });
        res.clearCookie('token');
        if (req.body.layout !== undefined) {
            const filePath = path_1.default.resolve(req.body.layout).toLowerCase();
            const isForbiddenFile = (filePath.includes('ftp') || filePath.includes('ctf.key') || filePath.includes('encryptionkeys'));
            if (!isForbiddenFile) {
                res.render('dataErasureResult', {
                    ...req.body
                }, (error, html) => {
                    if (!html || error) {
                        next(new Error(error));
                    }
                    else {
                        const sendlfrResponse = html.slice(0, 100) + '......';
                        res.send(sendlfrResponse);
                        utils.solve(challenges.lfrChallenge);
                    }
                });
            }
            else {
                next(new Error('File access not allowed'));
            }
        }
        else {
            res.render('dataErasureResult', {
                ...req.body
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=dataErasure.js.map