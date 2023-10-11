import ManageDom from "./manageDom.js"
import FetchJson from "./../services/fetchJson.js"

export default class TerritoryForm extends ManageDom {
	constructor() {
		super();
		this.domElements = this.render();
		this.handleEvents();
	}

	render() {
		// On crée dynamiquement les éléments du formulaire de territoire
		const form = this.createMarkup("form", "", document.querySelector(".wrapper"));
		const labelRegion = this.createMarkup("label", "Région", form, [{ for: "region" }, { class: "sr-only" }]);
		const selectRegion = this.createMarkup("select", "", form, [{ name: "region" }, { id: "region" }]);
		this.createMarkup("option", "- - -", selectRegion, [{ value: "undefined" }]);

		const labelDepart = this.createMarkup("label", "Département", form, [{ for: "departement" }, { class: "sr-only" }]);
		const selectDepart = this.createMarkup("select", "", form, [{ name: "departement" }, { id: "departement" }]);
		this.createMarkup("option", "- - -", selectDepart, [{ value: "undefined" }]);

		const labelVille = this.createMarkup("label", "Ville", form, [{ for: "ville" }, { class: "sr-only" }]);
		const selectVille = this.createMarkup("select", "", form, [{ name: "ville" }, { id: "ville" }]);
		this.createMarkup("option", "- - -", selectVille, [{ value: "undefined" }]);

		const display = this.createMarkup("div", "placeholder", form.parentElement, [{ class: "result-display" }]);

		let regions = [];

		// On utilise un fetch pour récupérer les données de chaque région.
		FetchJson.loadData(FetchJson.ressource + "regions")
			.then(loadedJson => {
				regions = loadedJson;
				for (const region of regions) {
					this.createMarkup("option", `${region.nom} (${region.code})`, selectRegion, [{ value: region.code }]);
				}
			})
			.catch(error => {
				console.error(`Erreur attrappée dans l'appel de loadData : `, error);
			});

			return {
				form,
				selectRegion,
				selectDepart,
				selectVille,
				display
			};
	}

	handleEvents() {
		this.domElements.selectRegion.onchange = (event) => {
			const val = event.target.value;
			console.log(val);
			if (val !== "undefined") {
				let departements = [];

				FetchJson.loadData(FetchJson.ressource + "regions/" + val + "/departements" )
					.then(loadedJson => {
						departements = loadedJson;
						for (const departement of departements) {
							this.createMarkup("option", `${departement.nom} (${departement.code})`, this.domElements.selectDepart, [{ value: departement
							.code }]);
						}
					})
					.catch(error => {
						console.error(`Erreur attrappée dans l'appel de loadData : `, error);
					});
			}
			
		}

	}


}