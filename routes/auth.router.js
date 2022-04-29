import { Router } from 'express'
const router = Router();
const mongoose = require('mongoose');

const authService = require('../services/auth.service');

const service = new authService; //crear objeto del sercivio

router.get('/', async (req, res, next) => {

});



module.exports = router;