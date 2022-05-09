import { Router } from "express";
const router = Router();

import * as shoppingCtrl from "../controllers/shopping.controller";
import { authJwt, verifySignup } from "../middlewares/authJwt";

router.get(
    "/",
    authJwt.verifySignup,
    shoppingCtrl.showProducts
)

router.post(
    "/",
    authJwt.verifySignup,
    shoppingCtrl.AddProduct
);

export default router;