const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // use req user from user table that wee creat in app
  req.user.createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description,
  })
 .then((result) => {
    //console.log(result)
    console.log('Creat a Products')
    res.redirect('/admin/products')
  }).catch(err => {
    console.log(err)
  })
};

exports.getEditProduct = (req, res, next) => {
  // get the query in our url 
  const editMode = req.query.edit;
  if(!editMode){
     return res.redirect('/')
  }
  const prodId = req.params.productId
 // req.user.getProducts({where: {id: prodId}})
  Product.findByPk(prodId)
  .then((products) => {
    //const product = products[0]
    // if wee not have product wee redirect in main page
    if(!products){
      return res.redirect('/')
   }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode, 
      product: products
     
    });
  }).catch(err => {
    console.log(err)
  })
};

exports.postEditProducts = (req, res, next) => {

  // stored the existing products data
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  //call the findpk to pass an id
  Product.findByPk(prodId)
  // use first then() to make async req to db
  .then((product) => {
    //use our model and defined the product attrubutes
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.imageUrl = updatedImageUrl;
    product.description = updatedDesc;
    //return and  then saved it back to our db
    return product.save()
  })
  /*use the second .then() to modifying the properties and
   save the updated products(product.saved()) back to db*/
  .then(result => {
    console.log('UPDATED PRODUCT', result)
    res.redirect('/admin/products')
  })
  //this catch block  would catch the two promises
  .catch(err => {
    console.log(err)
  })

}

exports.getProducts = (req, res, next) => {
  req.user.getProducts()
  .then((products) => {
    console.log(products)
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(err => {
    console.log(err)
  })
};


exports.postDeleteProducts = (req, res, next) => {
    //call the id in ejs file
    const prodId = req.body.productId
    // use findPk to search for an id 
    Product.findByPk(prodId)
    // the first then is to wait for finByPk to complete
    .then((product) => {
      //when its done, procced  to product destroy to delete the data and return it
      return product.destroy()
    })
    // after i return , the data will be deleted 
    // i use second  then to succesfully delete the data
    .then(result => {
      console.log("DESTROY PRODUCT");
        //after deleted wee redirect in this page  /admin/products
      res.redirect('/admin/products')
    })
    .catch(err => {
      console.log(err)
    })
  
}
