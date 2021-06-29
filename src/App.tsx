import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";

export type FilterValuesType = "all" | "active" | "completed"

function App() {
    // BLL
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "html", isDone: true},
        {id: 2, title: "css", isDone: true},
        {id: 3, title: "js", isDone: false},
        {id: 4, title: "react", isDone: false},
        {id: 5, title: "TypeScript", isDone: false},
    ])

    function removeTask(taskId: number) {
        setTasks(tasks.filter((t) => t.id !== taskId))
    }

    let [filter, setFilter] = useState<FilterValuesType>("all")
    let tasksForToDoList = tasks

    if (filter === "active") {
        tasksForToDoList = tasks.filter((t) => !t.isDone)
    }
    if (filter === "completed") {
        tasksForToDoList = tasks.filter((t) => t.isDone)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

// UI
    return (
        <div className="App">
            <Todolist title={"What to learn"}
                      task={tasksForToDoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />

        </div>
    );
}

export default App;
