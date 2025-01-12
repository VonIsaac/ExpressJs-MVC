const e = require('express')
const mongodb = require('mongodb')
const getDB = require('../util/database').getDB


const ObjectId = mongodb.ObjectId;
class User{
    constructor(username, email, cart, id){
        this.username = username
        this.email = email
        this.cart = cart // {item: []}
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

    addToCart(product){
        /*const cartProduct = this.cart.items.findIndex(cp => {
            return cp._id === product._id
        });*/

        // creat a items obj whit arry inside this put product id and creqt qty set to 1
        const updatedCart ={
            // pass the product in in ObjectId to determain each id and did not pass the title price etc
            items: [{productId: new ObjectId(product._id), quantity: 1}]
        }
        const db = getDB()
        return db.collection('users').updateOne(
            {_id: new ObjectId(this._id)},
            {$set: {cart: updatedCart}}) // pass the updated cart to change the data

    }
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
