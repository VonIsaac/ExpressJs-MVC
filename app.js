const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const Product = require('./models/product');

const user = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/orders')
const OrderItem = require('./models/orders-item')

app.use((req, res, next) => {
    User.findByPk(1)
    .then((user) => {
        req.user = user;
        next()
    })
    .catch(err => {
        console.log(err)
    })
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// Declaire Association in Sequelize to store new Tables sql
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'}); // many to one
User.hasMany(Product) // one to many 
User.hasOne(Cart); // one to one 
Cart.belongsTo(User) // many to one 
Cart.belongsToMany(Product, {through: CartItem}); // many to many
Product.belongsToMany(Cart ,  {through: CartItem}) // many to many
Order.belongsTo(User); // many to one 
User.hasMany(Order) // one to many
Order.belongsToMany(Product, {through: OrderItem}) // many to many
//Product.belongsToMany(Order, {through: OrderItem}) // many to many


// syncronited them model
sequelize
.sync({force: true})
//.sync()
.then((result) => {
    //check if wee have a one id
    return User.findByPk(1)
   // console.log(result);
})
.then(user => {
    // if not user creat a new name, email
    if(!user){
      return  User.create({name: 'Von', email: 'vonbaban1@gmail.com'})
    }

    //then return the user
    return user;
})
.then(user => {
    //console.log(user)
   return user.createCart()
    
})

.then(cart => {
    app.listen(3000)
})
.catch(err => {
    console.log(err)
});

