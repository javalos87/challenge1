const socket = io();
socket.emit("message", "Hola, me estoy comunicando desde un websocket");

socket.on("Evento_para_socket_individual", (data) => {
  console.log(data);
});

socket.on("Evento_para_todos_menos_el_socket_actual", (data) => {
  console.log(data);
});

socket.on("Evento_para_todos", (data) => {
  console.log(data);
});
/**
 * io hace referencia a "socket.io", se le llama asi por convencion
 * la linea 1 permite instanciar el socket y guardarlo en la constante socket
 * Dicho socket es el que utilizaremos para poder comunicarnos con el socket del servidor
 * Recuerda que, en este punto somos clientes porque representamos una vista
 */
