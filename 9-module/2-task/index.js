import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {
  constructor () {
    this.render
  }

  async render(){
    this.getCarousel()
    this.getRibbonMenu()
    this.getStepSlider()
    this.getCartIcon()
    this.getCart()
    await this.getProducts()

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    });
  }

  getCarousel(){
    this.carousel = new Carousel (slides);
    document.querySelector('[data-carousel-holder]').append(this.carousel.elem)  
  }

  getRibbonMenu(){
    this.ribbonMenu = new RibbonMenu (categories);
    document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem)
  }

  getStepSlider(){
    this.stepSlider = new StepSlider ({steps: 5, value: 3});
    document.querySelector('[data-slider-holder]').append(this.stepSlider.elem)
  }

  getCartIcon(){
    this.cartIcon = new CartIcon ()
    document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem)
  }

  getCart(){
    this.cart = new Cart (this.cartIcon);
    document.querySelector('[data-cart-icon-holder]').append(this.cart.elem)
  }

  async getProducts(){
    const url = 'products.json';
    const response = await fetch (url);
    const commit = await response.json();

    this.productsGrid = new ProductsGrid (commit);
    document.querySelector('[data-products-grid-holder]').innerHTML = '';
    document.querySelector('[data-products-grid-holder]').append(this.productsGrid.elem)
  }
}