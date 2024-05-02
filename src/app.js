import express, { json } from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/views.js";
import { Server } from "socket.io"; // Este import es nuevo, este "Server" se creara a partir del server HTTP
import products from "./routes/products.js";
import { ProductManager } from "./ProductManager.js";

const pro = new ProductManager("./src/productos.json");
const gp = await pro.getProducts();

//Servidor Express
const app = express();
const httpServer = app.listen(8080, () => {
  console.log("Listening on Port 8080");
});

//Configuraciones handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//Configuraciones Express
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use("/", viewsRouter); // Uso de la vista de hanblebars
app.use("/", products); //Uso de rutas con Route

//WEBSOCKET
// Ahora algo nuevo ! Creamos un servidor para sockets viviendo dentro de nuestro servidor principal
const socketServer = new Server(httpServer);
socketServer.on("connection", (socket) => {
  // Escuchando message
  socket.on("message", (data) => {
    console.log(data);
  });
  //Escuchando agregado producto del cliente
  socket.on("agregarProducto", (prod) => {
    pro.addProduct(prod);
    console.log("Agregando Producto");
    console.log(prod);
  });
  socket.on("eliminar", (data) => {
    console.log("Eliminar el producto: ", data);
    pro.deleteProduct(data);
  });

  // Emitiendo los productos
  socket.emit("getProducts", gp);
});
