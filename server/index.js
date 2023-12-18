import express from "express";
import cors from "cors";
import mariadb from "mariadb";
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

app.listen(process.env.PORT, () => {
    console.log("Welcome, App is listening on port: " + process.env.PORT);
});

