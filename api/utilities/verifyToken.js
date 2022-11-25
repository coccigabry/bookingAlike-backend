import jwt from 'jsonwebtoken';
import { createError } from '../utilities/error.js';


// CHECK IF LOGGED IN
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return next(createError(401, "You are not authenticated"));
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return next(createError(403, "Token not valid"));
      req.user = user;
      next();
    });
};

// VERIFY USER PERMISSIONS
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        return next(createError(403, "You can not perform this action"));
      }
    });
};

// VERIFY IF ADMIN
export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        return next(createError(403, "Only Admins perform this action"));
      }
    });
};