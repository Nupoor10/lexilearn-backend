const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization'); 
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized - Missing Token"
        });
    }

    const decodedToken = jwt.verify(token, SECRET);
    if (!decodedToken || !decodedToken.userId) {
        return res.status(401).json({
            message: 'Unauthorized - Invalid token'
        });
    }
    
    req.user = decodedToken.userId;
    next();
  } catch (error) {
      console.error(error);
      return res.status(500).json({
          message: "Error in authorization",
          error: error.message
      });
  }
};

module.exports = authMiddleware;
