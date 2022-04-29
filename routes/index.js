const express = require('express');
//routers.js
const loginRouter = require('./auth.router');

//urls

function routerApi(app) {
    app.use('/login', loginRouter);
    app.use('/logout', )
}

module.exports = routerApi;