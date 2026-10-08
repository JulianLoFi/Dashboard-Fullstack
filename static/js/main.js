
import "./dropdown.js";

import graficoDonut from "./graficos/donut.js";
import graficoLineal from "./graficos/lineal.js";
import graficoMapa from "./graficos/mapa.js";
import tablaTendencia from "./graficos/tendencia.js";


/*================ MENÚ LATERAL ======================*/

let toggle = document.getElementById('toggle');
let navigation = document.getElementById('navigation');
let main = document.getElementById('main');

let currentState = 'active';

toggle.addEventListener('click',() => {
	if(currentState === 'disabled'){
		navigation.classList.add('active');
		main.classList.add('active');
		currentState = 'active';
	  }	else {
		  navigation.classList.remove('active');
		  main.classList.remove('active');
		  currentState = 'disabled';
	};
	
});

//=== Slider ===///

let texto_slider = document.getElementById('texto-slider');
let slider = document.getElementById('slider');


async function actualizarValor(valor) {

	await graficoLineal("http://127.0.0.1:5000/mas-fechas/", valor)
	
	await graficoDonut("http://127.0.0.1:5000/", valor)

	await tablaTendencia("http://127.0.0.1:5000/tendencia/", valor)

	await graficoMapa("http://127.0.0.1:5000/", valor)
	
}


// Ejecutar el gráfico al cargar la página con el valor inicial del Slider

document.addEventListener("DOMContentLoaded", () => {
	let valorInicial = slider.value;
	texto_slider.innerText = valorInicial;
	actualizarValor(valorInicial);
});

// Evento Slider

slider.addEventListener('change', (e) => {
	let valor = e.target.value;
	texto_slider.innerText = valor;
	actualizarValor(valor);
});

