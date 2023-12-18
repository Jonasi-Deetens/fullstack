import express from "express";
import json_encode from "json_encode";
import dotenv from "dotenv";
dotenv.config();

const app = express();

//app.use(json_encode);

app.on("listen", (req, res) => {
    console.log("hey");
});

app.listen(process.env.PORT, () => {
    console.log("Welcome, App is listening on port: " + process.env.PORT);
});

