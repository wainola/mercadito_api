class DB{
  static attach(pool){
    return (req, res, next) => {
      req.pool = pool;
      next();
    }
  }
}

module.exports = DB