const express = require ("express")
const app = express()
const PORT = 8080
const mysql = require("mysql2")
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "luis",
    password: "Mediterraneo92",
    database: "expressDB",
 })

db.connect()

app.get('/createdb',(req,res)=>{
    let sql ='CREATE DATABASE expressDB';
    db.query(sql,(err,result)=>{
      if(err)throw err;
      console.log(result);
      res.send('Database created')
    })
  })

  app.get('/createproductstable',(req,res)=>{
    let sql = 'CREATE TABLE products(id INT AUTO_INCREMENT,name_product VARCHAR(255), price INT , PRIMARY KEY(id))'
      db.query(sql,(err,result)=> {
        if(err) throw err;
        console.log(result);
        res.send('products table created')
      })
    })
    
    app.get('/createcategoriestable',(req,res)=>{
        let sql = 'CREATE TABLE categories(id INT AUTO_INCREMENT,name_categories VARCHAR(255),descriptio VARCHAR (100) PRIMARY KEY(id))'
          db.query(sql,(err,result)=> {
            if(err) throw err;
            console.log(result);
            res.send('categories table created...')
          })
        })

        app.get("/createTableProductsCategories", (req, res) => {
            let sql = `CREATE TABLE productscategories(
        id INT AUTO_INCREMENT,
        product_id INT,
        category_id INT,
        PRIMARY KEY(id),
        FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE,
        FOREIGN KEY(category_id) REFERENCES categories(id)
        );`
          db.query(sql, (err, result) => {
              if (err) throw err;
              console.log(result);
              res.send("Table productsCategories created...");
            });
        })

       app.get("/newProduct", (req,res) => {
     
  let sql = `INSERT INTO products ( name_product, price) values
          ('${req.body.name_product}', '${req.body.price}');`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post added...");
  });

})


        



  
app.listen(PORT,() => console.log ("servidor levantado en el puerto" + PORT))