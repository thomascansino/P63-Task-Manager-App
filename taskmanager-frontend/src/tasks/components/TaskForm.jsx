import { useEffect, useState } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import myTasksStyles from '../MyTasks.module.css'
import 'react-datepicker/dist/react-datepicker.css'
import '../../App.css'

function TaskForm({ closeTaskForm, selectedDate }) {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(selectedDate); // date here is from setDate
    const [time, setTime] = useState(null); // time here is from setTime
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

    const createTask = async () => {
        if ( !time || !description ) {
            alert('Please fill in the time/task fields.');
            return;
        };
        
        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/tasks`, data, config);
            console.log(response.data);
            closeTaskForm();
        } catch (err) {
            console.error('Failed to create a task:', err.response.data.message);
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createTask();
    };

    return (
        <div className={myTasksStyles.modal}>
            <div className={myTasksStyles.overlay} onClick={closeTaskForm}></div>
            <div className={myTasksStyles['modal-form']}>
            
                <form onSubmit={handleSubmit}>
                    <div className={myTasksStyles['input-container']}>
                        <input type='text' placeholder='Create new task' value={description} onChange={(e) => setDescription(e.target.value)}/>
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
                        <button className={myTasksStyles.button} type='submit'>Create Task</button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default TaskForm;