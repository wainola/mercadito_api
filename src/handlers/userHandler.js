import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import moment from 'moment'

const SALT_ROUNDS = 10;
let res;

export const create = (request, response) => {
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