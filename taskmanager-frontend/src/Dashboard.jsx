import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import dashboardStyles from './Dashboard.module.css'
import MyCalendar from './MyCalendar.jsx'
import MyTasks from './tasks/MyTasks.jsx'
import './App.css'

function Dashboard() {
    const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        getTasks();
    }, [selectedDate]);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const getTasks = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/tasks`, config);
            setTasks(response.data);
            console.log('Get all tasks:', response.data);
        } catch (err) {
            console.error('Failed to get all tasks:', err.response.data.message);
        };

    };

    const getTask = async (taskId) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/tasks/${taskId}`, config);
            setSelectedTask(response.data);
            openTaskModal();
            console.log('Get a task from ID:', response.data);
        } catch (err) {
            console.error('Failed to get task:', err.response.data.message);
        };

    };

    const openTaskForm = () => {
        setIsTaskFormOpen(true);
        document.body.classList.add('blocked');
    };

    const closeTaskForm = () => {
        setIsTaskFormOpen(false);
        document.body.classList.remove('blocked');
        getTasks();
    };

    const openTaskModal = () => {
        setIsTaskModalOpen(true);
        document.body.classList.add('blocked');
    };

    const closeTaskModal = () => {
        setIsTaskModalOpen(false);
        document.body.classList.remove('blocked');
        getTasks();
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    
    return (
        <div className='dashboard-container'>
            <div className={dashboardStyles.logout} onClick={handleLogout}>Logout</div>
            <div className={dashboardStyles['calendar-container']}>
                <MyCalendar 
                setSelectedDate={setSelectedDate}
                />
            </div>
            <div className={dashboardStyles['tasks-container']}>
                <MyTasks 
                tasks={tasks} 
                selectedDate={selectedDate} 
                isTaskFormOpen={isTaskFormOpen} 
                openTaskForm={openTaskForm} 
                closeTaskForm={closeTaskForm} 
                isTaskModalOpen={isTaskModalOpen} 
                closeTaskModal={closeTaskModal}
                getTask={getTask}
                selectedTask={selectedTask}
                />
            </div>
        </div>
    )
};

export default Dashboard;