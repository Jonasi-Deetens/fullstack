import express from "express";
import pool from "../DB/mariadb.js";

const router = express.Router();


router.get("/", (req, res) => {
    (async () => {
        let connection;
        try {
            connection = await pool.getConnection();
            const data = await connection.query(`SELECT * FROM ideas`);
            res.send(data);
        } catch(err) {
            throw err;
        } finally {
            if (connection) connection.end();
        }
    })()
});

router.post("/addIdea", (req, res) => {
    console.log(req.body);
    const title = req.body.title;
    const idea = req.body.idea;
    const mysqlTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    (async () => {
        let connection;
        try {
            connection = await pool.getConnection();
            const prepare = await connection.prepare(`INSERT INTO ideas (title, idea, created_at) VALUES (?, ?, ?);`);
            prepare.execute([title, idea, mysqlTimestamp])
            res.status(200).send();
        } catch(err) {
            throw err;
        } finally {
            if (connection) connection.end();
        }
        res.status(500).send();
    })()
});

router.delete("/deleteIdea", (req, res) => {
    console.log(req.body);
    const id = req.body.id;

    (async () => {
        let connection;
        try {
            connection = await pool.getConnection();
            const prepare = await connection.prepare(`DELETE FROM ideas WHERE id=?`);
            prepare.execute([id])
            res.status(200).send();
        } catch(err) {
            res.status(500).send();
            throw err;
        } finally {
            if (connection) connection.end();
        }
    })()
});

router.put("/updateIdea", (req, res) => {
    console.log(req.body);
    const id = req.body.id;
    const title = req.body.title;
    const idea = req.body.idea;

    (async () => {
        let connection;
        try {
            connection = await pool.getConnection();
            const prepare = await connection.prepare(`UPDATE ideas
                                                        SET title = ?, idea = ?
                                                        WHERE id= ?;`);
            prepare.execute([title, idea, id])
            res.status(200).send();
        } catch(err) {
            res.status(500).send();
            throw err;
        } finally {
            if (connection) connection.end();
        }
    })()
});

export default router;