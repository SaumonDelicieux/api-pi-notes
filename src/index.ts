import express from "express";
const app = express();

app.get("/", function (req, res) {
  res.send("Hello world 2").status(200);
});

app.listen(3000, () => {
  console.log("App listening on PORT 3000");
});
