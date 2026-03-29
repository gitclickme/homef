import app from './app';
import ConfigEnv from './config/config';
import logger from './config/logger';


const startServer = () =>{
// Starting
try{
     const server = app.listen(ConfigEnv.port, () =>{
                logger.info(`Server environment:${ConfigEnv.environment}`);
                logger.info(`Server environment:${ConfigEnv.environment}`);
                logger.info(`Server running on port:${ConfigEnv.port}/${ConfigEnv.apiUrl}`);
                logger.info(`Server DB_Host:${ConfigEnv.dbConfig.host}`);
                logger.info(`Server DB:${ConfigEnv.dbConfig.database}`);
               });
         
        process.on('unhandledRejection', (err: Error) => {
            logger.error('UNHANDLED REJECTION', 'UNHANDLED REJECTION! 💥 Shutting down...');
            logger.error(err.name, err.message);
            server.close(() => {
                  process.exit(1);
            });
          });
    }   
    catch(err){
      logger.error('Server not running', err); 
    };
  }

  startServer();

      
