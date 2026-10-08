
let estadoMapa = null;

let graficoMapa = async( apiUrl, valor ) => {

		let apiFinal = apiUrl + valor;

		// Espera la respuesta de la API
		const response = await fetch(apiFinal);
		const data = await response.json();


		// Extrae los valores después de obtener los datos
	
		let d_asia = data.Asia.co2;
		let d_africa = data.Africa.co2;
		let d_europe = data.Europe.co2;
		let d_n_america = data.North_America.co2;
		let d_s_america = data.South_America.co2;
		let d_oceania = data.Oceania.co2;
		let d_world = data.World.co2;

		if (estadoMapa !== null) {
			estadoMapa.destroy();
		}

		// Ahora obtenemos el mapa
		const response_mapa = await fetch('/static/data/world-continents.topo.json');
		const topology = await response_mapa.json();

		// Crear el gráfico una vez que los datos están disponibles
		estadoMapa = Highcharts.mapChart('container', {

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

    return estadoMapa
}

export default graficoMapa;
		
