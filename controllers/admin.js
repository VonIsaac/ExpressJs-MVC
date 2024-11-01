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
  // use create method provided by sequelize to creat a new data but past it first the data types
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  }).then((result) => {
    //console.log(result)
    console.log('Creat a Products')
  }).catch(err => {
    console.log(err)
  })
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode){
     return res.redirect('/')
  }
  const prodId = req.params.productId
  Product.findById(prodId, product => {
    if(!product){
      return res.redirect('/')
   }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode, 
      product: product
     
    });
  });
};

exports.postEditProducts = (req, res, next) => {

  // stored the existing products data
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  //then stored in new Product class
  const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDesc, updatedPrice )

  // saved it 
  updatedProduct.save()

  res.redirect('/admin/products')
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};


exports.postDeleteProducts = (req, res, next) => {
    //call the id in ejs file
    const prodId = req.body.productId
    //use Product Model and use delete fn then pass the argument of an id of ejs 
    Product.deleteById(prodId);
    //after deleted wee redirect in this page  /admin/products
    res.redirect('/admin/products')
}
