class DB{
  static attach(pool){
    return (req, res, next) => {
      req.pool = pool;
      next();
    }
  }
}

// export default DB;
module.exports = DB