"use strict";
/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const utils = require('../lib/utils');
const challenges = require('../data/datacache').challenges;
const libxml = require('libxmljs2');
const os = require('os');
const vm = require('vm');
const unzipper = require('unzipper');
const path = require('path');
function matchesSystemIniFile(text) {
    const match = text.match(/(; for 16-bit app support|drivers|mci|driver32|386enh|keyboard|boot|display)/gi);
    return match && match.length >= 2;
}
function matchesEtcPasswdFile(text) {
    const match = text.match(/\w*:\w*:\d*:\d*:\w*:.*/gi);
    return match && match.length >= 2;
}
function ensureFileIsPassed({ file }, res, next) {
    if (file) {
        next();
    }
}
// vuln-code-snippet start fileWriteChallenge
function handleZipFileUpload({ file }, res, next) {
    if (utils.endsWith(file.originalname.toLowerCase(), '.zip')) {
        if (file.buffer && !utils.disableOnContainerEnv()) { // vuln-code-snippet hide-line
            const buffer = file.buffer;
            const filename = file.originalname.toLowerCase();
            const tempFile = path.join(os.tmpdir(), filename);
            fs.open(tempFile, 'w', function (err, fd) {
                if (err != null) {
                    next(err);
                }
                fs.write(fd, buffer, 0, buffer.length, null, function (err) {
                    if (err != null) {
                        next(err);
                    }
                    fs.close(fd, function () {
                        fs.createReadStream(tempFile)
                            .pipe(unzipper.Parse()) // vuln-code-snippet vuln-line fileWriteChallenge
                            .on('entry', function (entry) {
                            const fileName = entry.path;
                            const absolutePath = path.resolve('uploads/complaints/' + fileName);
                            utils.solveIf(challenges.fileWriteChallenge, () => { return absolutePath === path.resolve('ftp/legal.md'); }); // vuln-code-snippet hide-line
                            if (absolutePath.includes(path.resolve('.'))) {
                                entry.pipe(fs.createWriteStream('uploads/complaints/' + fileName).on('error', function (err) { next(err); })); // vuln-code-snippet vuln-line fileWriteChallenge
                            }
                            else {
                                entry.autodrain();
                            }
                        }).on('error', function (err) { next(err); });
                    });
                });
            });
        } // vuln-code-snippet hide-line
        res.status(204).end();
    }
    else {
        next();
    }
}
// vuln-code-snippet end fileWriteChallenge
function checkUploadSize({ file }, res, next) {
    utils.solveIf(challenges.uploadSizeChallenge, () => { return file.size > 100000; });
    next();
}
function checkFileType({ file }, res, next) {
    const fileType = file.originalname.substr(file.originalname.lastIndexOf('.') + 1).toLowerCase();
    utils.solveIf(challenges.uploadTypeChallenge, () => {
        return !(fileType === 'pdf' || fileType === 'xml' || fileType === 'zip');
    });
    next();
}
function handleXmlUpload({ file }, res, next) {
    if (utils.endsWith(file.originalname.toLowerCase(), '.xml')) {
        utils.solveIf(challenges.deprecatedInterfaceChallenge, () => { return true; });
        if (file.buffer && !utils.disableOnContainerEnv()) { // XXE attacks in Docker/Heroku containers regularly cause "segfault" crashes
            const data = file.buffer.toString();
            try {
                const sandbox = { libxml, data };
                vm.createContext(sandbox);
                const xmlDoc = vm.runInContext('libxml.parseXml(data, { noblanks: true, noent: true, nocdata: true })', sandbox, { timeout: 2000 });
                const xmlString = xmlDoc.toString(false);
                utils.solveIf(challenges.xxeFileDisclosureChallenge, () => { return (matchesSystemIniFile(xmlString) || matchesEtcPasswdFile(xmlString)); });
                res.status(410);
                next(new Error('B2B customer complaints via file upload have been deprecated for security reasons: ' + utils.trunc(xmlString, 400) + ' (' + file.originalname + ')'));
            }
            catch (err) {
                if (utils.contains(err.message, 'Script execution timed out')) {
                    if (utils.notSolved(challenges.xxeDosChallenge)) {
                        utils.solve(challenges.xxeDosChallenge);
                    }
                    res.status(503);
                    next(new Error('Sorry, we are temporarily not available! Please try again later.'));
                }
                else {
                    res.status(410);
                    next(new Error('B2B customer complaints via file upload have been deprecated for security reasons: ' + err.message + ' (' + file.originalname + ')'));
                }
            }
        }
        else {
            res.status(410);
            next(new Error('B2B customer complaints via file upload have been deprecated for security reasons (' + file.originalname + ')'));
        }
    }
    res.status(204).end();
}
module.exports = {
    ensureFileIsPassed,
    handleZipFileUpload,
    checkUploadSize,
    checkFileType,
    handleXmlUpload
};
//# sourceMappingURL=fileUpload.js.map