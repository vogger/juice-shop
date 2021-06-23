"use strict";
/*
 * Copyright (c) 2014-2021 Bjoern Kimminich.
 * SPDX-License-Identifier: MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
const spawn = require("cross-spawn");
const colors = require('colors/safe');
let server, confName;
if (process.argv && process.argv.length >= 3 && process.argv[2] === 'subfolder') {
    server = require('./e2eSubfolder');
    confName = 'protractor.subfolder.conf.js';
}
else {
    server = require('../server');
    confName = 'protractor.conf.js';
}
server.start(() => {
    const protractor = spawn('protractor', [confName]);
    function logToConsole(data) {
        console.log(String(data));
    }
    protractor.stdout.on('data', logToConsole);
    protractor.stderr.on('data', logToConsole);
    protractor.on('exit', exitCode => {
        console.log(`Protractor exited with code ${exitCode} (${exitCode === 0 ? colors.green('SUCCESS') : colors.red('FAILED')})`);
        server.close(exitCode);
    });
});
//# sourceMappingURL=e2eTests.js.map