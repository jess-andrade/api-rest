"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// eslint-disable-next-line import/no-extraneous-dependencies
var _express = require('express');
var _UserController = require('../controllers/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

//* just for tests - security breach
// router.get('/', userController.index);
// router.get('/:id', userController.show);

//
router.post('/', _loginRequired2.default, _UserController2.default.store);
router.put('/', _loginRequired2.default, _UserController2.default.update);
router.delete('/', _loginRequired2.default, _UserController2.default.delete);

exports. default = router;

/*
methods ======================
index: list all users (GET)
store/create : create a new user (POST)
delete : delete a user (DELETE)
show : show a user (GET)
update : update a user ()
*/
