import express from 'express';
import cors from 'cors';
import env from './utils/env.js';
import contactsRouters from './routers/contacts.js';
import logger from './middlewares/logger.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import authRouter from './routers/auth.js';
import cookieParser from 'cookie-parser';


const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser())
  // app.use(logger);
  app.use('/contacts', contactsRouters);
  app.use('/auth', authRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);
  const port = Number(env('PORT', 3000));
  app.listen(port, () => console.log(`Web Server is running on port ${port}`));
};
export default setupServer;