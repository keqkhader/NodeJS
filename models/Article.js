const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "test",
  database: "expresslearn",
});

con.connect((e) => {
  if (e) {
    console.log(e.sqlMessage);
  } else {
    console.log("con");
    var sql =
      "CREATE TABLE articles (title VARCHAR(255), body VARCHAR(255) , numberOfLikes INT)";
    con.query(sql, (e, result) => {
      if (e) {
        console.log(e.sqlMessage);
      } else {
        console.log("Table created");
      }
    });
  }
});

module.exports = con;
