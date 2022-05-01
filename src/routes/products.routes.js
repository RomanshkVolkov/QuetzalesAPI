import { Router } from "express";
const router = Router();

import * as searchController from "../controllers/search.controller";
import * as productsCtrl from "../controllers/products.controller";
import { authJwt } from "../middlewares";

router.get("/", productsCtrl.getProducts);

router.get("/search", searchController.findProducts);

router.get("/search/:search", searchController.findProducts);

router.get("/:productId", productsCtrl.getProductById);

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isModerator],
  productsCtrl.createProduct
);

router.put(
  "/:productId",
  [authJwt.verifyToken, authJwt.isModerator],
  productsCtrl.updateProductById
);

router.delete(
  "/:productId",
  [authJwt.verifyToken, authJwt.isAdmin],
  productsCtrl.deleteProductById
);

export default router;
