import { Router } from "express";
import {
  getProductsCount,
  createProducts,
} from "../controllers/product.controller.js";

const router = Router();

router.get("/api/products/count", getProductsCount);
router.post("/api/products", createProducts);

export default router;