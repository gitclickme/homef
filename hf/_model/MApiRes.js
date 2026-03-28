"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MApiRes = void 0;
class MApiRes {
    trace = new Trace();
    dataList = [];
    data;
}
exports.MApiRes = MApiRes;
class Trace {
    retCode = 1;
    retMsg = '';
}
