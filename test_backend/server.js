import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import Product from "./models/product.model.js"

dotenv.config()

const app = express()
app.use(express.json())
const PORT = process.env.PORT
app.get('/api/products', async (req,res) => {
  try {
    const products = await Product.find({})
    res.status(200).json({
      success:true,data:products
    })
  } catch (error) {
    console.error("Error:", error.message)
  }
})
app.post("/api/products", async(req, res) => {
  const product = req.body
  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({
      success: false,
      message: "All fields required",
    })
  }
  const newProduct = new Product(product)
  try {
    await newProduct.save()
    res.status(200).json({ success: true, data: newProduct })
  } catch (error) {
    console.error("Error: ", error.message)
  }
})

app.listen(PORT, (req, res) => {
  connectDB()
  console.log(`Server started at port ${PORT}`)
})
