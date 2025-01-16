const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  }
});

module.exports = mongoose.model('Products', productSchema);





























//calll sequelize library and import the sequlize 
/*const getDB = require('../util/database').getDB
const mongodb = require('mongodb')
class Product {

  constructor(title, price, imageUrl, description, id, userId){
    this.title = title
    this.price = price
    this.imageUrl = imageUrl
    this.description = description
    this._id = id ? new mongodb.ObjectId(id): null
    this.userId = userId
  }

  // to insert data to mongoDB
  save(){
    const db = getDB()
    let dbOp 
    if(this._id){
      // update the product
      // use updateOne then pass and id and use mongodb to acces id and pass second arg to update specific fields 
      dbOp = db.collection('products').updateOne({_id: this._id}, {$set: this})
    }else{
      dbOp = db.collection('products').insertOne(this)
    } 
    return dbOp
    .then((result) => { 
      console.log(`HERE'S THE RESULT....${result}`)
    }).catch((err) => {
      console.log(err)
    });
  }


  //get data from mongoDB
  static fetchAll(){
    const db = getDB()
    // use find to find all the data then use toArray 
    return db.collection('products').find().toArray()
    .then((products) => {
      console.log(products)
      return products
    })
    .catch(err => {
      console.log(err)
    })
  }

  // find by single id
  static findId(prodId){
    const db = getDB()
    // use mongodb and pass the prodId arg in  objectId from mongodb 
    return db.collection('products').find({_id: new mongodb.ObjectId(prodId) }).next()
      .then((products) => {
        console.log(products)
        return products
      })
      .catch(err => {
        console.log(err)
      })
  }


  //handle to delete method

  static deleteById(prodId){
    const db = getDB()
    return db.collection('products').deleteOne({_id: new mongodb.ObjectId(prodId)})
    .then((result) => {
      console.log('DELETED PRODUCT')
      //return result
    })
    .catch(err => {
      console.log(err)
    })
  }
}
module.exports = Product;
*/
/*const Product = sequelize.define('product', {
  //set the model attributes a nd data types etc.
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});*/

