"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restCodeConverter = restCodeConverter;
function restCodeConverter(errCode) {
    switch (errCode) {
        case -404:
            return 404;
        case -409:
            return 409;
        case -400:
            return 400;
        default:
            if (errCode < 0) {
                return 501;
            }
            return 200;
    }
}
