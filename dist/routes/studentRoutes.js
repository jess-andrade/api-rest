"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// eslint-disable-next-line import/no-extraneous-dependencies
var _express = require('express');
var _StudentController = require('../controllers/StudentController'); var _StudentController2 = _interopRequireDefault(_StudentController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

router.get('/', _StudentController2.default.index);
router.post('/', _loginRequired2.default, _StudentController2.default.store);
router.put('/:id', _loginRequired2.default, _StudentController2.default.update);
router.get('/:id', _StudentController2.default.show);
router.delete('/:id', _loginRequired2.default, _StudentController2.default.delete);

exports. default = router;
