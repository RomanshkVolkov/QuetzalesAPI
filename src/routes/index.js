const express = require('express');
//routers.js
import productRoutes from "./products.routes.js";
import usersRoutes from "./user.routes";
import authRoutes from "./auth.routes";

//urls

function routerApi(app) {
    app.use("/products", productRoutes);
    app.use("/users", usersRoutes);
    app.use("/auth", authRoutes);
}

module.exports = routerApi;