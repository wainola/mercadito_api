// import bcrypt from 'bcrypt'
// import jwt from 'jsonwebtoken'
// import moment from 'moment'

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const moment = require('moment')

const SALT_ROUNDS = 10;
let res;

exports.create = (request, response) => {
  const { user: { email, name, password } } = request.body;
  const query = 'INSERT INTO users (email, name, hashed_password) VALUES ($1,$2,$3) RETURNING *';

  bcrypt.hash(password, SALT_ROUNDS, (err, hashedPassword) => {
    const values = [email, name, hashedPassword];
    request.pool.query(query, values, (err, result) => {
      if(err){
        res = {
          error:{
            message: 'Internal server error',
            status_code: 500
          }
        };
        return response.status(500).json(res)
      }
      const user = result.rows[0];
      res = {
        data: {
          user: {
            id: user.id,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at
          }
        }
      };

      return response.status(201).json(res)
    });
  })
}

exports.login = (request, response) => {
  const { credentials: { email, password } } = request.body;
  const dataQuery = [email];
  const query = 'SELECT * FROM users WHERE email = $1';

  request.pool.query(query, dataQuery, (err, result) => {
    if(err){
      res = {
        error: {
          message: 'Internal server error',
          status_code: 500
        }
      };
      return response.status(500).json(res);
    }

    if(result.rowCount === 0){
      res = {
        error: {
          message: 'Unauthorize. No credentials found',
          status_code: 401
        }
      }
      return response.status(422).json(res);
    }

    const user = result.rows[0];
    bcrypt.compare(password, user.hashed_password, (err, isMatch) => {
      if(!isMatch){
        res = {
          error:{
            message: 'Unprocessable entity'
          }
        };

        return response.status(422).json(res);
      }

      const jwtSchema = {
        exp: moment().add(8, 'hours').unix(),
        data: user.id,
        email: user.email,
      };

      const token = jwt.sign(jwtSchema, process.env.SECRET_KEY)
      res = {
        data: {
          token,
          email: user.email,
          id: user.id
        }
      };

      return response.status(201).json(res);
    })
  })
}