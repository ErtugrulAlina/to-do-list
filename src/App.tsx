import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export type todolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [key:string]:TaskType[]
}

function App() {
    let todolistID1=v1();
    let todolistID2=v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    // let [filter, setFilter] = useState<FilterValuesType>("all");


    function removeTask(todolistID1:string, id: string) {
        tasks[todolistID1]= tasks[todolistID1].filter(t => t.id !== id);
        setTasks({...tasks});
    }

    function addTask(todolistID1:string, title: string) {
        let task = {id: v1(), title: title, isDone: false};
       let newTasks = tasks[todolistID1];
        tasks[todolistID1] = [task, ...newTasks];

        setTasks({...tasks});
    }

    function changeStatus(todolistID1:string, taskId: string, isDone: boolean) {
        let task = tasks[todolistID1].find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasks({...tasks});
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        let currentTodolist = todolists.find(t=> t.id===todolistID)
        if (currentTodolist) {
            currentTodolist.filter = value;
        }
        setTodolists([...todolists])
    }
    const removeTodolist = (todolistID2:string)=>{
        setTodolists(todolists.filter(t=> t.id!=todolistID2))
        delete tasks[todolistID2]
        setTasks({...tasks});
    }

    return (
        <div className="App">
            {todolists.map((tdM) => {
                let tasksForTodolist = tasks[tdM.id];
                if (tdM.filter === "active") {
                    tasksForTodolist = tasks[tdM.id].filter(t => t.isDone === false);
                }
                if (tdM.filter === "completed") {
                    tasksForTodolist = tasks[tdM.id].filter(t => t.isDone === true);
                }
                // debugger
                return (
                    <Todolist todolistID={tdM.id}
                              key={tdM.id}
                              title={tdM.title}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeStatus}
                              filter={tdM.filter}
                              removeTodolist={removeTodolist}
                    />
                )
            })}
        </div>
    );
}

export default App;

////////////////////////////////////////////////////////////////////////////////////////
// import React, {useState} from 'react';
// import './App.css';
// import {Todolist} from './Todolist';
// import {v1} from 'uuid';
//
// export type FilterValuesType = "all" | "active" | "completed";
// export type todolistsType = {
//     id:string
//     title:string
//     filter:FilterValuesType
// }
//
// function App() {
//     let[todolists,setTodolists]=useState<Array<todolistsType>>([
//         {id:v1(),title:'What to learn',filter:'all'},
//         {id:v1(),title:'What to buy',filter:'all'},
//     ])
//
//     let [tasks, setTasks] = useState([
//         {id: v1(), title: "HTML&CSS", isDone: true},
//         {id: v1(), title: "JS", isDone: true},
//         {id: v1(), title: "ReactJS", isDone: false},
//         {id: v1(), title: "Rest API", isDone: false},
//         {id: v1(), title: "GraphQL", isDone: false},
//     ]);
//     let [filter, setFilter] = useState<FilterValuesType>("all");
//
//
//     function removeTask(id: string) {
//         let filteredTasks = tasks.filter(t => t.id != id);
//         setTasks(filteredTasks);
//     }
//
//     function addTask(title: string) {
//         let task = {id: v1(), title: title, isDone: false};
//         let newTasks = [task, ...tasks];
//         setTasks(newTasks);
//     }
//
//     function changeStatus(taskId: string, isDone: boolean) {
//         let task = tasks.find(t => t.id === taskId);
//         if (task) {
//             task.isDone = isDone;
//         }
//
//         setTasks([...tasks]);
//     }
//
//
//     let tasksForTodolist = tasks;
//
//     if (filter === "active") {
//         tasksForTodolist = tasks.filter(t => t.isDone === false);
//     }
//     if (filter === "completed") {
//         tasksForTodolist = tasks.filter(t => t.isDone === true);
//     }
//
//     function changeFilter(value: FilterValuesType) {
//         setFilter(value);
//     }
//
//
//     return (
//         <div className="App">
//             <Todolist title="What to learn"
//                       tasks={tasksForTodolist}
//                       removeTask={removeTask}
//                       changeFilter={changeFilter}
//                       addTask={addTask}
//                       changeTaskStatus={changeStatus}
//                       filter={filter}
//             />
//         </div>
//     );
// }
//
// export default App;