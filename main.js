let productos = new Array(4);
productos[0] = new Array();
productos[1] = new Array();
productos[2] = new Array();
productos[3] = new Array();
let columana0 = 0;
let columana1 = 0;
let columana2 = 0;
let columana3 = 0;
let elementosEnCarro = document.getElementById("elementosEnCarro");
compras = JSON.parse(localStorage.getItem("compras"));
actualizarCarro();
fetch("https://fakestoreapi.com/products")
	.then((res) => res.json())
	.then((json) => {
		console.log(json);
		for (producto of json) {
			console.log(producto.category);
			if (producto.category == "men's clothing") {
				productos[0][columana0] = producto;
				columana0++;
			}
			if (producto.category == "jewelery") {
				productos[1][columana1] = producto;
				columana1++;
			}
			if (producto.category == "electronics") {
				productos[2][columana2] = producto;
				columana2++;
			}
			if (producto.category == "women's clothing") {
				productos[3][columana3] = producto;
				columana3++;
			}
		}
		console.log(productos);
		terminamosDeCargarLaApi();
	});

let pantalla1 = document.getElementById("pantalla1");
let pantalla2 = document.getElementById("pantalla2");
let productoDestacado = document.getElementById("productoDestacado");
let categorias = document.getElementById("categorias");
let nav = document.getElementById("nav");

function terminamosDeCargarLaApi() {
	pantalla1.style.display = "none";
	nav.style.display = "block";
	pantalla2.style.display = "block";
	crearPantalla2();
}

function crearPantalla2() {
	crearPantallaProductosDestacados();

	crearPantallaCategorias();
	esperarclick();
	actualizarCarro();
}

function crearPantallaProductosDestacados() {
	let numeroAleatorio = Math.floor(Math.random() * 3);

	let divCard = document.createElement("div");
	divCard.classList.add("card");
	divCard.classList.add("productoDestacado");
	let imagen = document.createElement("img");
	imagen.classList.add("card-img-top");
	imagen.src = productos[numeroAleatorio][0].image;
	divCard.appendChild(imagen);
	let nom = document.createElement("h5");
	nom.classList.add("card-title");
	nom.appendChild(document.createTextNode(productos[numeroAleatorio][0].title));
	divCard.appendChild(nom);
	let precio = document.createElement("p");
	precio.classList.add("card-text");
	precio.appendChild(
		document.createTextNode(productos[numeroAleatorio][0].price + "$")
	);
	divCard.appendChild(precio);
	let divBotones = document.createElement("div");
	divBotones.classList.add("d-grid");
	divBotones.classList.add("gap-2");
	divBotones.classList.add("d-md-block");
	divCard.appendChild(divBotones);
	let boton2 = document.createElement("button");
	boton2.setAttribute("data-id", productos[numeroAleatorio][0].id);
	boton2.setAttribute("data-btn", "comprar");
	boton2.classList.add("btn-primary");
	boton2.classList.add("btn");
	boton2.appendChild(document.createTextNode("Comprar"));
	divBotones.appendChild(boton2);
	productoDestacado.appendChild(divCard);
}
function crearPantallaCategorias() {
	for (let k = 0; k < productos.length; k++) {
		crearCard(k, productos[k][0].image, productos[k][0].category);
		console.log(productos[k][0].image);
	}
}

function crearCard(num, image, category) {
	let divCard = document.createElement("div");
	divCard.classList.add("card");
	divCard.classList.add("col-md-3");
	let imagen = document.createElement("img");
	imagen.classList.add("card-img-top");
	imagen.src = image;
	divCard.appendChild(imagen);
	let nom = document.createElement("h3");
	nom.classList.add("card-title");
	nom.appendChild(document.createTextNode(category));
	divCard.appendChild(nom);
	let boton = document.createElement("button");
	boton.classList.add("btn-primary");
	boton.classList.add("btn");
	let a = document.createElement("a");
	boton.appendChild(document.createTextNode("Ver Mas"));
	boton.setAttribute("categoria", category);
	if (num == 0) {
		boton.id = "hombre";
	}
	if (num == 1) {
		boton.id = "joyas";
	}
	if (num == 2) {
		boton.id = "electronica";
	}
	if (num == 3) {
		boton.id = "mujer";
	}
	a.href = "listado.html";
	a.appendChild(boton);
	divCard.appendChild(a);
	categorias.appendChild(divCard);
}

function esperarclick() {
	let mujer = document.getElementById("mujer");
	let joyas = document.getElementById("joyas");
	let electronica = document.getElementById("electronica");
	let hombre = document.getElementById("hombre");
	let mujer2 = document.getElementById("mujer2");
	let joyas2 = document.getElementById("joyas2");
	let electronica2 = document.getElementById("electronica2");
	let hombre2 = document.getElementById("hombre2");

	hombre.addEventListener("click", function () {
		localStorage.setItem("producto", productos[0][0].category);
	});
	joyas.addEventListener("click", function () {
		localStorage.setItem("producto", productos[1][0].category);
	});
	electronica.addEventListener("click", function () {
		localStorage.setItem("producto", productos[2][0].category);
	});
	mujer.addEventListener("click", function () {
		localStorage.setItem("producto", productos[3][0].category);
	});
	hombre2.addEventListener("click", function () {
		console.log(productos[3][0].category);
		localStorage.setItem("producto", productos[0][0].category);
	});

	joyas2.addEventListener("click", function () {
		localStorage.setItem("producto", productos[1][0].category);
	});
	electronica2.addEventListener("click", function () {
		localStorage.setItem("producto", productos[2][0].category);
	});
	mujer2.addEventListener("click", function () {
		localStorage.setItem("producto", productos[3][0].category);
	});

	productoDestacado.addEventListener("click", comprarOVerMas);
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
