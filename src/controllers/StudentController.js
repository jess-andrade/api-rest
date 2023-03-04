import Student from '../models/Student';
import Photo from '../models/Photo';

class StudentController {
  async index(req, res) {
    const students = await Student.findAll({
      attributes: ['id', 'name', 'lastname', 'age', 'weight', 'height'],
      order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
      include: {
        model: Photo,
        attributes: ['filename'],
      },
    });
    res.json(students);
  }

  // -- STORE
  async store(req, res) {
    try {
      const student = await Student.create(req.body);

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
      const student = await Student.findByPk(id, {
        attributes: ['id', 'name', 'lastname', 'age', 'weight', 'height'],
        order: [['id', 'DESC'], [Photo, 'id', 'DESC']],
        include: {
          model: Photo,
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
      const student = await Student.findByPk(id);

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
      const student = await Student.findByPk(id);

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

export default new StudentController();
