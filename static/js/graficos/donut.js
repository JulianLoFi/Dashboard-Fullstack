
const polar = document.getElementById('polar');
let estadoDonut = null

const graficoDonut = async (apiUrl, valor) => {

        let apiFinal = apiUrl + valor;

		let response = await fetch(apiFinal)
		let data = await response.json()

		
		let d_world = data.World.co2
		let d_africa = data.Africa.co2
		let d_asia = data.Asia.co2
		let d_europe = data.Europe.co2
		let d_n_america = data.North_America.co2
		let d_s_america = data.South_America.co2
		let d_oceania = data.Oceania.co2

		if (estadoDonut !== null) {
			estadoDonut.destroy();
		}

		estadoDonut = new Chart(polar, {
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

    return estadoDonut;
}

export default graficoDonut;