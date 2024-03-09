import { Helper } from "./helper.js";

export class Carousel {

  id = undefined;
  image_sources = []

  constructor(id) {
    Carousel.count_instances++;
    this.id = `${id}-${Carousel.count_instances}`;
  }

  addImage(src) {
    this.image_sources.push(src);
  }

  clearImages() {
    this.image_sources = [];
  }

  html() {
    let items = '';
    this.image_sources.forEach(v => items += Helper.replaceLayout(Carousel.carouselItem, { src: v, active: this.image_sources.length == 1 ? 'active' : '' }));
    return `
    <div id="${this.id}" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">${items}</div>
      <button class="carousel-control-prev text-black" type="button" data-bs-target="#${this.id}" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next text-black" type="button" data-bs-target="#${this.id}" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    `;
  }

  static carouselItem = `
    <div class="carousel-item {{active}}">
      <img src="{{src}}" class="d-block w-100" alt="Image">
    </div>
  `;

  static count_instances = 0;
}