const jwtHelper = require("../helper/jwt.helper");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

let isAuth = async (req, res, next) => {
  const tokenFromClient =
    req.body.token ||
    req.query.token ||
    req.headers["x-access-token"] ||
    req.headers["Authorization"];
  if (tokenFromClient) {
    try {
      const decoded = await jwtHelper.verifyToken(
        tokenFromClient,
        accessTokenSecret
      );

      req.jwtDecoded = decoded;

      next();
    } catch (error) {
      console.log(`Error while verify token: ${error}`.red.bold);
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }
  } else {
    return res.status(403).send({
      message: "No token provided.",
    });
  }
};

module.exports = { isAuth };
