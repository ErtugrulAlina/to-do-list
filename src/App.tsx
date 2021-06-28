import React from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";


function App() {
    // BLL
    const TaskOne: Array<TaskType>=[
        {id:1, title: "html", isDone: true},
        {id:2, title: "css", isDone: true},
        {id:3, title: "js", isDone: false}
    ]

    const removeTask = (taskID: number ) =>{

    }


    const TaskTwo: Array<TaskType>=[
        {id:1, title: "We are the champions", isDone: true},
        {id:2, title: "Crazy", isDone: false},
        {id:3, title: "Simply the best", isDone: true}
    ]
    // UI
    return (
        <div className="App">
            <Todolist title={"What to learn"} task={TaskOne}/>
            <Todolist title={"Songs"} task={TaskTwo}/>
        </div>
    );
}

export default App;
