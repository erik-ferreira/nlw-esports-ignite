import express from "express";

const app = express();

app.get("/ads", (req, res) => {
  console.log("Acessou");

  return res.status(200).json({ message: "Hello guys", name_user: "erik" });
});

app.listen(3333);
