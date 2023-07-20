export default class StepSlider {

  elem = {};
  subElements = {};
  thumb

  clickOnSlider = () => {
    this.thumb = this.elem.querySelector('.slider__thumb');
    this.thumb.ondragstart = () => false;
    
    document.addEventListener('pointermove', this.moveOnSlider)
    document.addEventListener('pointerup', this.pointerupOnSlider, {once: true})
  }

  moveOnSlider = (event) => {
    this.thumb.classList.add('slider_dragging')
    this.currentPosition(event)
  }

  pointerupOnSlider = () => {
    this.thumb.classList.remove('slider_dragging')
    document.removeEventListener('pointermove', this.moveOnSlider)

    const valuePercent = this.value / (this.steps - 1) * 100
    this.elem.innerHTML = this.getSlider(this.value, valuePercent)

    this.dispatch()
  }

  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.render();
  }

  template() {
    return /*html*/`
      <div class="slider">
        ${this.getSlider()}
      </div>`
  }

  getSlider(value = this.value, position = 75){
    return /*html*/`
    <div class="slider__thumb" style="left: ${position}%;">
      <span class="slider__value">${value}</span>
    </div>
    <div class="slider__progress" style="width: ${position}%;"></div>
    <div class="slider__steps">
      ${"<span></span>".repeat(this.steps)}
    </div>`
  }
  
  render(){
    const elem = document.createElement('div');
    elem.innerHTML = this.template();
    this.elem = elem.firstElementChild;

    this.initEventListener()
  }

  initEventListener(){
    this.elem.addEventListener('pointerdown', this.clickOnSlider);
  }

  currentPosition({clientX}){
    const left = clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left/this.elem.offsetWidth;
    if (leftRelative < 0) {
      leftRelative = 0;
    }
    
    if (leftRelative > 1) {
      leftRelative = 1;
    }

    const segments = this.steps - 1;
    const approximateValue = leftRelative * segments;
    const value = Math.round(approximateValue);
    this.value = value
    const leftPercents = leftRelative * 100;

    this.elem.innerHTML = this.getSlider(value, leftPercents)
  }

  dispatch(){
    const event = this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value === 0 ? 'All' : this.value,
      bubbles: true
    }))
  }
}