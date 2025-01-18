import express from "express";
import bodyParser from "body-parser";

var port = 3000;
var app = express();

app.use(express.static("public"));

app.listen(port, () =>
{
    console.log(`listening at ${port}`);
})