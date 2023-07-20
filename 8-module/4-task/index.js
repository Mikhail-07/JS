import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {

  modalBody = {}
  cartItems = []; // (1) [product: {...}, count: N]

  constructor(cartIcon) { // (2)
    this.cartIcon = cartIcon;

    this.addEventListeners()
  }

  addProduct(product){
    let cartItem = this.cartItems.find( (item) => item.product.id === product.id);
    cartItem
      ? cartItem.count ++
      : this.cartItems.push(cartItem = {product, count: 1})    
      
   this.onProductUpdate(cartItem)
  }

  updateProductCount(productId, amount){
    const cartItem = this.cartItems.find((item) => item.product.id === productId)
    cartItem.count += amount
    const idx = this.cartItems.indexOf(cartItem)
    cartItem.count === 0
      ? this.cartItems.splice(idx, 1)
      : ''
    this.onProductUpdate(cartItem)
  }
  
  isEmpty(){
    return this.cartItems.length === 0
  }

  getTotalCount(){
    return this.cartItems.reduce((sum, item) => sum + item.count, 0)
  }

  getTotalPrice(){
    return this.cartItems.reduce((sum, item) => sum + item.product.price * item.count, 0)
  }

  onProductUpdate({product, count}) { // (3)
    this.cartIcon.update(this);

    if (!document.body.classList.contains('is-modal-open')){
      return
    }

    const counter = this.modalBody.querySelector(`[data-product-id="${product.id}"] .cart-counter__count`)
    const price = this.modalBody.querySelector(`[data-product-id="${product.id}"] .cart-product__price`)

    counter.innerHTML = count
    price.innerHTML = `€ ${product.price.toFixed(2) * count}`
  }

  getProduct() {
    return this.cartItems.map(item => {
      return /*html*/`
    <div class="cart-product" data-product-id="${item.product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${item.product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(item.product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${item.count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${item.product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`}).join('')
  }

  getOrderForm() {
    return /*html*/`
    <form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`;
  }

  addEventListeners() {
    this.cartIcon.elem.addEventListener('pointerdown', this.renderModal);
  }

  renderModal = () => {
    const modal = new Modal()
    modal.setTitle('Modal Title');

    this.modalBody = document.createElement('div');
    this.modalBody.innerHTML = this.getProduct()
    
    const form = document.createElement('div')
    form.innerHTML = this.getOrderForm()
    
    modal.open()
    modal.setBody(this.modalBody)
    this.modalBody.append(form)
    
    this.modalBody.addEventListener('pointerdown', this.clickOnBtn)
    form.addEventListener('submit', this.onSubmit)
  }

  clickOnBtn = (event) =>{
    const btn = event.target.closest('.cart-counter__button')
    if (btn){
      const productElem = event.target.closest('[data-product-id]')
      const productId = productElem.dataset.productId;
      const amount = event.target.closest('.cart-counter__button_plus') ? 1 : -1
      this.updateProductCount(productId, amount) 
    } 
  }

  onSubmit = (event) =>{
    event.preventDefault();

    this.sendForm()
  }

  sendForm(){
    const form = document.querySelector('form');
    const formBtn = form.querySelector('.button');
    formBtn.classList.add('is-loading');
    const formData = new FormData(form);
    const fetchResult = fetch ('https://httpbin.org/post',{
      method: 'Post',
      body: formData
    })

    fetchResult.then(() => {
      const modalInner = document.querySelector('.modal__inner')
      modalInner.innerHTML = this.getOrder()
    })
  }

  getOrder(){
    return /*html*/`
    <div class="modal__header">
      <button type="button" class="modal__close">
        <img src="/assets/images/icons/cross-icon.svg" alt="close-icon">
      </button>
      <h3 class="modal__title">SUCCESS!</h3>
    </div>
    <div class="modal__body-inner">
    <p>
      Order successful! Your order is being cooked :) <br>
      We’ll notify you about delivery time shortly.<br>
      <img src="/assets/images/delivery.gif">
    </p>
  </div>`
  }
}