const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  const expireValue = process.env.JWT_EXPIRE || "30d";

  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: expireValue,
    }
  );
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
