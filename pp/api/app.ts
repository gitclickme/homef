

import express,{ Request, Response, NextFunction } from "express";

import dotenv from 'dotenv';
import ConfigEnv from "./src/config/config";
import { itemRouter } from "./src/controller/item.controller";
import { bookRouter } from "./src/controller/book.controller";
import { budgetRouter } from "./src/controller/budget.controller";
import { vendorRouter } from "./src/controller/vendor.controller";
import { accountRouter } from "./src/controller/account.controller";


dotenv.config();

const app = express();
const apiURL = process.env.URL;

app.set('port', ConfigEnv.port || 443);

app.use(express.json({limit: "20mb"}));
app.use(express.urlencoded({extended:false} ));

// routers
app.use(`${apiURL}item`, itemRouter);
app.use(`${apiURL}book`, bookRouter);
app.use(`${apiURL}budget`, budgetRouter);
app.use(`${apiURL}vendor`, vendorRouter);
app.use(`${apiURL}account`, accountRouter);


// Basic route for the root URL
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to your Node.js API with TypeScript!');
});

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


// Starting
try{
app.listen(app.get('port'), () =>{
    console.log('Server running on port', app.get('port'));
    console.log('Server environment', ConfigEnv.environment);
    console.log('Server DB_Host', ConfigEnv.dbConfig.host);
    console.log('Server DB', ConfigEnv.dbConfig.database);
});
}   
catch(err){
    console.log('Server not running', err); 
}
