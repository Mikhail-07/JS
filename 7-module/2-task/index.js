export default class Modal {

  clickOnClose = (event) =>{
    if (event.target.closest('.modal__close')){
      this.close()
    }
  }

  constructor(){
    this.render()
    this.elem
  }

  template(){
    return /*html*/`
    <div class="modal">
    <div class="modal__overlay"></div>
    <div class="modal__inner">
      <div class="modal__header">
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
        <h3 class="modal__title"></h3>
      </div>
      <div class="modal__body"></div>
    </div>
  </div>`
  }

  render(){
    const elem = document.createElement('div');
    elem.innerHTML = this.template();
    this.elem = elem.firstElementChild;  

    this.initEventListener()
  }

  open(){
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
  }

  setTitle(text){
    const title = this.elem.querySelector('.modal__title');
    title.innerHTML = text;
  }

  setBody(node) {
    this.elem.querySelector('.modal__body').innerHTML = '';
    this.elem.querySelector('.modal__body').append(node);
  }

  initEventListener(){
    this.elem.addEventListener('pointerdown', this.clickOnClose)

    document.addEventListener('keydown', this.keydownModal)
  }

  close = () => {
    document.removeEventListener('keydown', this.keydownModal);
    document.body.classList.remove('is-modal-open')
    this.elem.remove();
    
  }

  keydownModal = (event) => {
    console.log(':)')
    event.code === 'Escape'
      ? this.close()
      : ''
  }
}