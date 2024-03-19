const authMdw = (req, res, next) => {
    if (req.session && req.session.user) {
      return next();
    } else {
      return res.redirect("/api/views/login");
    }
  };
  
  module.exports = authMdw;
