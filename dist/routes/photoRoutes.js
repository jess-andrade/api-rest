"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// eslint-disable-next-line import/no-extraneous-dependencies
var _express = require('express');
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

var _PhotoController = require('../controllers/PhotoController'); var _PhotoController2 = _interopRequireDefault(_PhotoController);

const router = new (0, _express.Router)();

router.post('/', _loginRequired2.default, _PhotoController2.default.store);
exports. default = router;
