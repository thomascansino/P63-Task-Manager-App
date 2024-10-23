const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        description: {
            type: String,
            required: [true, 'Please have a description'],
        },
        time: {
            type: Date,
            required: [true, 'Please indicate what time'],
        },
        date: {
            type: Date,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Task', taskSchema);