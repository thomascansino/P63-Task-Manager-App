import { useState, useEffect } from 'react'
import myTasksStyles from './MyTasks.module.css'
import TaskForm from './components/TaskForm.jsx'
import TaskModal from './components/TaskModal.jsx'
import '../App.css'

function MyTasks({ 
    tasks, 
    selectedDate, 
    isTaskFormOpen, 
    openTaskForm, 
    closeTaskForm,
    isTaskModalOpen,
    closeTaskModal,
    getTask,
    selectedTask,
    }) {
    const [currentPage, setCurrentPage] = useState(1);

    const startOfDay = selectedDate.setHours(0, 0, 0, 0);

    const endOfDay = selectedDate.setHours(23, 59, 59, 999);
    
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedDate]);

    // filtered per day
    const filteredTasks = tasks.filter((task) => { 
        const taskDate = new Date(task.date);
        return taskDate >= startOfDay && taskDate <= endOfDay;
    });

    // sorted from earlier to latest of the day
    const sortedTasks = filteredTasks.sort((a, b) => new Date(a.time) - new Date(b.time)); 

    // formatted date and time to human-readable format
    const formattedTasks = sortedTasks.map((task) => {
        const formattedDate = new Date(task.date).toLocaleDateString('en-US', {
            weekday: 'short',
            year:'numeric',
            month: 'short',
            day: 'numeric',
        });

        const formattedTime = new Date(task.time).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        return {
            ...task,
            date: formattedDate,
            time: formattedTime,
        };
    });

    const tasksPerPage = 7;
    const totalTasks = formattedTasks.length;
    // set default total pages value to 1 even if array length is 0 to prevent break of pagination logic 
    const totalPages = Math.max(Math.ceil(totalTasks / tasksPerPage), 1);

    const currentTasks = formattedTasks
        .map((task) => (
            <div key={task._id} className={myTasksStyles.tasks} onClick={() => getTask(task._id)}>
                <div className={myTasksStyles.description}>{task.description}</div>
                <div className={myTasksStyles.time}>{task.time}</div>
            </div>
            ))
        .slice( // slice(included index, excluded index) 
            (currentPage - 1) * tasksPerPage, // e.g (2-1)*7 = 7
            currentPage * tasksPerPage // e.g 2*7 = 14 --> slice(7, 14) --> array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] --> page 2 will show no. 7 to no. 13 
        );

    return (
        <>
            <div>
                <i className="ri-add-box-line" onClick={openTaskForm}></i>
            </div>
            { formattedTasks.length > 0 ? 
            <div>
                {currentTasks}
            </div>
            :
            <div>
                No tasks available for this day.
            </div> }
            <div>
                <button className={myTasksStyles.button} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <button className={myTasksStyles.button} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </div>
            { isTaskFormOpen && 
            <TaskForm 
            closeTaskForm={closeTaskForm}
            selectedDate={selectedDate}
            /> }
            { isTaskModalOpen && 
            <TaskModal 
            closeTaskModal={closeTaskModal}
            selectedTask={selectedTask}
            /> }
        </>
    );
    
};

export default MyTasks;