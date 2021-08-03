import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });


    function removeTask(id: string, todolistId: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id != id)});
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: [task, ...tasks[todolistId]]});
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === id ? {...t, isDone} : t)});
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        setTodolists([...todolists.map(tl => tl.id === todolistId ? {...tl, filter: value} : tl)])
    }


    function removeTodolist(id: string) {

        setTodolists(todolists.filter(tl => tl.id != id));

        delete tasks[id];

        setTasks({...tasks});
    }

    const addTodoList = (title: string) => {
        let newTodoList: TodolistType = {id: v1(), title: title, filter: "all"}
        setTodolists([newTodoList, ...todolists])
        setTasks({...tasks, [newTodoList.id]: []})
    }
    const ChangeTaskHandler = (todolistId1: string, id: string, title: string) => {
        tasks[todolistId1] = tasks[todolistId1].map(f => {
            if (f.id === id) {
                f.title = title
            }
            return f
        })
        setTasks({...tasks})
    };
    const ChangeTitleTodolist = (todolistId1: string, title: string) => {
        setTodolists([...todolists.map(f => (f.id === todolistId1) ? {...f, title: title} : f)])
    }
    return (
        <div className="App">
            <AddItemForm callback={addTodoList}/>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;

                    if (tl.filter === "active") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        ChangeTastHandler={ChangeTaskHandler}
                        ChangeTitleTodolist={ChangeTitleTodolist}
                    />
                })
            }

        </div>
    );
}

export default App;
