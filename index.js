const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

const mysql = require('mysql2');

// Tạo kết nối
const connection = mysql.createConnection({
  host: 'localhost', // Địa chỉ máy chủ MySQL
  user: 'root',      // Tên người dùng MySQL
  password: '123456789',  // Mật khẩu MySQL
  database: 'cnweb35' // Tên của cơ sở dữ liệu bạn đã tạo
});

// Kết nối đến cơ sở dữ liệu
connection.connect(function(err) {
  if (err) {
    console.error('Lỗi kết nối:', err);
    return;
  }
  console.log('Kết nối thành công đến cơ sở dữ liệu MySQL');
});


// SELECT
connection.query('SELECT * FROM Profile', function (error, results, fields) {
    if (error) throw error;
    console.log('Dữ liệu từ cơ sở dữ liệu:', results);
  });