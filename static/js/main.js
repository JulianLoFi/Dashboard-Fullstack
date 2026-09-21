
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

const polar = document.getElementById('polar');

let chartInstance = null;
let chartInstance2 = null;
let chartInstance4 = null;


//=== Tabla ===//

let asia_t = document.getElementById('asia_t');
let europe_t = document.getElementById('europe_t');
let n_america_t = document.getElementById('n_america_t');
let world_t = document.getElementById('world_t');


function actualizarValor(valor) {

	//=========================== Gráfico Lineal =====================================//

	(async () => {

		let apiUrl = "http://127.0.0.1:5000/mas-fechas/"
		let apiFinal = apiUrl + valor;
		console.log(apiFinal)

		const response = await fetch(apiFinal);
		const data = await response.json();

		let data_world_co2 = data.World.co2
		let data_world_year = data.World.year

		let d_year = data_world_year.map(String);

		let data_africa_co2 = data.Africa.co2
		let data_asia_co2 = data.Asia.co2
		let data_europe_co2 = data.Europe.co2
		let data_oceania_co2 = data.Oceania.co2
		let data_n_america_co2 = data.North_America.co2
		let data_s_america_co2 = data.South_America.co2

		let d_world = data.World.co2.at(-1)

		console.log(d_year)
		console.log(data_world_co2)


		if (chartInstance !== null) {
			chartInstance.destroy();
		}

		chartInstance = Highcharts.chart('container_line', {

			title: {
				text: `Carbono Mundial : ${d_world} MtCO₂e`
			},

			yAxis: {
				title: {
					text: 'co2 Emissions'
				}
			},

			xAxis: {
				accessibility: {
					rangeDescription: 'Range: 2010 to 2022'
				}
			},

			legend: {
				layout: 'horizontal',
				align: 'right',
				verticalAlign: 'bottom',
				enabled: false
			},
			plotOptions: {
				series: {
					label: {
						connectorAllowed: false
					},
					marker: {
						enabled: false
					},
					pointStart: 1850
				}
			},

			series: [{
				name: 'World',
				data: data_world_co2,
				color: 'rgba(54,162,235,1)'
			}, {
				name: 'Africa',
				data: data_africa_co2,
				color: '#00e272'
			}, {
				name: 'Asia',
				data: data_asia_co2,
				color: 'rgb(255, 0, 0)'
			}, {
				name: 'Europe',
				data: data_europe_co2,
				color: 'rgb(255, 95, 31)'
			}, {
				name: 'South America',
				data: data_s_america_co2,
				color: '#d568fb'
			}, {
				name: 'North America',
				data: data_n_america_co2,
				color: 'rgb(0, 128, 0)'
			}, {
				name: 'Oceania',
				data: data_oceania_co2,
				color: '#544fc5'
			}],

			responsive: {
				rules: [{
					condition: {
						maxWidth: 500
					},
					chartOptions: {
						legend: {
							layout: 'horizontal',
							align: 'center',
							verticalAlign: 'bottom'
						}
					}
				}]
			}

		})
	})();


	//======================== Gráfico Donut =======================

	(async () => {

		let apiUrl2 = "http://127.0.0.1:5000/"
		let apiFinal2 = apiUrl2 + valor;

		let response = await fetch(apiFinal2)
		let data = await response.json()

		
		let d_world = data.World.co2
		let d_africa = data.Africa.co2
		let d_asia = data.Asia.co2
		let d_europe = data.Europe.co2
		let d_n_america = data.North_America.co2
		let d_s_america = data.South_America.co2
		let d_oceania = data.Oceania.co2

		if (chartInstance2 !== null) {
			chartInstance2.destroy();
		}

		chartInstance2 = new Chart(polar, {
			type: 'doughnut',
			data: {
				labels: ['World', 'Asia', 'Europe', 'North America', 'South America', 'Africa', 'Oceania'],
				datasets: [{
					label: 'Traffic Source',
					data: [d_world, d_asia, d_europe, d_n_america, d_s_america, d_africa, d_oceania],
					backgroundColor: [
						'rgba(54,162,235,1)',
						'rgb(255, 0, 0)',
						'rgb(255, 95, 31)',
						'rgb(0, 128, 0)',
						'#d568fb',
						'#00e272',
						'#544fc5'
					],
				}]
			},
			options: {
				responsive: true
			}
		
	  })
	})();

	//======================== Gráfico Tendencia =======================

	(async () => {

		let apiUrl3 = "http://127.0.0.1:5000/tendencia/"

		let apiFinal3 = apiUrl3 + valor;

		let response = await fetch(apiFinal3);
		let data = await response.json();

		
		asia_t.innerText = data.Asia.Tendencia
		europe_t.innerText = data.Europe.Tendencia
		n_america_t.innerText = data.North_America.Tendencia
		world_t.innerText = data.World.Tendencia


		data.Asia.Estado === 'positivo' ? asia_t.style.color = 'green' : asia_t.style.color = 'red';
		data.Europe.Estado === 'positivo' ? europe_t.style.color = 'green' : europe_t.style.color = 'red';
		data.North_America.Estado === 'positivo' ? n_america_t.style.color = 'green' : n_america_t.style.color = 'red';
		data.World.Estado === 'positivo' ? world_t.style.color = 'green' : world_t.style.color = 'red';
		

	})();

	//======================== Gráfico Mapa =======================

	(async () => {
		
		let apiUrl4 = "http://127.0.0.1:5000/";
		let apiFinal4 = apiUrl4 + valor;

		// Espera la respuesta de la API
		const response = await fetch(apiFinal4);
		const data = await response.json();


		// Extrae los valores después de obtener los datos
	
		let d_asia = data.Asia.co2;
		let d_africa = data.Africa.co2;
		let d_europe = data.Europe.co2;
		let d_n_america = data.North_America.co2;
		let d_s_america = data.South_America.co2;
		let d_oceania = data.Oceania.co2;
		let d_world = data.World.co2;

		if (chartInstance4 !== null) {
			chartInstance4.destroy();
		}

		// Ahora obtenemos el mapa
		const response_mapa = await fetch('/static/data/world-continents.topo.json');
		const topology = await response_mapa.json();

		// Crear el gráfico una vez que los datos están disponibles
		chartInstance4 = Highcharts.mapChart('container', {

			title: {
				text: `${ d_world } MtCO₂e`
			},

			chart: {
				map: topology,
				spacingBottom: 20
			},

			accessibility: {
				series: {
					descriptionFormat: 'Timezone {series.name} with ' +
						'{series.points.length} countries.'
				},
				point: {
					valueDescriptionFormat: '{point.name}.'
				}
			},

			legend: {
				enabled: false
			},

			plotOptions: {
				map: {
					allAreas: false,
					joinBy: ['iso-a2', 'code'],
					dataLabels: {
						enabled: false,
						color: '#FFFFFF',
						style: {
							fontWeight: 'bold'
						},
						format: '{#if (lt point.properties.labelrank 5)}' +
							'{point.properties.iso-a2}' +
							'{/if}'
					},
					tooltip: {
						headerFormat: '',
						pointFormat: '{point.name}: <b>{series.name}</b>'
					}
				}
			},

			series: [
				{
					name: d_europe,
					data: [{ code: 'EU' }],
					color: 'rgb(255, 95, 31)'
				},
				{
					name: d_oceania,
					data: [{ code: 'OC' }],
					color: '#544fc5'
				},
				{
					name: d_africa,
					data: [{ code: 'AF' }],
					color: '#00e272'
				},
				{
					name: d_asia,
					data: [{ code: 'AS' }],
					color: 'rgb(255, 0, 0)'
				},
				{
					name: d_n_america,
					data: [{ code: 'NA' }],
					color: 'rgb(0, 128, 0)'
				},
				{
					name: d_s_america,
					data: [{ code: 'SA' }],
					color: '#d568fb'
				}
			]
		});

	})();
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
