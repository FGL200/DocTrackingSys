import { Helper } from "./helper.js";

export class Carousel {

  id = undefined;
  images_srouces = [];

  constructor(id) {
    this.id = id;
    Carousel.count_instances ++;
  }

  addImage(src) {
    this.images_srouces.push(src);
  }

  html() {
    let items = '';
    this.images_srouces.forEach((v, i) => item += Helper.replaceLayout(Carousel.carouselItem, { src: v, active: i == 0 ? 'active' : '' }));
    return `
    <div id="${this.id}-${Carousel.count_instances}" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        ${items}
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#${this.id}-${Carousel.count_instances}" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#${this.id}-${Carousel.count_instances}" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    `;
  }

  static carouselItem = `
    <div class="carousel-item {{active}}">
      <img src="{{src}}" class="d-block w-100" alt="{{src}}" />
    </div>
  `;

  static count_instances = 0;
}