var mysql = require("mysql");
var inquirer = require("inquirer");

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

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected")
    displayAllItems();
    start();
});

function displayAllItems() {
    connection.query("SELECT * FROM bamazon_DB.products", function (err, results) {
        if (err) throw err;

        for (var i = 0; i < results.length; i++) {
            console.log(results[i]);
        }

    })

}

function start() {
    inquirer
        .prompt([{
            name: "idChoice",
            type: "input",
            message: "What is the item ID of the product you would like to buy?",
            validate: function (value) {
                if (value > 0 && value <= 10) {
                    return true;
                }
                return "Pick an ID number less than 11";
            }
        }, {
            name: "unitChoice",
            type: "input",
            message: "How many units of the product you would like to buy?",
            validate: function (value) {
                if (value > 0) {
                    return true;
                }
                return "Please enter a unit value of 1 or greater";
            }
        }])
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            console.log("Purchase " + answer.unitChoice + " units of product ID " + answer.idChoice);

            
            checkRequest(parseInt(answer.unitChoice), parseInt(answer.idChoice));
            //connection.end();
        });

}

function checkRequest (unit, id) {
    // Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
          console.log(unit);
     connection.query("SELECT stock_quantity FROM products WHERE ?" , {item_id:id}, function(err, result){

        if (result[0].stock_quantity >= unit) {
            // bid was high enough, so update db, let the user know, and start over
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: result[0].stock_quantity - unit
                },
                {
                  item_id: id
                }
              ],
              function(error) {
                if (error) throw error;
                console.log("Item purchased successfully!");
                start();
              }
            );
          }
          else {
            // bid wasn't high enough, so apologize and start over
            console.log("We do not have that many items in stock. Choose a lower quantity...");
            start();
          }

     })

    // If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
    // However, if your store does have enough of the product, you should fulfill the customer's order.
    
    // This means updating the SQL database to reflect the remaining quantity.
    // Once the update goes through, show the customer the total cost of their purchase.
    
}