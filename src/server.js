import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import signale from 'signale'
import { Pool, Client } from 'pg'

// MIDDLEWARES
import DB from './middlewares/db'

// HANDLERS
import * as TestHandler from './handlers/testHandler'
import * as UserHandler from './handlers/userHandler'

dotenv.config({silent: process.env.NODE_ENV !== 'development'});

const pool = new Pool({connectionString: process.env.DATABASE_URL})

const port = process.env.PORT;
const server = express();
express.json();
server.use(cors());
server.use(morgan('common'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
server.use(DB.attach(pool));

server.get('/api/test', TestHandler.testEndpoint);
server.post('/api/users', UserHandler.create);
server.post('/api/login', UserHandler.login);

server.listen(port);
signale.watch(`Server listen on port ${port}`);