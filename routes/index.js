const express = require('express');
//routers.js
const loginRouter = require('./login.router');

//urls

function routerApi(app) {
    app.use('/login', loginRouter);
}

module.exports = routerApi;