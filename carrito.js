let compras = JSON.parse(localStorage.getItem("compras"));
let productos = [];
let carrito = document.getElementById("carrito");
let precioTotal = 0;
let elementosEnCarro = document.getElementById("elementosEnCarro");
let pantalla1 = document.getElementById("pantalla1");
let pantalla2 = document.getElementById("pantalla2");
actualizarCarro();
fetch("https://fakestoreapi.com/products")
	.then((res) => res.json())
	.then((json) => {
		console.log(json);
		for (datos of json) {
			console.log(datos.category);
			productos.push(datos);
		}
		crearPantallaDeProducto(compras);
	})
	.then(() => {
		terminoFetch();
		actualizarCarro();
	});

function terminoFetch() {
	pantalla1.style.display = "none";
	pantalla2.style.display = "block";
}

function crearPantallaDeProducto(compras) {
	precioTotal = 0;
	if (compras) {
		console.log(compras.length);
		for (let i = 0; i < compras.length; i++) {
			let li = document.createElement("li");
			li.id = "lieliminar" + i;
			li.classList.add("list-group-item");
			let div1 = document.createElement("div");
			div1.classList.add("div1Carrito");
			let div2 = document.createElement("div");
			div2.classList.add("div2Carrito");
			let imagen = document.createElement("img");
			li.appendChild(div1);
			li.appendChild(div2);
			imagen.classList.add("img-carrito");
			imagen.src = productos[compras[i] - 1].image;
			div1.appendChild(imagen);
			let nom = document.createElement("h5");
			nom.classList.add("title-carrito");
			nom.appendChild(document.createTextNode(productos[compras[i] - 1].title));
			div1.appendChild(nom);
			let precio = document.createElement("p");
			precio.classList.add("card-text");
			precio.appendChild(
				document.createTextNode(productos[compras[i] - 1].price + "$")
			);
			div2.appendChild(precio);
			let boton = document.createElement("button");
			boton.setAttribute("data-id", i);
			boton.setAttribute("data-btn", "eliminar");
			boton.setAttribute("type", "button");
			boton.classList.add("btn-close");
			div2.appendChild(boton);
			carrito.appendChild(li);
			precioTotal = precioTotal + productos[compras[i] - 1].price;
		}
		let li = document.createElement("li");
		li.classList.add("list-group-item");
		let div1 = document.createElement("div");
		div1.classList.add("div1Carrito");
		li.appendChild(div1);
		let nom = document.createElement("h4");
		nom.appendChild(document.createTextNode("TOTAL: "));
		div1.appendChild(nom);
		let precio = document.createElement("p");
		precio.appendChild(document.createTextNode(precioTotal.toFixed(2) + "$"));
		div1.appendChild(precio);
		let divBotones = document.createElement("div");
		divBotones.classList.add("d-grid");
		divBotones.classList.add("gap-2");
		divBotones.classList.add("d-md-block");
		li.appendChild(divBotones);
		let boton = document.createElement("button");
		boton.setAttribute("data-id", "pagar");
		boton.classList.add("btn-primary");
		boton.classList.add("btn");
		boton.appendChild(document.createTextNode("Pagar"));
		let boton2 = document.createElement("button");
		boton2.setAttribute("data-id", "vaciarCarro");
		boton2.setAttribute("data-btn", "vaciarCarro");
		boton2.classList.add("btn-danger");
		boton2.classList.add("btn");
		boton2.appendChild(document.createTextNode("Vaciar Carro"));
		divBotones.appendChild(boton);
		divBotones.appendChild(boton2);
		carrito.appendChild(li);
	} else {
		let li = document.createElement("li");
		li.classList.add("list-group-item");
		li.classList.add("divCarroVacio");
		let nom = document.createElement("h1");
		nom.appendChild(document.createTextNode("EL CARRITO ESTÁ VACÍO"));
		li.appendChild(nom);
		carrito.appendChild(li);
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

let carro = [];
console.log("el largo de carrito es ", carro.length);
let contenedor;
carrito.addEventListener("click", pagarOVaciarCarro);
function pagarOVaciarCarro(e) {
	if (e.target.getAttribute("data-id") == "pagar") {
		alert("Felicitaciones por tu compra!!");
		localStorage.removeItem("compras");
		carrito.innerHTML = ``;
		crearPantallaDeProducto();
		compras = JSON.parse(localStorage.getItem("compras"));
		actualizarCarro();
	}
	if (e.target.getAttribute("data-id") == "vaciarCarro") {
		localStorage.removeItem("compras");
		carrito.innerHTML = ``;
		crearPantallaDeProducto();
		compras = JSON.parse(localStorage.getItem("compras"));
		actualizarCarro();
	}
	if (e.target.getAttribute("data-btn") == "eliminar") {
		let num = e.target.getAttribute("data-id");
		console.log(num);
		let numString = num.toString();
		console.log(numString);
		let liAEliminar = document.getElementById(
			"lieliminar" + e.target.getAttribute("data-id")
		);
		compras.splice(num, 1);
		console.log(compras.length);
		console.log(compras[0]);
		localStorage.setItem("compras", JSON.stringify(compras));
		compras = JSON.parse(localStorage.getItem("compras"));
		if (compras.length == 0) {
			localStorage.removeItem("compras");
			carrito.innerHTML = ``;
			crearPantallaDeProducto();
		} else {
			carrito.innerHTML = ``;
			crearPantallaDeProducto(compras);
		}
	}
	actualizarCarro();
}
function actualizarCarro() {
	if (compras) {
		elementosEnCarro.innerHTML = ``;
		elementosEnCarro.innerHTML = compras.length;
	} else {
		elementosEnCarro.innerHTML = ``;
	}
}
