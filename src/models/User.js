import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 50],
            msg: 'The name must be between 3 and 50 characters',
          },
        },

      },
      email: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
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
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });
    return this;
  }

  // token - returns a promise : check password
  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
