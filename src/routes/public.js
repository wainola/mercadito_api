// import UserHandler from '../handlers/userHandler'
const UserHandler = require('../handlers/userHandler')

const publicRoutes = [
  {
    method: 'post',
    paht: '/users',
    handler: UserHandler.create
  },
  {
    method: 'post',
    path: '/login',
    handler: UserHandler.login
  }
]