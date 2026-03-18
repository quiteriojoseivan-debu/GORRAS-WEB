const formProducto = document.getElementById("formProducto");
const misProductos = document.getElementById("mis-productos");

let idEditando = null;
let imagenActual = "";

function mostrarProductosAdmin(productos) {
  misProductos.innerHTML = "";

  productos.forEach((doc) => {
    const p = doc.data();

    const div = document.createElement("div");
    div.classList.add("producto");

    div.innerHTML = `
      <img src="${p.IMAGEN}" alt="${p.NOMBRE}">
      <h3>${p.NOMBRE}</h3>
      <p>$${p.PRECIO}</p>
      <button onclick="cargarEdicion('${doc.id}', '${p.NOMBRE}', ${p.PRECIO}, '${p.IMAGEN}')">Editar</button>
      <button onclick="eliminarProducto('${doc.id}')">Eliminar</button>
    `;

    misProductos.appendChild(div);
  });
}

db.collection("GORRAS").onSnapshot((querySnapshot) => {
  mostrarProductosAdmin(querySnapshot.docs);
});

formProducto.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombreInput = document.getElementById("nombre");
  const precioInput = document.getElementById("precio");
  const imagenInput = document.getElementById("imagen");

  const nombre = nombreInput.value.trim();
  const precio = parseFloat(precioInput.value);
  const imagenFile = imagenInput.files[0];

  if (!precio || precio <= 0) {
    alert("Ingresa un precio válido");
    return;
  }

  try {
    let urlImagen = imagenActual;

    if (imagenFile) {
      const nombreArchivo = `${Date.now()}_${imagenFile.name}`;
      const storageRef = storage.ref(`GORRAS/${nombreArchivo}`);
      const snapshot = await storageRef.put(imagenFile);
      urlImagen = await snapshot.ref.getDownloadURL();
    }

    if (idEditando) {
      await db.collection("GORRAS").doc(idEditando).update({
        PRECIO: precio,
        IMAGEN: urlImagen
      });

      alert("Producto actualizado");
      idEditando = null;
      imagenActual = "";
      nombreInput.disabled = false;
      formProducto.querySelector("button").textContent = "Agregar Producto";
    } else {
      if (!nombre || !imagenFile) {
        alert("Completa todos los campos");
        return;
      }

      await db.collection("GORRAS").add({
        NOMBRE: nombre,
        PRECIO: precio,
        IMAGEN: urlImagen,
        fecha: firebase.firestore.FieldValue.serverTimestamp()
      });

      alert("Producto agregado");
    }

    formProducto.reset();
  } catch (error) {
    console.error("Error al guardar producto:", error);
    alert("Hubo un error al guardar");
  }
});

function cargarEdicion(id, nombre, precio, imagen) {
  document.getElementById("nombre").value = nombre;
  document.getElementById("precio").value = precio;
  document.getElementById("nombre").disabled = true;

  idEditando = id;
  imagenActual = imagen;

  formProducto.querySelector("button").textContent = "Guardar Cambios";
}

async function eliminarProducto(id) {
  const confirmar = confirm("¿Seguro que quieres eliminar este producto?");
  if (!confirmar) return;

  try {
    await db.collection("GORRAS").doc(id).delete();
    alert("Producto eliminado");
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    alert("No se pudo eliminar");
  }
}