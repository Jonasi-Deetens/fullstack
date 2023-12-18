import express from "express";
import cors from "cors";
import mariadb from "mariadb";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    connectionLimit: 5
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/ideas", (req, res) => {
    (async () => {
        let connection;
        try {
            connection = await pool.getConnection();
            const data = await connection.query(`SELECT * FROM ideas_db.ideas`);
            res.send(data);
        } catch(err) {
            throw err;
        } finally {
            if (connection) connection.end();
        }
    })()
});

app.post("/addIdea", (req, res) => {
    console.log(req.body);
    const idea = req.body.idea;
    (async () => {
        let connection;
        try {
            connection = await pool.getConnection();
            await connection.query(`INSERT INTO ideas_db.ideas (idea) VALUES ('${idea}');`);
        } catch(err) {
            throw err;
        } finally {
            if (connection) connection.end();
        }
    })()
    res.status(200).send();
});

app.listen(process.env.PORT, () => {
    console.log("Welcome, App is listening on port: " + process.env.PORT);
});

