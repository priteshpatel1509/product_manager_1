const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

let tasks = [
  { taskID: 1, taskName: 'Design UI', status: 'Started' },
  { taskID: 2, taskName: 'Develop API', status: 'In Progress' },
  { taskID: 3, taskName: 'Testing', status: 'Completed' }
];

// READ all tasks
app.get('/api/gettasks', (req, res) => {
  res.json(tasks);
});

// CREATE new task
app.post('/api/addtasks', (req, res) => {
  const newTask = {
    taskID: tasks.length + 1,
    taskName: req.body.taskName,
    status: 'Started'
  };
  tasks.push(newTask);
  res.json(tasks);
});

// UPDATE task
app.put('/api/updatetasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.taskID === id);
  if (!task) return res.status(404).send('Task not found');
  task.taskName = req.body.taskName || task.taskName;
  task.status = req.body.status || task.status;
  res.json(tasks);
});
// DELETE task
app.delete('/api/deletetasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(t => t.taskID !== id);
  res.json(tasks);
});
// Serve AngularJS view
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
