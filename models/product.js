const fs = require('fs');
const path = require('path');

const Cart = require('./cart')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  

  save() {
    getProductsFromFile(products => {
      //if wee got and id 
      if(this.id){
        // wee have to finde the index of products id and the class id
       const existingProductIndex = products.findIndex(prod => prod.id  === this.id);
       //stored the prducst elements in new updatedProducts 
       const updatedProducts = [...products]
       // stored in  updatedProducts the index of existingProduct then equal to this class  
       updatedProducts[existingProductIndex] = this;
        // then write the file to exicute the newly updated data in cart.json
       fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        console.log(err);
      });
      }else{
        //if wee not got an id create random id 
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      }
    });
  }
  
  static deleteById(id){
    getProductsFromFile(products => {
      //find the product id
      const product = products.find(prod => prod.id === id)
      // use filter to match the id that deleted
      const updatedProducts = products.filter(prod => prod.id !== id)
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        // if wee not got an error
        if(!err){
          // call the Cart Model then pass an argument the id and the price of product
          Cart.deleteProduct(id, product.price)
        }
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
};
