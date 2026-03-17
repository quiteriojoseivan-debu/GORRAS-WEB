let productos = [

{
nombre:"Gorra NY Negra",
precio:350,
imagen:"https://images.unsplash.com/photo-1521369909029-2afed882baee"
},

{
nombre:"Gorra LA Blanca",
precio:320,
imagen:"https://images.unsplash.com/photo-1503342217505-b0a15ec3261c"
},

{
nombre:"Gorra Chicago Bulls",
precio:380,
imagen:"https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
},

{
nombre:"Gorra NY Negra",
precio:350,
imagen:"https://images.unsplash.com/photo-1521369909029-2afed882baee"
},

{
nombre:"Gorra LA Blanca",
precio:320,
imagen:"https://images.unsplash.com/photo-1503342217505-b0a15ec3261c"
},



{
nombre:"Gorra Chicago Bulls",
precio:380,
imagen:"https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
},

{
nombre:"Gorra NY Negra",
precio:350,
imagen:"https://images.unsplash.com/photo-1521369909029-2afed882baee"
},

{
nombre:"Gorra LA Blanca",
precio:320,
imagen:"https://images.unsplash.com/photo-1503342217505-b0a15ec3261c"
},

{
nombre:"Gorra Chicago Bulls",
precio:380,
imagen:"https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
}

]

function mostrar(){

let contenedor = document.getElementById("productos")

contenedor.innerHTML=""

productos.forEach(p=>{

contenedor.innerHTML += `
<div class="producto">
<img src="${p.imagen}">
<h3>${p.nombre}</h3>
<p>$${p.precio}</p>
<button onclick="comprar('${p.nombre}')">Comprar</button>
</div>
`

})

}

function comprar(nombre){

let telefono="2214360469"

let mensaje="Hola, quiero comprar la " + nombre

let url="https://wa.me/"+telefono+"?text="+encodeURIComponent(mensaje)

window.open(url)

}

mostrar()
