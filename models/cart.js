const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // Add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty ++;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
        //cart.products[existingProductIndex] = updatedProduct
      } else {
        //if wee hvae new product
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      //add new p or increse qty
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice){
    fs.readFile(p, (err, fileContent) => {
      if(err){
        return
      }
      //use spred operator then parse it 
      const updatedCart  = {...JSON.parse(fileContent)}
      // find the id of products
      const product = updatedCart.products.find(prod => prod.id === id)
        //if wee not got a product then return
      if(!product){
        return;
      }
      // then call the quantity of product 
      const productQty = product.qty;
      // use filter to determain the deleted products
      updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
      // logic to minus the price
      updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
      
      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        console.log(err);
      });
    })
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};