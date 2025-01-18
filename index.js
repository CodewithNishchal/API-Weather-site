import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const port = 3000;
const app = express();
const api_key = "f75761f9f883fe7c159d2983169ac732";
var lon,lat;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.post("/", async (req, res) => {
    const name = req.body.name;
    try
    {
        const response = await axios.get("http://api.openweathermap.org/geo/1.0/direct?q=" + name + "&limit=5&appid=" + api_key);
    // res.render("test.ejs", { content: response.data[0].lat });    
        var result = response.data[0];
        lon = result.lon;
        lat = result.lat;
    }
    catch (error) {
    res.render("test.ejs", { content: "fucked up" });
    }

    try {
        const answer = await axios.get("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + api_key);
        res.render("test.ejs", {content: JSON.stringify(answer.data)});
    }
    catch (error) {
    res.render("test.ejs", { content: " "});
    }
})

app.listen(port, () => {
    console.log(`listening at port ${port}`);
})