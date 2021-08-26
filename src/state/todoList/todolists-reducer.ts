import {FilterValuesType, TodolistType} from "../../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string,
    id:string
}
export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}
export let todolistId1 = v1();
export let todolistId2 = v1();
let initialState: Array<TodolistType>=[
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
]

export type ActionsType =
    RemoveTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodolistFilterActionType
    | AddTodolistActionType

export const todolistsReducer = (state: Array<TodolistType>=initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state.filter(t => t.id !== action.id)]
        case 'ADD-TODOLIST':
            debugger
            return [...state, {id: action.id, title: action.title, filter: "all"}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        default:
           return state
    }
}

export const RemoveTodolistActionCreator = (todolistId: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistActionCreator = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title, id:v1()}
}
export const ChangeTodolistTitleActionCreator = (id:string, title:string):ChangeTodoListTitleActionType=>{
    return {type:'CHANGE-TODOLIST-TITLE', id, title}
}
export const ChangeTodolistFilterAC = (id:string, filter:FilterValuesType):ChangeTodolistFilterActionType =>{
    return {type:'CHANGE-TODOLIST-FILTER', id, filter}
}