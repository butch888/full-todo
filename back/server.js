const express = require('express');

const cors = require('cors');

const app = express();

const getTasksRouter = require('./rest/api/getTasks');
const addTaskRouter = require('./rest/api/addTask');
const editTaskRouter = require('./rest/api/editTask');
const isdoneTaskRouter = require('./rest/api/isdoneTask');
const delTaskRouter = require('./rest/api/delTask');

app.use(cors());

// получить все записи
app.use('/', getTasksRouter);

// добавить задачу
app.use('/', addTaskRouter);

// редактировать текст задачи по id
app.use('/', editTaskRouter);

// отметить задачу выполненной по id
app.use('/', isdoneTaskRouter);

// редактировать текст задачи по id
app.use('/', delTaskRouter);

const PORT = 3005;
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
