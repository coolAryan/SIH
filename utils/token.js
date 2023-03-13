const jwt = require("jsonwebtoken");

const generateTokenForUsername = (userName) => {
  const token = jwt.sign({ userName }, "4H699958924EBF5752RAA4B19393E", {
    expiresIn: 7200, //2hr
  });

  return token;
};

const verifyToken = (token) => {
  const data = jwt.verify(token, "4H699958924EBF5752RAA4B19393E");

  console.log(data);
  return data;
};

module.exports = {
  generateTokenForUsername,
  verifyToken,
};
