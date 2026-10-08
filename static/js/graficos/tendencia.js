
//=== Tabla ===//

let asia_t = document.getElementById('asia_t');
let europe_t = document.getElementById('europe_t');
let n_america_t = document.getElementById('n_america_t');
let world_t = document.getElementById('world_t');

const tablaTendencia = async (apiUrl, valor) => {

		let apiFinal = apiUrl + valor;

		let response = await fetch(apiFinal);
		let data = await response.json();

		
		asia_t.innerText = data.Asia.Tendencia
		europe_t.innerText = data.Europe.Tendencia
		n_america_t.innerText = data.North_America.Tendencia
		world_t.innerText = data.World.Tendencia


		data.Asia.Estado === 'positivo' ? asia_t.style.color = 'green' : asia_t.style.color = 'red';
		data.Europe.Estado === 'positivo' ? europe_t.style.color = 'green' : europe_t.style.color = 'red';
		data.North_America.Estado === 'positivo' ? n_america_t.style.color = 'green' : n_america_t.style.color = 'red';
		data.World.Estado === 'positivo' ? world_t.style.color = 'green' : world_t.style.color = 'red';
		
}


export default tablaTendencia;