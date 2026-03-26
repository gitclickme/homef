import express from "express";
import { BookService } from "../service/book.service";
import { BookRepo } from "../repo/book.repo";

export const bookRouter = express.Router();
const bookService: BookService = new BookService(new BookRepo());
const bookPath: string = '';


bookRouter.route(`${bookPath}/:operationType/:idItem/:idVendor/:beginDate/:endDate`)
.get(async(req, res) => {
   return await bookService.bookList(req, res);
})

bookRouter.route(`${bookPath}/input`)
.post(async(req, res) => {
   return await bookService.bookInput(req, res);
})
.put(async(req, res) => {
   return await bookService.bookInputUpdate(req, res);
})

bookRouter.route(`${bookPath}/input/:idOperation`)
.delete(async(req, res) => {
   return await bookService.bookInputDelete(req, res);
})

bookRouter.route(`${bookPath}/output`)
.post(async(req, res) => {
   return await bookService.bookOutput(req, res);
})
.put(async(req, res) => {
   return await bookService.bookOutputUpdate(req, res);
})

bookRouter.route(`${bookPath}/output/:idOperation`)
.delete(async(req,res) => {
   return await bookService.bookOutputDelete(req, res);
})
