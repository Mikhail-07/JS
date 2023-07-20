export default class Carousel{

  elem
  offset = 0
  counter = 0

  arrowClick = side => { 
    const direction = {
      right: -1,
      left: 1
    }

    this.counter = this.counter + direction[side];
    const slide = this.elem.querySelector('.carousel__inner');
    this.offset = this.offset + (slide.offsetWidth * direction[side]);
    slide.style.transform = `translateX(${this.offset}px)`
    this.arrDisplay (this.counter)
  }

  arrDisplay = (counter) =>{
    const arrowRight = this.elem.querySelector(`.carousel__arrow_right`)
    const arrowLeft = this.elem.querySelector(`.carousel__arrow_left`)

    counter === 0
      ? arrowLeft.style.display = 'none'
      : arrowLeft.style.display = ''

    counter === ((this.slides.length - 1) * -1)
      ? arrowRight.style.display = 'none'
      : arrowRight.style.display = ''
    } 
   
  constructor (slides = []){
    this.slides = slides

    this.render()
  } 

  template(){
    return /*html*/`
    <div class="container">
      <div class="carousel">
        ${this.getArrows()}
        <div class="carousel__inner">
          ${this.getSlides(this.slides)}
        </div>
    </div>`
  }

  getArrows(){
    return /*html*/`
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>`
  }

  getSlides(slides){
    
    return slides.map(item => {
      return /*html*/`
        <div class="carousel__slide" data-id="${item.id}">
          <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€ ${item.price.toFixed(2)}</span>
            <div class="carousel__title">${item.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>`
    }).join('')  
  }

  render(){
    const element = document.createElement('div');
    element.innerHTML = this.template();
    this.elem = element.firstElementChild;

    this.initEventListener(this.elem)
    this.arrDisplay(this.counter)
    this.dispatch ()
  }

  initEventListener (elem){
    elem.querySelector(".carousel__arrow_right").addEventListener("click", () => this.arrowClick ('right'));
    elem.querySelector(".carousel__arrow_left").addEventListener("click", () => this.arrowClick ('left'));
  }

  dispatch () {
    const buttons = this.elem.querySelectorAll(".carousel__button");

    for (const button of buttons){

      const onPlusClick = () => {
        const event = new CustomEvent('menu: click', {
          bubbles: true,
          detail: button.closest('.carousel__slide').dataset.id
          })
        
        this.elem.dispatchEvent(event);
        console.log(event);
      }

      button.addEventListener('click', onPlusClick); 
    }
  }
}