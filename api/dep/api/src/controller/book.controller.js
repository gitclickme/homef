"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_service_1 = require("../service/book.service");
const book_repo_1 = require("../repo/book.repo");
exports.bookRouter = express_1.default.Router();
const bookService = new book_service_1.BookService(new book_repo_1.BookRepo());
const bookPath = '';
exports.bookRouter.route(`${bookPath}/:operationType/:idItem/:idVendor/:beginDate/:endDate`)
    .get(async (req, res) => {
    return await bookService.bookList(req, res);
});
exports.bookRouter.route(`${bookPath}/input`)
    .post(async (req, res) => {
    return await bookService.bookInput(req, res);
})
    .put(async (req, res) => {
    return await bookService.bookInputUpdate(req, res);
});
exports.bookRouter.route(`${bookPath}/input/:idOperation`)
    .delete(async (req, res) => {
    return await bookService.bookInputDelete(req, res);
});
exports.bookRouter.route(`${bookPath}/output`)
    .post(async (req, res) => {
    return await bookService.bookOutput(req, res);
})
    .put(async (req, res) => {
    return await bookService.bookOutputUpdate(req, res);
});
exports.bookRouter.route(`${bookPath}/output/:idOperation`)
    .delete(async (req, res) => {
    return await bookService.bookOutputDelete(req, res);
});
