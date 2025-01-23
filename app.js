const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const csrf = require('csurf')

const errorController = require('./controllers/error');
//const mongoConnect = require('./util/database').mongoConnect
//const sequelize = require('./util/database');

//const Product = require('./models/product');

const User = require('./models/user')

const app = express();

const MONOGDB_URI = 'mongodb+srv://vonisaac:zEtUn9XMxJOAM19M@cluster0.awyt5.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0'
// use the mongodb store to store the session
const store = new MongoDBStore({
    uri: MONOGDB_URI,
    collection: 'sessions'
})

const csrfProtection = csrf({

})

app.set('view engine', 'ejs');
app.set('views', 'views');

//routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// set cookie
app.use(session({
    secret: 'my secret cookies',
    resave: false,
    saveUninitialized: false,
    store: store
}))

app.use(csrfProtection)

app.use((req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    User.findById(req.session.user._id) // find the user by id in the session
      .then(user => {
        req.user = user; // store the user in the request object 
        next();
      })
      .catch(err => console.log(err));
  });
  
  app.use((req, res, next) => {
    res.locals.isAunthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
  });

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);


app.use(errorController.get404);

// to connect mongodb url and to regiterd email and num
mongoose.connect(MONOGDB_URI)
.then(result => {
    app.listen(3000)
})
.catch(err => {

})















































//models 
/*const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/orders')
const OrderItem = require('./models/orders-item')

*/
/*app.use((req, res, next) => {
    User.findByPk(1)
    .then((user) => {
        req.user = user;
        next()
    })
    .catch(err => {
        console.log(err)
    })
})*/

// Declaire Association in Sequelize to store new Tables sql
/*Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'}); // many to one
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
   return user.createCart() // one to one
    
})

.then(cart => {
    app.listen(3000)
})
.catch(err => {
    console.log(err)
});
*/
