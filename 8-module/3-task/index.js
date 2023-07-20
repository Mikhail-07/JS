export default class Cart {
  cartItems = []; // (1) [product: {...}, count: N]

  constructor(cartIcon) { // (2)
    this.cartIcon = cartIcon;
  }

  addProduct(product){
    const cartItem = this.cartItems.find( (item) => item.product.id === product.id);
    cartItem
      ? cartItem.count ++
      : this.cartItems.push({product, count: 1})    
      
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

  onProductUpdate(cartItem) { // (3)
    this.cartIcon.update(this);
  }
}

