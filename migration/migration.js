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
		setTimeout(() => createdTable_Account(opt), 2000);
	}
}
function createdTable_Account(opt) {
	const sql = `CREATE TABLE IF NOT EXISTS Account (
        id INT(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
        account_name VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL
    );    
    `;
	if (opt === true) {
		query(sql);
		setTimeout(() => createTable_Customer(opt), 2000);
	}
}
function createTable_Customer(opt){
    const sql = `CREATE TABLE IF NOT EXISTS Customer (
        id INT(20) NOT NULL PRIMARY KEY AUTO_INCREMENT
    );
    `;
    if (opt === true) {
		query(sql);
		setTimeout(() => createTable_Seller(opt), 2000);
	}
}
function createTable_Seller(opt){
    const sql = `CREATE TABLE IF NOT EXISTS Seller (
        id INT(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
        shop_name TEXT,
        description TEXT
    );    
    `;
    if (opt === true) {
		query(sql);
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
        created_at TIMESTAMP NOT NULL
    );    
    `;
	if (opt === true) {
		query(sql);
		setTimeout(() => createdTable_Order(opt), 2000);
	}
}

// function createdTable_ShippingInfo(opt){
//     const sql = `CREATE TABLE shipping_info (
//         id INT(11) NOT NULL AUTO_INCREMENT,
//         address VARCHAR(255),
//         phoneNo VARCHAR(20) ,
//         city VARCHAR(100) ,
//         PRIMARY KEY (id)
//       );
//       `;
//       if (opt === true){
//         query(sql);
//         setTimeout(() => createdTable_Order, 2000);
//       }
// }

function createdTable_Order(opt) {
	const sql = `CREATE TABLE IF NOT EXISTS Orders (
        id INT(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
        product_id INT(20) NOT NULL,
        customer_id INT(20) NOT NULL,
        created_at TIMESTAMP NOT NULL
    );
    `;
	if (opt === true) {
		query(sql);
		setTimeout(() => console.log("created all table"), 2000);
	}
}

createTable_Profile(true);
