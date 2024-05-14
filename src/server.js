import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./paht.js";
import { Server } from "socket.io";
import { errorHandler } from "./middlewares/errorHandler.js";
import viewsRouter from "./routes/views.router.js";
import ProductManager from "./manager/products.manager.js";

const productManager = new ProductManager(`${__dirname}/db/products.json`)

const app = express();

app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

app.use("/home", viewsRouter);

app.use(errorHandler)

const httpServer = app.listen(8080, () => {
    console.log("Escuchando al puerto 8080");
});

const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
    console.log('🟢 ¡New connection!', socket.id);
    socketServer.emit('products', await productManager.getProducts());
});