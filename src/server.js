import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import signale from 'signale'

// MIDDLEWARES

// HANDLERS
import * as TestHandler from './handlers/TestHandler'

dotenv.config({silent: process.env.NODE_ENV !== 'development'});

const port = process.env.PORT;
const server = express();
express.json();
server.use(cors());
server.use(morgan('common'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.get('/api/test', TestHandler.testEndpoint);

server.listen(port);
signale.watch(`Server listen on port ${port}`);