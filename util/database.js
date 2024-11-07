const Sequelize = require('sequelize');

//set up the sequelie and put our infomation in our workbench
const sequelize = new Sequelize('node-complete', 'root', 'vonisaac2004', {
    dialect: 'mysql', 
    host: 'localhost',
    port: 3307, // Change this to the correct port if different from 3306
});

module.exports = sequelize;

