const express = require('express');
const pool = require('../../bd');

const getTasksRouter = express.Router();

// получить все записи
// eslint-disable-next-line consistent-return
getTasksRouter.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks ORDER BY id DESC');
        res.send(result.rows);
        return result.rows;
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = getTasksRouter;
