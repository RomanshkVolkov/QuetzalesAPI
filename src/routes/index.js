const express = require('express');
//routers.js
import usersRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import cartRoutes from "./cart.routes";

//urls

function routerApi(app) {
    app.use("/users", usersRoutes);
    app.use("/auth", authRoutes);
    app.use("/cart", cartRoutes);
}

module.exports = routerApi;