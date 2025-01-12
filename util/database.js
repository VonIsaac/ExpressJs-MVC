const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

let _db; 
const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://vonisaac:zEtUn9XMxJOAM19M@cluster0.awyt5.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
    .then(client => {
    console.log('Connected!')
    _db = client.db();
    console.log(_db);
    callback()
    })
    .catch(err => {
        console.log(err)
        throw err
    })
}

const getDB = () => {
    if (!_db) {
        throw new Error('No database connection established!');
    }
    return _db; // Return the database instance
};
exports.mongoConnect = mongoConnect
exports.getDB = getDB
/*const Sequelize = require('sequelize');

//set up the sequelie and put our infomation in our workbench
const sequelize = new Sequelize('node-complete', 'root', 'vonisaac2004', {
    dialect: 'mysql', 
    host: 'localhost',
    port: 3307, // Change this to the correct port if different from 3306
});

module.exports = sequelize;

*/