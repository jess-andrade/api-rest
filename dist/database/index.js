"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);
var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);

const models = [_Student2.default, _User2.default, _Photo2.default];

const connection = new (0, _sequelize2.default)(_database2.default);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
