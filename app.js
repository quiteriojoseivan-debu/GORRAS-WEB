// ============================
// Contenedor donde se mostrarán los productos
// ============================
const contenedor = document.getElementById("productos");

// ============================
// Arreglo de productos local
// ============================
let productos = [
  {
    nombre: "Gorra NY Negra",
    precio: 350,
    imagen: "https://images.unsplash.com/photo-1521369909029-2afed882baee"
  },
  {
    nombre: "Gorra LA Blanca",
    precio: 320,
    imagen: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c"
  },
  {
    nombre: "Gorra Chicago Bulls",
    precio: 380,
    imagen: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
  }
];

// ============================
// Función para mostrar productos
// ============================
function mostrar(listaProductos) {
  contenedor.innerHTML = "";

  listaProductos.forEach((p) => {
    contenedor.innerHTML += `
      <div class="producto">
        <img src="${p.imagen}" alt="${p.nombre}" width="150">
        <h3>${p.nombre}</h3>
        <p>$${p.precio}</p>
        <button onclick="comprar('${p.nombre}')">Comprar</button>
      </div>
    `;
  });
}

// ============================
// Función para abrir WhatsApp al comprar
// ============================
function comprar(nombre) {
  const telefono = "2214360469";
  const mensaje = `Hola, quiero comprar la ${nombre}`;
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

// ============================
// Mostrar productos locales primero
// ============================
mostrar(productos);

// ============================
// Leer productos desde Firebase (Firestore)
// ============================
db.collection("gorras").get()
  .then((querySnapshot) => {
    let productosFirebase = [];

    querySnapshot.forEach((doc) => {
      productosFirebase.push(doc.data());
    });

    // Mostrar productos de Firebase
    mostrar(productosFirebase);
  })
  .catch((error) => {
    console.error("Error al leer Firestore:", error);
  });
