function AuthMiddleware(req, res, next) {
    if (req.session?.user === "Ronki" && req.session.admin) {
        return next();
    }

    return res.status(401).send("You are not authorized to access this area");
}

module.exports = AuthMiddleware;