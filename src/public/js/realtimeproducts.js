// DOM elements
let title = document.getElementById("title");
let description = document.getElementById("description");
let price = document.getElementById("price");
let code = document.getElementById("code");
let stock = document.getElementById("stock");
let thumbnail = document.getElementById("thumbnail");
let btn = document.getElementById("send");
const HTMLResponse = document.querySelector("#app");

////
const socket = io();

// Emitiendo mensaje desde websocket al servidor
socket.emit("message", "Cliente Conectado");

// Emitiendo mensaje con producto nuevo hacia el servidor
btn.addEventListener("click", function () {
  socket.emit("agregarProducto", {
    title: title.value,
    description: description.value,
    price: price.value,
    code: code.value,
    stock: stock.value,
    thumbnail: thumbnail.value,
  });
});

// Escuchando mensaje desde el servidor hacia el cliente
socket.on("getProducts", (data) => {
  console.log(data);
  HTMLResponse.innerHTML = ``;
  for (let product of data) {
    HTMLResponse.innerHTML += `
      <tr>
          <td>${product.id}</td>
          <td>${product.title}</td>
          <td>${product.description}</td>
          <td>${product.price}</td>
          <td>${product.code}</td>
          <td>${product.stock}</td>
          <td>${product.thumbnail}</td>
          <td><button class="botones" id="${product.id}">Borrar</button></td>
      </tr>      
      `;
  }
});

// Delay para que termine de cargar los datos del formulario
setTimeout(() => {
  const botones = document.querySelectorAll(".botones");
  const cuandoSeHaceClick = function (evento) {
    console.log(this.id);
    socket.emit("eliminar", this.id);
  };
  botones.forEach((boton) => {
    boton.addEventListener("click", cuandoSeHaceClick);
  });
}, 100);
