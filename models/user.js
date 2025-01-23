const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Products',
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  }
});

    // for a posting a to the cart
    userSchema.methods.addToCart = function(product){
        // create a new variable to store the index of a product
        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString()
        });
        let newQty = 1
        const updatedCartItems = [...this.cart.items] // stored the old items
        // if product greter than 0 qty
        if(cartProductIndex >= 0){
            // newQty have value the new cart whit data and increse qty
            newQty = this.cart.items[cartProductIndex].quantity + 1
            // old item have new items with default qty
            updatedCartItems[cartProductIndex].quantity = newQty
        }else{
            // if not add a new items add a new product in the cart
            updatedCartItems.push({
                productId: product._id,   // pass the product in in ObjectId to determain each id and did not pass the title price etc
                quantity: newQty // pass the default qty
            }) 
        }
        const updatedCart ={
            items: updatedCartItems
        }
        this.cart = updatedCart
        return this.save()

    }

    // to remove from cart
    userSchema.methods.removeFromCart = function(productId){
        const updateCartItems = this.cart.items.filter(item => {
            // return it the id of a cart and id of a products
            return item.productId.toString() !== productId.toString()
        })
        //console.log(updateCartItems)

        this.cart.items = updateCartItems
        return this.save()
    }

    // to clear a cart when its done checout
    userSchema.methods.clearCart = function(){
        this.cart ={item: []}
        return this.save()
    }
  
module.exports = mongoose.model('Users', userSchema);


































/*const e = require('express')
const mongodb = require('mongodb')
const getDB = require('../util/database').getDB


const ObjectId = mongodb.ObjectId;
class User{
    constructor(username, email, cart, id){
        this.username = username
        this.email = email
        this.cart = cart // {items: []}
        this._id = id
    }

    save(){
         const db = getDB()
         return db.collection('users').insertOne(this)
         .then((result) => {
            console.log(`THIS IS THE USER.... ${result}`)
         }).catch((err) => {
            console.log(err)
         });
    }

    // to post a product
    addToCart(product){
        const cartProductIndex = this.cart.items.findIndex(cp => {
            return cp.productId.toString() === product._id.toString()
        });
        let newQty = 1
        const updatedCartItems = [...this.cart.items] // stored the old items
        // if product greter than 0 qty
        if(cartProductIndex >= 0){
            // newQty became increase 
            newQty = this.cart.items[cartProductIndex].quantity + 1
            // old item have new items with default qty
            updatedCartItems[cartProductIndex].quantity = newQty
        }else{
            // if not add a new items add a new product in the cart
            updatedCartItems.push({
                productId: new ObjectId(product._id),   // pass the product in in ObjectId to determain each id and did not pass the title price etc
                quantity: newQty // pass the default qty
            }) 
        }
        const updatedCart ={
            items: updatedCartItems
        }
        const db = getDB()
        return db.collection('users').updateOne(
            {_id: new ObjectId(this._id)},
            {$set: {cart: updatedCart}}) // pass the updated cart to change the data

    }

    // to get the cart
     getCart(){
        const db = getDB()
        // map all items the return the id 
        const productsId = this.cart.items.map(i => {
            return i.productId
        })
        return db.collection('products').find({_id: {$in: productsId}}).toArray()
        .then(products => {
            return products.map(p => {
                // map the items the return an obj when sprees all products 
                return {
                    ...p,
                    quantity: this.cart.items.find(i => {
                        // return the productID in cartItems then exact to id of a products
                        return i.productId.toString() === p._id.toString() // ttrue
                    }).quantity 
                }
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    // delete specific items
    deleteItemFromCart(prodId){
        const updatedCartItems = this.cart.items.filter(item => {
            // check if id of items is exactly to product id
            return item.productId.toString() !== prodId.toString()   
        });
            const db = getDB()
            return db.collection('users').updateOne(
            {_id: new ObjectId(this._id)},
            {$set: {cart: {items: updatedCartItems}}}) // pass the updated cart to change the data
    }


    // add to order
    addOder(){
        const db = getDB()
        // used the getCart to get the data information
        return this.getCart()
        .then(products => {
            const oder = {
                items: products,
                user:{
                 _id: new ObjectId(this._id),
                 name: this.username
                }
             }
             // then pass the oder obj to insert the data
            return db.collection('orders').insertOne(oder)
        }).then(result => {
            // when it succesfult the cart are empty
            this.cart = {items: []}
            return db.collection('users').updateOne( // then also the user table or empty
                {_id: new ObjectId(this._id)},
                {$set: {cart: {items: []}}}
            )
        })
    }


    // getting the order
    getOrder(){
        const db = getDB()
        return db.collection('orders').find({'user._id': new ObjectId(this._id)}).toArray() // acces the user id by user_id
        
    }

    // find specific id
    static findUserById(userId){
        const db = getDB()
        return db.collection('users').findOne({_id: new ObjectId(userId)})
        .then(result => {
            console.log(result)
            return result
        })
        .catch(err => {
            console.log(err)
        })
    }
}







module.exports = User


*/





























/*const  Sequelize = require('sequelize');
const sequelize = require('../util/database');


const User = sequelize.define('user', {
    //set modelt attributes

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    name:{
        type:  Sequelize.STRING

    },

    email:{
        type: Sequelize.STRING,
    }

});

;*/
