const jwt = require("jsonwebtoken");

const authorize = async (req, res, next) => {
  let token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, "masai");
    req.body.user = decoded.id;
    next();
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = authorize;
