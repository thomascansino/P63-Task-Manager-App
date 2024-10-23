const Task = require('../models/taskModel');
const asyncHandler = require('express-async-handler');

//@desc Get all tasks of the logged in user
//@route GET /api/tasks
//@access private
const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ user_id: req.user.id });
    
    res.status(200).json(tasks);
});

//@desc Create new task of the logged in user
//@route POST /api/tasks
//@access private
const createTask = asyncHandler(async (req, res) => {
    console.log('The task to be created is:', req.body);
    const { description, time, date } = req.body;
    if ( !description || !time ) {
        res.status(400);
        throw new Error(`A ${ !description && !time ? 'description and time' : !description ? 'description' : 'time' } is/are mandatory.`);
    };

    const finalDate = date ? new Date(date) : new Date(); 

    const task = await Task.create({ // proven & tested, when you create a document in database it will strictly follow the type you set in mongoose...no matter how much you format the date and time here, it will never be a string, it will always be a date object
        user_id: req.user.id, // objectid type
        description, // string type
        time, // this is a date object type
        date: finalDate, // this is a date object type
    });
    
    res.status(201).json(task);
});

//@desc Get a specific task of the logged in user
//@route GET /api/tasks/:id
//@access private
const getTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if ( !task ) {
        res.status(404);
        throw new Error("This task doesn't exist!");
    };

    res.status(200).json(task);
});

//@desc Update a specific task of the logged in user
//@route PUT /api/tasks/:id
//@access private
const updateTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if ( !task ) {
        res.status(404);
        throw new Error("This task doesn't exist!");
    };

    if ( task.user_id.toString() !== req.user.id ) {
        res.status(403);
        throw new Error("User doesn't have permission to update other user tasks");
    };

    const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // show the updated task in response
    );

    res.status(201).json(updatedTask);
});

//@desc Delete a specific task of the logged in user
//@route DELETE /api/tasks/:id
//@access private
const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if ( !task ) {
        res.status(404);
        throw new Error("This task doesn't exist!");
    };

    if ( task.user_id.toString() !== req.user.id ) {
        res.status(403);
        throw new Error("User don't have permission to update other user tasks");
    };

    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedTask);
});

module.exports = {
    getTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
};