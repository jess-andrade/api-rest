import jwt from 'jsonwebtoken';
import User from '../models/User';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Login required'],
    });
  }
  //* to separate "beare" from the token
  const [, token] = authorization.split(' ');

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = data;

    //* I don't want to assign same token to an edited email
    //* if user doesn't exist, or id or email don't match w token
    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        errors: ['Invalid user'],
      });
    }

    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['Expired or invalid token'],
    });
  }
};
