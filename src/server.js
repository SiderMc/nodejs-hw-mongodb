import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import env from './utils/env.js';
import { getAllContacts, getContactById } from './services/contacts.js';

const setupServer = () => {
  const app = express();
  app.use(cors());

  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });
  // app.use(logger())
  app.get('/', (req, res) => {
    return res.json({
      status: 200,
      message: 'Home Page !',
    });
  });
  app.get('/contacts', async (req, res) => {
    const data = await getAllContacts();
    return res.json({
      status: 200,
      message: 'Successfully find movies !',
      data,
    });
  });
  app.get('/contacts/:id', async (req, res) => {
    const { id } = req.params;
    const data = await getContactById(id);

    if (!data) {
      return res.status(404).json({
        status: 404,
        message: `Contact ${id} not found !`,
      });
    }
    res.json({
      status: 200,
      message: `Successfully found contact with id ${id}!`,
      data,
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      status: 404,
      message: `${req.url} not found !`,
    });
  });

  const port = Number(env('PORT', 3000));
  app.listen(port, () => console.log(`Web Server is running on port ${port}`));
};

export default setupServer;
