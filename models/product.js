//calll sequelize library and import the sequlize 
const  Sequelize = require('sequelize');
const sequelize = require('../util/database');


const Product = sequelize.define('product', {
  //set the model attributes and data types etc.
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
});

module.exports = Product;