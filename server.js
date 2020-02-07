const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("database.json");
const database = lowdb(adapter);
const express = require("express");
const app = express();
const cors = require('cors')
const port = process.env.PORT || 8000;

app.use(cors());


const initiateDatabase = () => {
  const databaseInitiated = database.has("products", "shoppingCart").value();

  if (!databaseInitiated) {
    database.defaults({ shoppingCart: [], Products: [] }).write();
  }
};

const insertProduct = name => {
  let message = "";
  const findProduct = database.get('products').find({ name: name }).value();
  const findProductInCart = database.get('shoppingCart').find({ name: name }).value();

  if (typeof findProduct === "undefined") {
    message = {
      success: false,
      message: "product does not exist"
    };
  } else if (typeof findProductInCart !== "undefined") {
    message = {
      success: false,
      message: "Product already added to cart"
    };
  } else {

    database.get("shoppingCart").push(findProduct).write();
    message = {
      success: true,
      message: "Product added to cart"
    }
    };

return message;
}



  const removeProduct = name => {
    let message = "";
    const findProductInCart = database
    .get("shoppingCart")
    .find({ name: name })
    .remove();

  if (typeof findProductInCart == "undefined") {
    
    message = {
      success: false,
      message: "Cant remove unexisting product"
    };
  } else {
    
    database
      .get("shoppingCart")
      .remove(findProductInCart)
      .write();

    message = {
      success: true,
      message: "Product deleted from cart"
    };
  }
  return message;
 };

const getProducts = () => {
  return database.get("products");
};

  const getShoppingCart = () => {
  return database.get("shoppingCart");
 };



//Hämtar alla listade produkter
    app.get("/api/getProducts", (request, response) => {
    console.log(request.url)
    const data = getProducts();
    response.send(data);
  });

    app.get("/cart", (request, response) => {
    response.send();
   });
//hämtar carten
    app.get("/api/getCart", (request, response) => {
    const data = getShoppingCart();
    response.send(data);
    });
//lägger till i carten
    app.post("/api/product/cart", (request, response) => {
    const name = request.query.name;
    const res = insertProduct(name);
    response.send(res);
   });
//tar bort från  carten
    app.delete("/api/cart/product", (request, response) => {
    console.log(request.url);
    const name = request.query.name
    const res = removeProduct(name);
    response.send(res);
    });

    app.listen(port, () => {
    console.log("Server started on port: ", port);
    initiateDatabase();
   });