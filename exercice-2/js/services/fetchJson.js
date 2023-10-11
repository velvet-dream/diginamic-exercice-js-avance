export default class FetchJson {
	static ressource = "https://geo.api.gouv.fr/";

	static loadData(url) {
		return fetch(url)
			.then(response => {
				console.log(`Response status: `, response.status)
				return response.json();
			})
			.then(data => {
				console.log(`Data: `, data);
				return data;
			})
			.catch(error => {
				console.error(error);
			})
	}
}