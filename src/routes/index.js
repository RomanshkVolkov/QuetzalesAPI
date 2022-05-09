const express = require('express');
//routers.js
import productRoutes from "./products.routes.js";
import usersRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import shoppingRoutes from "./shopping.routes";

//urls

function routerApi(app) {
    app.use("/products", productRoutes);
    app.use("/users", usersRoutes);
    app.use("/auth", authRoutes);
    app.use("/shopping", shoppingRoutes);
}

module.exports = routerApi;