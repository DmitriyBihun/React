function TaskItem({ id, text, done, toggleTask }) {
    return ( 
        <div>
            <input type="checkbox" checked={done} onChange={() => toggleTask(id)} />
            <span>{text}</span>
        </div>
     );
}

export default TaskItem;