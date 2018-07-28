const {
  Pool
} = require('pg')

class DB {
  constructor() {
    this.client = new Pool({
      connectionString: process.env.DATABASE_URL
    })
    return this.client
  }
  // static client(){
  //   let cliente = this.client
  //   return cliente
  // }

  static msg() {
    console.log('mensaje')
  }
}

module.exports = DB