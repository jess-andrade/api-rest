"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

 class User extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      name: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 50],
            msg: 'The name must be between 3 and 50 characters',
          },
        },

      },
      email: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        unique: {
          msg: 'This e-mail is already registered',
        },
        validate: {
          isEmail: {
            msg: 'Invalid e-mail',
          },
        },
      },
      password_hash: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
      },
      password: {
        type: _sequelize2.default.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 30],
            msg: 'The password must be between 6 and 30 characters',
          },
        },
      },
    }, {
      sequelize,
    });

    //* hashing password and fill password_hash
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
      }
    });
    return this;
  }

  // token - returns a promise : check password
  passwordIsValid(password) {
    return _bcryptjs2.default.compare(password, this.password_hash);
  }
} exports.default = User;
