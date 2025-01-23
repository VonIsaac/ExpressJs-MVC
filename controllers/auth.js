const User = require('../models/user');
const bycrypt = require('bcryptjs')

exports.getLogin = (req, res, next) => {
  
 //console.log(req.session.isLoggeInd)
    res.render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      isAuthenticated: false
    });
  };

  exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      isAuthenticated: false
    });
  };
  
  exports.postLogin = (req, res, next) => {
    //extract the  email  and password from the request body
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email})
    .then(user => {
      // if wee enter wrong email
      if(!user){
        return res.redirect('/login')
      }
      // use bycrypt to compare the password
      return bycrypt.compare(password, user.password)
      .then(doMatch => {
        if(doMatch){
          req.session.isLoggedIn = true;
          req.session.user = user; // this is to store the user in the session
          return req.session.save(err => { // this is to make sure that the session is saved before redirecting
          console.log(err);
          res.redirect('/');
        });
        }
        res.redirect('/login')
      })
      .catch(err => {
        console.log(err)
        res.redirect('/login')
      })
    })
      .catch((err) => {
        console.log(err);
      });
  };

  exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword
    // find the user by email
    User.findOne({email: email})
    .then((userDoc) => {
      // if wee enter the same email
      if(userDoc){
        return res.redirect('/signup')
      }
      // create bycrypt password 
      return bycrypt.hash(password, 12)
      .then(hashPssword =>{
        // create new user with email and password
        const user = new User({
         email: email,
         password: hashPssword,
         cart: {
           items: []
         }
       })
       return user.save()
     })
    })  
    .then(result => {
      console.log(result)
      res.redirect('/login')
    })
    .catch(err => {
      console.log(err)
    })

  };


  exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
      console.log(err);
      res.redirect('/');
    });
  };