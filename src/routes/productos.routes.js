import { Router } from "express";
import { pool } from "../db.js";
import {
  getProductos,
  getProducto,
  postProductos,
  putProductos,
  deleteProductos,  
} from "../controllers/productos.controller.js";

const router = Router();

router.get("/productos", getProductos);

router.get("/productos/:id", getProducto);

router.post("/productos", postProductos);

router.patch("/productos/:id", putProductos);

router.delete("/productos/:id", deleteProductos);

export default router;
