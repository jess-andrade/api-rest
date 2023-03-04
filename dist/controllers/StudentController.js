"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student);
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);

class StudentController {
  async index(req, res) {
    const students = await _Student2.default.findAll({
      attributes: ['id', 'name', 'lastname', 'age', 'weight', 'height'],
      order: [['id', 'DESC'], [_Photo2.default, 'id', 'DESC']],
      include: {
        model: _Photo2.default,
        attributes: ['filename'],
      },
    });
    res.json(students);
  }

  // -- STORE
  async store(req, res) {
    try {
      const student = await _Student2.default.create(req.body);

      return res.json(student);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // -- SHOW
  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['ID is missing'],
        });
      }
      const student = await _Student2.default.findByPk(id, {
        attributes: ['id', 'name', 'lastname', 'age', 'weight', 'height'],
        order: [['id', 'DESC'], [_Photo2.default, 'id', 'DESC']],
        include: {
          model: _Photo2.default,
          attributes: ['filename'],
        },
      });

      if (!student) {
        return res.status(400).json({
          errors: ['This student does not exist'],
        });
      }

      return res.json(student);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // -- DELETE
  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['ID is missing'],
        });
      }
      const student = await _Student2.default.findByPk(id);

      if (!student) {
        return res.status(400).json({
          errors: ['This student does not exist'],
        });
      }
      await student.destroy();
      return res.json({
        deleted: true,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // -- UPDATE
  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['ID is missing'],
        });
      }
      const student = await _Student2.default.findByPk(id);

      if (!student) {
        return res.status(400).json({
          errors: ['This student does not exist'],
        });
      }

      const studentUpdated = await student.update(req.body);

      return res.json(studentUpdated);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new StudentController();
