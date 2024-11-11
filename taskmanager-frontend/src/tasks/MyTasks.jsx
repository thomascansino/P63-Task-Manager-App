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

    const startOfDay = selectedDate.setHours(0, 0, 0, 0);

    const endOfDay = selectedDate.setHours(23, 59, 59, 999);

    // filtered per day
    // sorted from earlier to latest of the day
    // formatted date and time to human-readable format
    const tasksList = 
        tasks.filter((task) => { 
            const taskDate = new Date(task.date);
            return taskDate >= startOfDay && taskDate <= endOfDay;
        })
        .sort((a, b) => new Date(a.time) - new Date(b.time))
        .map((task) => {
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

            return (
                <div key={task._id} className={myTasksStyles.tasks} onClick={() => getTask(task._id)}>
                    <div className={myTasksStyles.description}>{task.description}</div>
                    <div className={myTasksStyles.time}>{formattedTime}</div>
                </div>
            );
        });

    return (
        <>
            <div>
                <i className="ri-add-box-line" onClick={openTaskForm}></i>
            </div>

            <div className={myTasksStyles['tasks-list']}>
                {tasksList.length > 0 ? tasksList : 'No tasks available for this day.'}
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