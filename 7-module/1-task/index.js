export default class RibbonMenu {
  
  elem ={}

   onRhArrClick = () =>{
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    ribbonInner.scrollBy(350, 0);
    
    ribbonInner.addEventListener('scroll', ()=> {this.arrowDisplay(this.scrollCalculate(ribbonInner))})
  }

  onLhArrClick = () =>{
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    ribbonInner.scrollBy(-350, 0);

    ribbonInner.addEventListener('scroll', ()=> {this.arrowDisplay(this.scrollCalculate(ribbonInner))})
  }

  onMenuClick = (e) => {
    console.log(':)')
    e.preventDefault();

    const categories = this.elem.querySelectorAll('.ribbon__item')
    categories.forEach( item => item.classList.remove('ribbon__item_active'))
    e.target.classList.add('ribbon__item_active')
    
    const id = e.target.getAttribute('data-id')

    this.dispatch(id)
  }

  constructor (categories = {}){
    this.categories = categories

    this.render()
  }

  template(){
    return /*html*/`
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left ">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner">
        ${this.getCategories()}
      </nav>
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>`
  }

  getCategories(){
    return this.categories.map(item => {
      return /*html*/`
      <a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`
    }).join('')
  }

  render(){
    const element = document.createElement('div');
    element.innerHTML = this.template();
    this.elem = element.firstElementChild;

    this.initEventListener(this.elem);
  }

  initEventListener(elem){
    elem.querySelector('.ribbon__arrow_left').addEventListener('pointerdown', this.onLhArrClick)
    elem.querySelector('.ribbon__arrow_right').addEventListener('pointerdown', this.onRhArrClick)

    const categories = elem.querySelectorAll('.ribbon__item')
    categories.forEach(item => item.addEventListener('pointerdown', this.onMenuClick));
  }

  scrollCalculate(ribbonInner){
    const scrollWidth = ribbonInner.scrollWidth;
    const scrollLeft = ribbonInner.scrollLeft;
    const clientWidth = ribbonInner.clientWidth;

    const scrollRight = scrollWidth - scrollLeft - clientWidth;

    const result = {}
    result.scrollLeft = scrollLeft;
    result.scrollRight = scrollRight;
     
    return result
  }

  arrowDisplay({scrollLeft, scrollRight}){
    scrollLeft > 0 
      ? this.elem.querySelector('.ribbon__arrow_left').classList.add("ribbon__arrow_visible") 
      : this.elem.querySelector('.ribbon__arrow_left').classList.remove("ribbon__arrow_visible"),

    scrollRight > 0 
      ? this.elem.querySelector('.ribbon__arrow_right').classList.add("ribbon__arrow_visible") 
      : this.elem.querySelector('.ribbon__arrow_right').classList.remove("ribbon__arrow_visible")
  }

  dispatch (id){
    const event = new CustomEvent('ribbon-select', {
      detail: id,
      bubbles: true
    })
    console.log(event)
  }
}