const express = require('express');
const { route } = require('express/lib/application');
const mongoose = require('mongoose');

const loginService = require('../services/login.service');

const router = express.Router();
const service = new loginService;

router.get('/', async (req, res, next) => {

});



module.exports = router;