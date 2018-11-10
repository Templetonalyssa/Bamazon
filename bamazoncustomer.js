var mysql = require("mysql");
var inquirer = require ("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_DB"
});

// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("connected as id " + connection.threadId);
//   afterConnection();
// });

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected at connection id: " + connection.threadID)
    displayAllItems();
});

function displayAllItems() {
    connection.query("SELECT * FROM bamazon_DB.products", function (err, results) {
        if (err) throw err;

        for (var i = 0; i < results.length; i++) {
            console.log(results[i]);
          }

    })

    connection.end();
}

// function afterConnection() {
//   connection.query("SELECT * FROM products", function(err, res) {
//     if (err) throw err;
//     console.log(res);
//     connection.end();
//   });
// }
