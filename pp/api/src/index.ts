// File: src/index.ts
import express, { Request, Response, NextFunction } from 'express';
import ConfigEnv from "./config/config";
import UserService from './service/userService';
import logger from './config/logger';
import userRoutes from './routes/userRoutes';
import createAuthRoutes from './routes/authRoute';
import authMiddleware from './middleware/authMiddleware';
import dotenv from 'dotenv';
import { itemRouter } from "./controller/item.controller";
import { bookRouter } from "./controller/book.controller";
import { budgetRouter } from "./controller/budget.controller";
import { vendorRouter } from "./controller/vendor.controller";
import { accountRouter } from "./controller/account.controller";

      
// Load environment variables from .env file
dotenv.config();

const app = express();

const apiURL = ConfigEnv.apiUrl;

app.set('port', ConfigEnv.port || 443);
app.use(express.json({limit: "20mb"}));
app.use(express.urlencoded({extended:false} ));

// Basic route for the root URL
app.get('/', (req: Request, res: Response) => {
   res.json({
    message: 'I am node.js alive from ',
    timestamp: new Date().toISOString()
  });
});

// Example API route (existing)
app.get(`${apiURL}data`, (req: Request, res: Response) => {
  res.json({
    message: 'I am API alive',
    timestamp: new Date().toISOString()
  });
});



// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});


//Public api routes
app.use('/api/auth', createAuthRoutes());
app.use(`${apiURL}item`, itemRouter);
app.use(`${apiURL}book`, bookRouter);
app.use(`${apiURL}budget`, budgetRouter);
app.use(`${apiURL}vendor`, vendorRouter);
app.use(`${apiURL}account`, accountRouter);




//Restricted api routes
//app.use(routeGuard);
 app.use(authMiddleware);

// 401 
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
    console.log("Server Url", ConfigEnv.apiUrl);
    console.log('Server environment', ConfigEnv.environment);
    console.log('Server DB_Host', ConfigEnv.dbConfig.host);
    console.log('Server DB', ConfigEnv.dbConfig.database);
});
}   
catch(err){
    console.log('Server not running', err); 
}





