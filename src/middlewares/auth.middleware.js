import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protect = async (req, res, next) => {
    let token;
  
    // Check if the token is sent in the header and starts with 'Bearer'
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        // Get token from header (e.g., "Bearer eyJhbGciOi...")
        token = req.headers.authorization.split(' ')[1];
  
        // Verify the token using our secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
        // Find the user by the ID from the token payload
        // Attach the user to the request object, excluding the password
        req.user = await User.findById(decoded.id).select('-password');
  
        next(); // Move on to the next function (the controller)
      } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Not authorized, token failed' });
      }
    }
  
    if (!token) {
      res.status(401).json({ message: 'Not authorized, no token' });
    }
  };
  export  {protect};