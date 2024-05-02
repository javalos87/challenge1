import { Router } from "express";

const router = Router();

//Importacion de librerias
import { ProductManager } from "../ProductManager.js";

//Instancio la clase
const pro = new ProductManager("./src/productos.json");

//Servidor raiz
router.get("/", (req, res) => {
  res.send(`Server levantado sobre puerto: 8080`);
});

//Ruta /products?limit=
router.get("/products", async (req, res) => {
  //Obtengo los productos
  const prod = await pro.getProducts();
  //Guardo el valor del limite
  const limite = req.query.limit;
  //Si existe limite, recorto el array SINO lo muestro entero
  if (limite) {
    const limiteProductos = prod.slice(0, limite);
    res.json(limiteProductos);
  } else {
    res.json(prod);
  }
});

// Ruta /products/pid:
router.get("/products/:pid", async (req, res) => {
  //Se pasa pid convertido a numero usando + al metodo getProductById
  const getPID = await pro.getProductById(+req.params.pid);
  res.json(getPID);
});

export default router;
