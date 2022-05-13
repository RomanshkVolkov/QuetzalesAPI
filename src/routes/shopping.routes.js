import { Router } from "express";
const router = Router();

import * as shoppingCtrl from "../controllers/shopping.controller";
import { authJwt } from "../middlewares";

router.get(
    "/",
    authJwt.verifyToken,
    shoppingCtrl.showProducts
);

router.post(
    "/",
    authJwt.verifyToken,
    shoppingCtrl.AddProduct
);

export default router;