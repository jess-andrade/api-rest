import Sequelize, { Model } from 'sequelize';

export default class Student extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 50],
            msg: 'Name must be between 3 and 50 characteres.',
          },
        },
      },
      lastname: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 50],
            msg: 'Last name must be between 3 and 50 characteres.',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
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
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'Age must be a whole number',
          },
        },
      },
      weight: {
        type: Sequelize.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'Weight must be a number',
          },
        },
      },
      height: {
        type: Sequelize.FLOAT,
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
}
