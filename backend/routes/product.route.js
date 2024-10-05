import express from "express"
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js"

const router = express.Router()

router.get("/", getProducts)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)
router.post("/", createProduct)

export default router
