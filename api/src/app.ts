import express,{ Request, Response, NextFunction } from "express";

import dotenv from 'dotenv';
import ConfigEnv from "./config/config";
import { itemRouter } from "./controller/item.controller";
import { bookRouter } from "./controller/book.controller";
import { budgetRouter } from "./controller/budget.controller";
import { vendorRouter } from "./controller/vendor.controller";
import { accountRouter } from "./controller/account.controller";
import logger from "./config/logger";

dotenv.config();

const app = express();
const apiURL = ConfigEnv.apiUrl;

app.set('PORT', ConfigEnv.port || 443);

app.use(express.json({limit: "20mb"}));
app.use(express.urlencoded({extended:false} ));

// routers
app.use(`${apiURL}/v1.0/item`, itemRouter);
app.use(`${apiURL}/v1.0/book`, bookRouter);
app.use(`${apiURL}/v1.0/budget`, budgetRouter);
app.use(`${apiURL}/v1.0/vendor`, vendorRouter);
app.use(`${apiURL}/v1.0/account`, accountRouter);


// Example API route (existing)
app.get('/api/data', (req: Request, res: Response) => {
  res.json({
    message: 'This is some sample data from your API',
    timestamp: new Date().toISOString()
  });
});

//app.use(routeGuard);
//app.use('/api/v1.0/order', orderRouter);
//app.use('/api/v1.0/production', productionRouter);
//app.use('/api/v1.0/mail', mailRoute);

app.use(function(req, res, next){
    res.status(401)
    .type('json')
    .send(`{"error":"no_found in ${req.originalUrl}" } `);
});


  // Global error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


export default app;