const { query } = require("../database/database.js");

function createTable_Profile(opt) {
	const sql = `CREATE TABLE IF NOT EXISTS Profile (
        id INT(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        CCCD VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        phone_number VARCHAR(255) NOT NULL,
        date_of_birth TIMESTAMP NOT NULL,
        role ENUM('CUSTOMER', 'SELLER')
      );
      `;
	if (opt === true) {
		query(sql);
        setTimeout(() => console.log("create table profile"), 500);
		setTimeout(() => createdTable_Account(opt), 2000);
	}
}
function createdTable_Account(opt) {
	const sql = `CREATE TABLE IF NOT EXISTS Account (
        id INT(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
        profile_id INT(20) NOT NULL,
        account_name VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL,
        FOREIGN KEY (profile_id) REFERENCES Profile(id) ON DELETE CASCADE
    );    
    `;
	if (opt === true) {
		query(sql);
        setTimeout(() => console.log("create table account"), 500);
		setTimeout(() => createTable_Customer(opt), 2000);
	}
}
function createTable_Customer(opt){
    const sql = `CREATE TABLE IF NOT EXISTS Customer (
        id INT(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
        account_id INT(20) NOT NULL,
        FOREIGN KEY (account_id) REFERENCES Account(id) ON DELETE CASCADE
    );
    `;
    if (opt === true) {
		query(sql);
        setTimeout(() => console.log("create table customer"), 500);
		setTimeout(() => createTable_Seller(opt), 2000);
	}
}
function createTable_Seller(opt){
    const sql = `CREATE TABLE IF NOT EXISTS Seller (
        id INT(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
        shop_name TEXT,
        description TEXT,
        account_id INT(20) NOT NULL,
        FOREIGN KEY (account_id) REFERENCES Account(id) ON DELETE CASCADE
    );    
    `;
    if (opt === true) {
		query(sql);
        setTimeout(() => console.log("create table seller"), 500);
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
        seller_id INT(20),
        unit VARCHAR(50),
        price BIGINT,
        description TEXT,
        number INT,
        rating FLOAT,
        created_at TIMESTAMP NOT NULL,
        FOREIGN KEY (category_id) REFERENCES Category(id) ON DELETE CASCADE,
        FOREIGN KEY (seller_id) REFERENCES Seller(id) ON DELETE CASCADE
    );    
    `;
	if (opt === true) {
		query(sql);
        setTimeout(() => console.log("create table product"), 500);
		setTimeout(() => createdTable_ShippingInfo(opt), 2000);
	}
}
function createdTable_ShippingInfo(opt){
    const sql = `CREATE TABLE Shipping_info (
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
        ship_price DECIMAL (13, 2),
        total_price DECIMAL (13, 2),
        ship_id INT(20),
        created_at TIMESTAMP NOT NULL,
        FOREIGN KEY (customer_id) REFERENCES Customer(id) ON DELETE CASCADE,
        FOREIGN KEY (ship_id) REFERENCES Shipping_info(id) ON DELETE CASCADE
    );
    `;
	if (opt === true) {
		query(sql);
        setTimeout(() => console.log("create table order"), 500);
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

createTable_Profile(true);
createdTable_Account(true);
createTable_Customer(true);
createTable_Seller(true);
createdTable_Category(true);
createdTable_Product(true);
createdTable_ShippingInfo(true);
createdTable_Order(true);