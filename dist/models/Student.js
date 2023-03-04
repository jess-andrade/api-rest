"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Student extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      name: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 50],
            msg: 'Name must be between 3 and 50 characteres.',
          },
        },
      },
      lastname: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 50],
            msg: 'Last name must be between 3 and 50 characteres.',
          },
        },
      },
      email: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        unique: {
          msg: 'email already exists',
        },
        validate: {
          isEmail: {
            msg: 'Invalid E-mail.',
          },
        },
      },
      age: {
        type: _sequelize2.default.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'Age must be a whole number',
          },
        },
      },
      weight: {
        type: _sequelize2.default.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'Weight must be a number',
          },
        },
      },
      height: {
        type: _sequelize2.default.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'Weight must be a number',
          },
        },
      },
    }, {
      sequelize,
    });
    return this;
  }

  // maybe it doesn't work well now
  static associate(models) {
    this.hasMany(models.Photo, { foreignKey: 'student_id' });
  }
} exports.default = Student;
