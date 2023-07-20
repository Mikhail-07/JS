export default class ProductCard {

  elem = {}

  onPlusClick = () =>{
    const event = new CustomEvent('product-add',{
      detail: this.id,
      bubbles: true
    })

    this.elem.dispatchEvent(event)
    console.log(event)
  }

  constructor (
    {name = '',
    price = 0,
    category  = '',
    image = '',
    id = ''} = {}
  ){
    this.name = name,
    this.price = price,
    this.category = category,
    this.image = image,
    this.id = id

    this.render()
  }

  template(){
    return /*html*/`
    <div id="holder" class="container_half">
      <div class="card">
        <div class="card__top">
          <img src="/assets/images/products/${this.image}" class="card__image" alt="product">
          <span class="card__price">€${this.price.toFixed(2)}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${this.name}</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    </div>`
  }

  render(){
    const element = document.createElement('div');
    element.innerHTML = this.template();
    this.elem = element.firstElementChild;

    this.initEventListener(this.elem)
    
  }

  initEventListener(elem){
    elem.querySelector(".card__button").addEventListener('click', this.onPlusClick);
  }
 }