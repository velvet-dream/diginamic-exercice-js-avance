import ManageDom from "./manageDom.js"
import FetchJson from "./../services/fetchJson.js"

export default class TerritoryForm extends ManageDom {
	constructor() {
		super();
		this.render();
	}

	render() {
		// On crée dynamiquement les éléments du formulaire de territoire
		const form = this.createMarkup("form", "", document.querySelector(".wrapper"));
		const labelRegion = this.createMarkup("label", "Région", form, [{ for:"region" }, { class:"sr-only" }]);
		const selectRegion = this.createMarkup("select", "", form , [{ name:"region" }, { id:"region" }]);
		const labelDepart = this.createMarkup("label", "Département", form, [{ for:"departement" }, { class:"sr-only" }]);
		const selectDepart = this.createMarkup("select", "", form , [{ name:"departement" }, { id:"departement" }]);
		const labelVille = this.createMarkup("label", "Ville", form, [{ for:"ville" }, { class:"sr-only" }]);
		const selectVille = this.createMarkup("select", "", form , [{ name:"ville" }, { id:"ville" }]);

		const display = this.createMarkup("div", "placeholder", form.parentElement, [{ class:"result-display" }]);

		let regions = [];
		FetchJson.loadData("https://geo.api.gouv.fr/regions")
			.then(loadedJson => {
				regions = loadedJson;
				for (const region of regions) {
					this.createMarkup("option", `${region.nom} (${region.code})`, selectRegion, [{ value:region.nom }]);
				} 
			})
			.catch(error => {
				console.error(`Erreur attrappée dans l'appel de loadData : `, error);
			})
	}


}