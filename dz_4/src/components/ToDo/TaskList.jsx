import TaskItem from "./TaskItem";

function TaskList({ tasks, toggleTask }) {
    return (
        <div>
            {tasks.map(task => (
                <TaskItem key={task.id}
                    {...task}
                    toggleTask={toggleTask}
                />
            ))}
        </div>
    );
}

export default TaskList;