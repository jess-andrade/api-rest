import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);
      const { id, name, email } = newUser;
      return res.json({ id, name, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // -- INDEX
  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'name', 'email'] });
      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }

  // -- SHOW
  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      const { id, name, email } = user;
      return res.json({ id, name, email });
    } catch (e) {
      return res.json(null);
    }
  }

  // -- UPDATE
  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId); // returns me database user

      if (!user) {
        return res.status(400).json({
          errors: ['This user does not exist'],
        });
      }

      const newData = await user.update(req.body);
      const { id, name, email } = newData;
      return res.json({ id, name, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // -- DELETE
  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['This user does not exist'],
        });
      }
      await user.destroy();
      return res.json(null);
    } catch (e) {
      return res.json(null);
    }
  }
}

export default new UserController();
