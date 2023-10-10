import ManageDom from "./manageDom.js";

export default class Slideshow extends ManageDom {
	constructor(nb_images, width, height, speed = 1000, paused = false) {
		super();
		this.nb_images = nb_images;
		this.images = [];
		this.width = width;
		this.height = height;
		this.speed = speed;
		this.paused = paused;
		this.feedSlideshow();
		this.slideshow = this.render();
		this.animationID = this.animateSlideshow();
		this.handleEvents();
	}

	feedSlideshow() {
		// remplissage du tableau d'images "images"
		for (let i = 0; i < this.nb_images; i++) {
			this.images.push(this.createImage());
		}
	}

	createImage() {  
		// création d'une image  
		const img = document.createElement("img");
		img.setAttribute("src",`https://picsum.photos/${this.width}/${this.height}?id=${Math.random()*1000}`);
		return img;
	}

	render() {
		// Rendu du slideshow avec ses éléments du DOM
		const wrapper = document.querySelector(".slideshow-wrapper");
		wrapper.style.width = `${this.width}px`;
		const container = this.createMarkup("div", "", wrapper, [{ class:"slideshow-container" }]);
		const slideshow = this.createMarkup("section", "", container, [{ class:"slideshow" }]);
		const slideshowInner = this.createMarkup("div", "", slideshow, [{ class:"slideshow-inner" }]);
		for (const img of this.images) {
			let slideshowItem = this.createMarkup("div", "", slideshowInner, [{ class:"slideshow-item" }]);
			if (img === this.images[0]) slideshowItem.classList.add("active");
			slideshowItem.appendChild(img);
		}
		const controlers = this.createMarkup("aside", "controlleurs", container, [{ class:"slideshow-controlers" }]);

		return {
			container,
			wrapper,
			slideshow
		};
	}

	animateSlideshow() {	
		return setInterval(() => {
			// L'image encore active ne l'est plus
			const oldActive = this.slideshow.container.querySelector(".slideshow-item.active");
			oldActive.classList.remove("active");

			// On attribue la classe "active" à son prochain sibling.
			// Si c'était le dernier élément, on attribue la classe active au premier élément à la place.
			let newActive = oldActive.nextElementSibling;
			if (newActive === null) newActive = this.slideshow.container.querySelector(".slideshow-item");
			newActive.classList.add("active");

			/* On effectue un scroll horizontal pour afficher l'élément (le reste est en overflow:hidden)
			  Note : beurk j'aime pas mais je garde en commentaire
			  newActive.scrollIntoView({ behavior: "smooth" }); */
		}, this.speed);
	}

	handleEvents() {
		this.slideshow.wrapper.onclick = (event) => {
			this.paused = !this.paused
			if(this.paused) clearInterval(this.animationID);
			else this.animationID = this.animateSlideshow();
		}
	}


}

