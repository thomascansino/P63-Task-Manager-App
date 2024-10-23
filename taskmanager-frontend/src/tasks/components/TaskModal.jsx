import { useState } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import myTasksStyles from '../MyTasks.module.css'
import 'react-datepicker/dist/react-datepicker.css'
import '../../App.css'

function TaskModal({ closeTaskModal, selectedTask }) {    
    const [description, setDescription] = useState(selectedTask.description);
    const [date, setDate] = useState(new Date(selectedTask.date)); // date here is from setDate
    const [time, setTime] = useState(new Date(selectedTask.time)); // time here is from setTime
    const token = localStorage.getItem('token');

    const handleDateChange = (date) => { // date here is from DatePicker
        setDate(date);
    };

    const handleTimeChange = (time) => { // time here is from DatePicker
        setTime(time);
    };

    const data = { // req.body in backend
        description,
        time,
        date, 
    };

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const updateTask = async () => {
        try {
            
            if ( !time || !description ) {
                alert('Please fill in all fields');
                return;
            };
            
            const response = await axios.put(`http://localhost:5001/api/tasks/${selectedTask._id}`, data, config);
            console.log('Task updated:', response.data);
            closeTaskModal();
        } catch (err) {
            console.error('Failed to update a task:', err.response.data.message);
        };
    };

    const deleteTask = async () => {
        try {
            const response = await axios.delete(`http://localhost:5001/api/tasks/${selectedTask._id}`, config);
            console.log('Task deleted:', response.data);
            closeTaskModal();
        } catch (err) {
            console.error('Failed to delete a task:', err.response.data.message);
        };
    };

    return (
        <div className={myTasksStyles.modal}>
            <div className={myTasksStyles.overlay} onClick={closeTaskModal}></div>
            <div className={myTasksStyles['modal-form']}>

                <div>
                    <div className={myTasksStyles['input-container']}>
                        <input type='text' placeholder='description' value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </div>

                    <div className={myTasksStyles['input-container']}>
                        <DatePicker 
                        selected={date}
                        onChange={handleDateChange}
                        placeholderText='Select date'
                        />
                    </div>

                    <div className={myTasksStyles['input-container']}>
                        <DatePicker 
                        selected={time}
                        onChange={handleTimeChange}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeFormat='hh:mm a'
                        dateFormat='hh:mm a'
                        placeholderText='Select a time'
                        />
                    </div>

                    <div>
                        <button className={myTasksStyles.button} onClick={updateTask}>Modify Task</button>
                        <button className={myTasksStyles.button} onClick={deleteTask}>Delete Task</button>
                    </div>

                </div>

            </div>
        </div>
    )
};

export default TaskModal;