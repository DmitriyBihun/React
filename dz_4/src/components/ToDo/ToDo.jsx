import { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function ToDo() {
    const [tasks, setTasks] = useState([])

    function addTask(text) {
        setTasks(prev => [
            ...prev, {
                id: Date.now(),
                text: text,
                done: false
            }
        ])
    }

    function toggleTask(id) {
        setTasks(prev => prev.map(task => task.id === id ? {...task, done: !task.done} : task))
    }

    return ( 
        <section>
            <h2>ToDo App</h2>
            <TaskForm addTask={addTask}/>
            <TaskList tasks={tasks} toggleTask={toggleTask}/>
        </section>
     );
}

export default ToDo;