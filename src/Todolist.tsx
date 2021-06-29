import React, {useState} from 'react';
import {FilterValuesType} from "./App";


export type TaskType ={
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType={
    title:string
    task: Array<TaskType>
    removeTask: (taskId:number)=>void
    changeFilter: (value:FilterValuesType)=>void

}
const Todolist =(props: TodolistPropsType)=>{

    const tasksJSXElements =props.task.map(t=>{
        return(
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={()=>props.removeTask(t.id)}>Delete</button>
            </li>
        )
    })


    return (
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {tasksJSXElements}
                </ul>
                <div>
                    <button onClick={()=>props.changeFilter("all")}>All</button>
                    <button onClick={()=>props.changeFilter("active")}>Active</button>
                    <button onClick={()=>props.changeFilter("completed")}>Completed</button>
                </div>
            </div>)
}

export default Todolist;