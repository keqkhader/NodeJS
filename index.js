const express = require("express");
const app = express();
const Article = require("./models/Article.js");

app.use(express.json());

app.post("/articles", (req, res) => {
  const title = JSON.stringify(req.body.title);
  const body = JSON.stringify(req.body.body);
  const number = JSON.stringify(req.body.number);
  const sql = `INSERT INTO articles (title, body, numberOfLikes) VALUES (${title},${body},${number})`;
  Article.query(sql, (e, result) => {
    if (e) {
      res.send(e.sqlMessage);
    }
    res.json("done");
  });
});
app.get("/articles/:articleId", (req, res) => {
  const id = req.params.articleId;
  try {
    Article.query(`SELECT * FROM articles WHERE ID = ${id}`, (e, result) => {
      if (e) {
        res.send(e.sqlMessage);
      } else {
        res.json(result);
      }
    });
  } catch (error) {
    res.send(e);
  }
});

app.delete("/articles/:articleId", (req, res) => {
  const id = req.params.articleId;

  Article.query(`DELETE FROM articles WHERE ID = ${id}`, (e, result) => {
    if (e) {
      res.json(e.sqlMessage);
    } else {
      if (result.affectedRows == 0) {
        res.json("The row dose not exsits");
      } else {
        res.json(`Number of records deleted: ${result.affectedRows}`);
      }
    }
  });
});

app.get("/articlesAll", (req, res) => {
  Article.query("SELECT * FROM articles", (e, result) => {
    res.render("test.ejs", {
      all: result,
    });
  });
});

app.listen(3500, () => {
  console.log("Listen");
});
