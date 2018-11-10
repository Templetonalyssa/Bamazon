DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(20),
  price DECIMAL (10,2),
  stock_quantity INT (5),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("red shoes", "Footwear", 15.76, 32), ("velvet pumps", "Footwear", 23.75, 20), ("pretzels", "Groceries", 3.99, 53), ("potato chips", "Groceries", 3.95, 25), ("bean bags", "Furniture", 45.55, 42), ("couch", "Furniture", 399.99, 15), ("baseball bat", "Sports Equipment", 54.95, 33), ("basketball", "Sports Equipment", 20.00, 15), ("black raybans", "Sunglasses", 55.33, 10), ("purple raybans", "Sunglasses", 55.33, 10);