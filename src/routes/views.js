import { Router } from "express";

import { ProductManager } from "../ProductManager.js";
const router = Router();

const pro = new ProductManager();
const gp = pro.getProducts;

router.get("/", (req, res) => {
  res.render("index", { title: "Index", style: "index.css" });
});

router.get("/home", (req, res) => {
  res.render("home", { title: "Home", style: "home.css" });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {
    title: "Real Time Products",
    style: "realtimeproducts.css",
    gp: gp,
  });
});
export default router;
