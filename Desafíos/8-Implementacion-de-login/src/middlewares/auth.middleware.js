const authMiddleware = (req, res, next) => {
    if (req.session && req.session.user) {
      return next();
    } else {
      return res.redirect("/api/session/login");
    }
  };
  
  module.exports = authMiddleware;