let producto = localStorage.getItem("producto");
let listado = document.getElementById("listado");
let modalBody = document.getElementById("modal-body");
let modalFooter = document.getElementById("modal-footer");
let modal = document.getElementById("exampleModal");
let tituloListado = document.getElementById("tituloListado");
let productos = [];
let contador = 0;
let elementosEnCarro = document.getElementById("elementosEnCarro");
let pantalla1 = document.getElementById("pantalla1");
let pantalla2 = document.getElementById("pantalla2");
let compras = JSON.parse(localStorage.getItem("compras"));
actualizarCarro();
if (producto) {
	console.log(producto);
	listado.innerHTML = ``;
	hacemosfetch();
}

function hacemosfetch() {
	fetch("https://fakestoreapi.com/products")
		.then((res) => res.json())
		.then((json) => {
			console.log(json);
			for (datos of json) {
				if (datos.category == producto) {
					console.log(datos.category);
					productos.push(datos);
					console.log(productos);
				}
			}
			terminoFetch();
		});
}

function crearPantallaDeProducto(producto) {
	console.log(producto);
	for (pepe of producto) {
		tituloListado.innerHTML = ``;
		tituloListado.appendChild(document.createTextNode(pepe.category));
		let divCard = document.createElement("div");
		divCard.classList.add("card");
		divCard.classList.add("col-md-3");
		let imagen = document.createElement("img");
		imagen.classList.add("card-img-top");
		imagen.src = pepe.image;
		divCard.appendChild(imagen);
		let nom = document.createElement("h5");
		nom.classList.add("card-title");
		nom.appendChild(document.createTextNode(pepe.title));
		divCard.appendChild(nom);
		let precio = document.createElement("p");
		precio.classList.add("card-text");
		precio.appendChild(document.createTextNode(pepe.price + "$"));
		divCard.appendChild(precio);
		let divBotones = document.createElement("div");
		divBotones.classList.add("d-grid");
		divBotones.classList.add("gap-2");
		divBotones.classList.add("d-md-block");
		divCard.appendChild(divBotones);
		let boton = document.createElement("button");
		boton.setAttribute("data-id", contador);
		contador++;
		boton.setAttribute("data-btn", "verMas");
		boton.setAttribute("data-bs-toggle", "modal");
		boton.setAttribute("data-bs-target", "#exampleModal");
		boton.classList.add("btn-primary");
		boton.classList.add("btn");
		boton.appendChild(document.createTextNode("Detalle"));
		divBotones.appendChild(boton);
		let boton2 = document.createElement("button");
		boton2.setAttribute("data-id", pepe.id);
		boton2.setAttribute("data-btn", "comprar");
		boton2.classList.add("btn-primary");
		boton2.classList.add("btn");
		boton2.appendChild(document.createTextNode("Comprar"));
		divBotones.appendChild(boton2);
		listado.appendChild(divCard);
	}
}

let mujer = document.getElementById("mujer2");
let joyas = document.getElementById("joyas2");
let electronica = document.getElementById("electronica2");
let hombre = document.getElementById("hombre2");

mujer.addEventListener("click", function () {
	localStorage.setItem("producto", "women's clothing");
});
joyas.addEventListener("click", function () {
	localStorage.setItem("producto", "jewelery");
});
electronica.addEventListener("click", function () {
	localStorage.setItem("producto", "electronics");
});
hombre.addEventListener("click", function () {
	localStorage.setItem("producto", "men's clothing");
});

function terminoFetch() {
	pantalla1.style.display = "none";
	pantalla2.style.display = "block";
	console.log(productos);
	crearPantallaDeProducto(productos);
	listado.addEventListener("click", comprarOVerMas);
	modal.addEventListener("click", comprarOVerMas);
	actualizarCarro();
}

let carrito = [];

console.log("el largo de carrito es ", carrito.length);
let contenedor;
function comprarOVerMas(e) {
	if (e.target.getAttribute("data-btn") == "comprar") {
		if (compras) {
			console.log("el largo de carrito es ", compras.length);
			carrito = compras;
			contenedor = e.target.getAttribute("data-id");
			carrito.push(contenedor);
			console.log(carrito);
			localStorage.setItem("compras", JSON.stringify(carrito));
			actualizarCarro();
			alertaNuevaCompra();
		} else {
			console.log("estas comprando!");
			contenedor = e.target.getAttribute("data-id");
			carrito.push(contenedor);
			console.log(carrito);
			localStorage.setItem("compras", JSON.stringify(carrito));
			compras = JSON.parse(localStorage.getItem("compras"));
			actualizarCarro();
			alertaNuevaCompra();
		}
	}
	if (e.target.getAttribute("data-btn") == "verMas") {
		crearModal(productos[e.target.getAttribute("data-id")]);
	}
}
function crearModal(pepe) {
	modalBody.innerHTML = ``;
	modalFooter.innerHTML = ``;
	let divCard = document.createElement("div");
	let imagen = document.createElement("img");
	imagen.classList.add("card-img-top");
	imagen.src = pepe.image;
	modalBody.appendChild(imagen);
	let nom = document.createElement("h5");
	nom.classList.add("card-title");
	nom.appendChild(document.createTextNode(pepe.title));
	divCard.appendChild(nom);
	let descripcion = document.createElement("p");
	descripcion.appendChild(document.createTextNode(pepe.description));
	divCard.appendChild(descripcion);
	let divBotones = document.createElement("div");
	modalFooter.appendChild(divBotones);
	let precio = document.createElement("p");
	precio.classList.add("card-text");
	precio.appendChild(document.createTextNode(pepe.price + "$"));
	divBotones.appendChild(precio);
	let boton2 = document.createElement("button");
	boton2.setAttribute("data-id", pepe.id);
	boton2.setAttribute("data-btn", "comprar");
	boton2.setAttribute("data-bs-dismiss", "modal");
	boton2.classList.add("btn-primary");
	boton2.classList.add("btn");
	boton2.appendChild(document.createTextNode("Comprar"));
	divBotones.appendChild(boton2);
	modalBody.appendChild(divCard);
}

function actualizarCarro() {
	if (compras) {
		elementosEnCarro.innerHTML = ``;
		elementosEnCarro.innerHTML = compras.length;
	} else {
		elementosEnCarro.innerHTML = ``;
	}
}

let nuevaCompra = document.getElementById("agregarProducto");

function alertaNuevaCompra() {
	nuevaCompra.style.display = "block";
	window.setTimeout(guardarbtn, 2000);
}
function guardarbtn() {
	nuevaCompra.style.display = "none";
}
