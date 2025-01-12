const Product = require('../models/product');


exports.getProducts = (req, res, next) => {
  //use fine all to select alll the data
  Product.fetchAll()
  .then(products => {
    console.log(products)
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch(err => {
    console.log(err)
  })
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  //use findk to find the id pof producsrt
  Product.findId(prodId)
  .then(product => {
    console.log(product)
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  })
  .catch(err => {
    console.log(err)
  })

 /* Product.findAll({where: {id: prodId}})
  .then((products) => {
    res.render('shop/product-detail', {
      product: products[0],
      pageTitle: products[0].title,
      path: '/products'
    });
  })
  .catch(err => console.log(err))*/
  

 
};

exports.getIndex = (req, res, next) => {
  //use fine all to select alll the data
  Product.fetchAll()
  .then(products => {
    console.log(products)
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(err => {
    console.log(err)
  })
};

exports.getCart = (req, res, next) => {
  console.log(req.user.cart)
  req.user.getCart() // one to one
  .then((cart) => {
    if (!cart) {
      throw new Error('Cart not found');
    }
  
      return cart.getProducts() // many to many
      .then((products) => {
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: products
        });
        /*res.status(200).json(  {
          pageTitle: 'Your Cart',
          cart: products,
        } );*/
      })
      .catch(err => {
        console.log(err)
      })
  })
  
  .catch(err => {
    console.log(err)
  })




  /*Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(prod => prod.id === product.id);
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      };
      
    });
  });*/
};


exports.postCart = (req, res, next) => {
  // gettinf the productId
  const prodId = req.body.productId;
  Product.findId(prodId)
  .then(product => {
    return req.user.addToCart(product)
  })
  .then(result => {
    console.log(result)
  })
  .catch(err => {

  })






  /*let fetchCart;
  let newQuantity = 1;
  req.user.getCart() // one to one
  .then((cart) => {
    fetchCart = cart // Store the retrieved cart in `fetchCart`
    // Check if the cart already has the product with the given ID 
    // and use the getProduct from User.hasMany(Product
    return cart.getProducts({where: {id: prodId}}) // many to many
  })
  .then(products => {
    let product;
    // if our product is greater than 0
    if(products.length > 0){
      // If it exists, assign the first (and only) product in `products` array to `product`
      product = products[0];
    }
    if(product){
      // if wee have a product creat oldqty const  then value the product 
      const oldQuantity = product.cartItem.quantity
      // then pass the new qty to old qty the increment by 1 
      newQuantity = oldQuantity + 1
      return product
    }else{
      // Find the product by its ID in the Product model to ensure it's a valid product
      return Product.findByPk(prodId)
    }
    
  })
  .then(product => {
    // use the fetchtCart and get and use addProduct from Cart.belongsToMany(Product, {through: CartItem});
    return fetchCart.addProduct(product, {
      // look for the CartItem Table that wee creat 
      through:{quantity: newQuantity}
    }) // many to many
  })
  .then(() => {
     // After successfully adding/updating the product in the cart, redirect to the cart page
    res.redirect('/cart')
  })
  .catch(err => {
    console.log(err);
  })*/
};

exports.postCartDeleteProduct = (req, res, next) => {
  //get the product req.id in ejs
  const prodId = req.body.productId;
  req.user.getCart() // one to one
  .then((cart) => {
    //use the getProducts from hasmany then where the id to pass the id's
    return cart.getProducts({where: {id: prodId}}) // many to many
  })
  .then((products) => {
    // and extract the first element in arry 
    const product = products[0];
    // then the product is destroy to delete the qty from the cart-item table  and not the product table. 
    product.cartItem.destroy()
  })
  .then((result) => {
    // and if an everty ok wee redirect in the cart pages
    res.redirect('/cart')
  })
 
  .catch(err => {
    // catch a potential error
    console.log(err)
  })
 
};

exports.postOrder = (req, res, nex) => {
  let fetchedCart 
  req.user.getCart() // one to one
  .then((cart) => {
    //stored the cart in empyt variable(fethcedCart)
    fetchedCart = cart
    // then return the cart and pass the getProducts from sequelize 
    return cart.getProducts() // - one to many
  })
  .then(products => {
    // return from user belongsTo
    return req.user.createOrder() // many to one
    .then((order) => {
      // use the addProducts from many to many relation and pass the products and map it to mapping all arry data 
      return order.addProducts(products.map(product => {
        //after wee map use to orderItem from the oderitem model, provide by sequqlize.
        product.orderItem = {quantity: product.cartItem.quantity} // and equal to object the value the product amd pass the cartItem from the carItem Models and get the qty of item
        return product // lastly return this product
      })) // many to many
    })
    .catch(err => {
      console.log(err)
    })
  })
  .then((result) => {
    // use the fetchedCart then call serProducts from sequelize then pass it in null
    return fetchedCart.setProducts(null) // one to many
  })
  .then(result => {
    res.redirect('/orders')
  })
  .catch(err => {
    console.log(err)
  })
}

exports.getOrders = (req, res, next) => {
  req.user.getOrders({include: ['products']}) // many to many
  .then((orders) => {
   /* res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders
    });*/
    res.status(200).json(  {
      pageTitle: 'Your Orders',
      orders: orders,
    } );
  })
  .catch(err => {
    console.log(err)
  })
};