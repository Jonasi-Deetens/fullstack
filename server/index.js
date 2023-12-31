import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());

import ideas from "./Routers/ideaRouter.js";
app.use("/ideas", ideas);

app.listen(process.env.PORT, () => {
    console.log("Welcome, App is listening on port: " + process.env.PORT);
});

