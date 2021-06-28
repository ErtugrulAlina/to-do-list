import React from 'react';

export type TaskType ={
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType={
    title:string
    task: Array<TaskType>
}
const Todolist =(props: TodolistPropsType)=>{

    const tasksJSXElements =props.task.map(t=>{
        return(
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button>Delete</button>
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
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>)
}

export default Todolist;