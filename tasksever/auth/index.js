import User from "../modal/user.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  let token;
  if (req.header) {
    try {
       token = req.header("token"); 
      const decoded = jwt.verify(token, process.env.JWT); 
      // Attach the authenticated user to the request
      req.user = await User.findById({_id:decoded.id}).select('-password');
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'No token, authorization denied' });
  }
};