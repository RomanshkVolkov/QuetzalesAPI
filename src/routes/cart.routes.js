import { Router } from "express";
const router = Router();

import * as cartCtrl from "../controllers/cart.controller";
import { authJwt } from "../middlewares";

router.get(
    "/",
    authJwt.verifyToken,
    cartCtrl.showProducts
);

router.post(
    "/",
    authJwt.verifyToken,
    cartCtrl.AddProduct
);

export default router;