

let estadoLineal = null;

const graficoLineal = async ( apiUrl, valor ) => {
        //let apiUrl = "http://127.0.0.1:5000/mas-fechas/"
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


		if (estadoLineal !== null) {
			estadoLineal.destroy();
		}

		estadoLineal = Highcharts.chart('container_line', {

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

	return estadoLineal;
}

export default graficoLineal;