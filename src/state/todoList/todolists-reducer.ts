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

export type ActionsType =
    RemoveTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodolistFilterActionType
    | AddTodolistActionType

export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state.filter(t => t.id !== action.id)]
        case 'ADD-TODOLIST':
            return [...state, {id: action.id, title: action.title, filter: "all"}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        default:
            throw new Error("I don't understand this type")
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
export const ChangeTodolistFilter = (id:string, filter:FilterValuesType):ChangeTodolistFilterActionType =>{
    return {type:'CHANGE-TODOLIST-FILTER', id, filter}
}