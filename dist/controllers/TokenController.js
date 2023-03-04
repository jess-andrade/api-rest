"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: ['invalid credentials'],
      });
    }
    const user = await _User2.default.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        errors: ['This user does not exist'],
      });
    }

    //* if the user password is not valid
    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Invalid password'],
      });
    }
    const { id } = user;
    const token = _jsonwebtoken2.default.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token });
  }
}

exports. default = new TokenController();
