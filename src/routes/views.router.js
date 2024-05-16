import { Router } from "express";
import ProductManager from "../manager/products.manager.js";
import { __dirname } from "../paht.js";

const router = Router();
const productManager = new ProductManager(`${__dirname}/db/products.json`)

router.get('/', async (req, res) => {
    const allProducts = await productManager.getProducts();
    res.render('home', {allProducts})
});

router.get("/realTimeProducts", (req, res) => {
    res.render("realTimeProducts")
})

export default router;