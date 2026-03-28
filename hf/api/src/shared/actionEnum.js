"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enumAction = void 0;
var enumAction;
(function (enumAction) {
    enumAction[enumAction["delivery"] = 1] = "delivery";
    enumAction[enumAction["updateDelivery"] = 2] = "updateDelivery";
    enumAction[enumAction["cancelDelivery"] = 3] = "cancelDelivery";
    enumAction[enumAction["closeDelivery"] = 4] = "closeDelivery";
    enumAction[enumAction["productionList"] = 5] = "productionList";
    enumAction[enumAction["productionDist"] = 6] = "productionDist";
})(enumAction || (exports.enumAction = enumAction = {}));
