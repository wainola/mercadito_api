const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
const signale = require('signale')
const Pool = require('pg').Pool
const Client = require('pg').Client

// MIDDLEWARES
const DB = require('./middlewares/db')

// HANDLERS
const TestHandler = require('./handlers/testHandler')
const UserHandler = require('./handlers/userHandler')

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
server.get('/api/users', UserHandler.get)
server.post('/api/users', UserHandler.create);
server.post('/api/login', UserHandler.login);

server.listen(port);
signale.watch(`Server listen on port ${port}`);