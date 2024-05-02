const API_URL = "http://localhost:8080/products";

const HTMLResponse = document.querySelector("#app");

fetch(`${API_URL}`) //Fetching a la API
  .then((res) => res.json()) //Me devuelve el dato y lo transformo en json
  .then((products) => {
    // Itero el array y pinto el html
    for (let product of products) {
      HTMLResponse.innerHTML += `

        <tr>
            <td>${product.id}</td>
            <td>${product.title}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>${product.code}</td>
            <td>${product.stock}</td>
            <td>${product.thumbnail}</td>
        </tr>
        
        `;
    }
  });
