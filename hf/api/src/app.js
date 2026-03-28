"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("./config/config"));
const item_controller_1 = require("./controller/item.controller");
const book_controller_1 = require("./controller/book.controller");
const budget_controller_1 = require("./controller/budget.controller");
const vendor_controller_1 = require("./controller/vendor.controller");
const account_controller_1 = require("./controller/account.controller");
dotenv_1.default.config();
const app = (0, express_1.default)();
const apiURL = config_1.default.apiUrl;
app.set('PORT', config_1.default.port || 443);
app.use(express_1.default.json({ limit: "20mb" }));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(`${apiURL}/v1.0/item`, item_controller_1.itemRouter);
app.use(`${apiURL}/v1.0/book`, book_controller_1.bookRouter);
app.use(`${apiURL}/v1.0/budget`, budget_controller_1.budgetRouter);
app.use(`${apiURL}/v1.0/vendor`, vendor_controller_1.vendorRouter);
app.use(`${apiURL}/v1.0/account`, account_controller_1.accountRouter);
app.get('/api/data', (req, res) => {
    res.json({
        message: 'This is some sample data from your API',
        timestamp: new Date().toISOString()
    });
});
app.use(function (req, res, next) {
    res.status(401)
        .type('json')
        .send(`{"error":"no_found in ${req.originalUrl}" } `);
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
exports.default = app;
