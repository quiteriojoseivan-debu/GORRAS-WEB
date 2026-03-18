const contenedor = document.getElementById("productos");

function mostrar(listaProductos) {
  contenedor.innerHTML = "";

  if (listaProductos.length === 0) {
    contenedor.innerHTML = "<p style='color:white;'>No hay productos disponibles.</p>";
    return;
  }

  listaProductos.forEach((p) => {
    contenedor.innerHTML += `
      <div class="producto">
        <img src="${p.IMAGEN}" alt="${p.NOMBRE}">
        <h3>${p.NOMBRE}</h3>
        <p>$${p.PRECIO}</p>
        <button onclick="comprar('${p.NOMBRE}')">Comprar</button>
      </div>
    `;
  });
}

function comprar(nombre) {
  const telefono = "2214360469";
  const mensaje = `Hola, quiero comprar la ${nombre}`;
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

db.collection("GORRAS").onSnapshot((querySnapshot) => {
  const productosFirebase = [];

  querySnapshot.forEach((doc) => {
    productosFirebase.push(doc.data());
  });

  console.log("Productos cargados:", productosFirebase);
  mostrar(productosFirebase);
}, (error) => {
  console.error("Error al leer productos:", error);
});