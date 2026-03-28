"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailTestConfig = void 0;
exports.mailTestConfig = {
    host: 'mail.miamfs.com',
    port: 465,
    secure: false,
    auth: {
        user: 'donotreplay@miamfs.com',
        pass: 'mailTesting20@$',
    },
    tls: {
        ciphers: 'SSLv3'
    }
};
