const { query } = require("../database/database.js");

function createdTable_Account(opt) {
	const sql = `CREATE TABLE IF NOT EXISTS Account (
        id INT(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
        account_name VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        CCCD VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        phone_number VARCHAR(50) NOT NULL,
        date_of_birth TIMESTAMP NOT NULL,
        role enum("admin", "user"),
        created_at TIMESTAMP NOT NULL
    );    
    `;
	if (opt === true) {
		query(sql);
        setTimeout(() => console.log("create table account"), 500);
        setTimeout(() => createdTable_Category(opt), 2000);
	}
}

function createdTable_Category(opt) {
	const sql = `CREATE TABLE IF NOT EXISTS Category (
        id INT(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL
    );
    `;
	if (opt === true) {
		query(sql);
        setTimeout(() => console.log("create table category"), 500);
		setTimeout(() => createdTable_Product(opt), 2000);
	}
}
function createdTable_Product(opt) {
	const sql = `CREATE TABLE IF NOT EXISTS Product (
        id INT(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        img VARCHAR(255),
        category_id INT(20),
        unit VARCHAR(50),
        price BIGINT,
        description TEXT,
        number INT,
        rating FLOAT,
        created_at TIMESTAMP NOT NULL,
        FOREIGN KEY (category_id) REFERENCES Category(id) ON DELETE CASCADE
    );    
    `;
	if (opt === true) {
		query(sql);
        setTimeout(() => console.log("create table product"), 500);
		setTimeout(() => createdTable_ShippingInfo(opt), 2000);
	}
}
function createdTable_ShippingInfo(opt){
    const sql = `CREATE TABLE IF NOT EXISTS Shipping_info (
        id INT(20) NOT NULL AUTO_INCREMENT,
        address VARCHAR(255),
        phoneNo VARCHAR(20) ,
        city VARCHAR(100) ,
        PRIMARY KEY (id)
      );
      `;
      if (opt === true){
        query(sql);
        setTimeout(() => console.log("create table shipping info"), 500);
        setTimeout(() => createdTable_Order(opt), 2000);
      }
}
function createdTable_Order(opt) {
	const sql = `CREATE TABLE IF NOT EXISTS Orders (
        id INT(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
        customer_id INT(20) NOT NULL,
        status VARCHAR(255),
        ship_price DECIMAL (13, 2),
        total_price DECIMAL (13, 2),
        ship_id INT(20),
        created_at TIMESTAMP NOT NULL,
        FOREIGN KEY (customer_id) REFERENCES Account(id) ON DELETE CASCADE,
        FOREIGN KEY (ship_id) REFERENCES Shipping_info(id) ON DELETE CASCADE
    );
    `;
	if (opt === true) {
		query(sql);
        //setTimeout(() => console.log("create table order"), 500);
		setTimeout(() => createdTable_ItemOrder(opt), 2000);
	}
}
function createdTable_ItemOrder(opt){
    const sql = `CREATE TABLE IF NOT EXISTS ItemOrder (
        id INT(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
        product_id INT(20) NOT NULL,
        order_id INT(20) NOT NULL,
        amount INT(10) NOT NULL,
        created_at TIMESTAMP NOT NULL,
        FOREIGN KEY (order_id) REFERENCES Orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES Product(id) ON DELETE CASCADE
    );
    `;
	if (opt === true) {
		query(sql);
		setTimeout(() => console.log("created all table"), 2000);
	}
}

createdTable_Account(true);