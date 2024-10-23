const express = require('express');
const router = express.Router();
const { getTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
 } = require('../controllers/taskController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);
router.route('/').get(getTasks).post(createTask);
router.route('/:id').get(getTask).put(updateTask).delete(deleteTask);

module.exports = router;