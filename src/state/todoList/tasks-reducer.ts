import {FilterValuesType, TasksStateType, TodolistType} from "../../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodoListActionType} from "./todolists-reducer";

export type RemoveTasksActionType = {
    type: 'REMOVE-TASK',
    id: string,
    todolistId: string
}
export type AddTasksActionType = {
    type: 'ADD-TASK',
    title: string,
    todolistId: string
}
export type ChangeStatusActionType = {
    type: 'CHANGE-STATUS',
    id: string
    todolistId: string
    isDone: boolean
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    id: string,
    newTitle: string,
    todolistId: string
}

export type ActionsType =
    RemoveTasksActionType
    | AddTasksActionType
    | ChangeStatusActionType
    | ChangeTaskTitleActionType
    | RemoveTodoListActionType
    | AddTodolistActionType
export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            copyState[action.todolistId] = copyState[action.todolistId].filter(t => t.id != action.id);
            return copyState
        }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case 'CHANGE-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.id ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.id ? {
                    ...t,
                    title: action.newTitle
                } : t)
            }
        case 'ADD-TODOLIST':
            return {[action.id]: [], ...state}
        case 'REMOVE-TODOLIST': {
            // let copyState = {...state}
            // delete copyState[action.id];
            const {[action.id]: [], ...rest}= state
            return rest
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (id: string, todolistId: string): RemoveTasksActionType => {
    return {type: 'REMOVE-TASK', id, todolistId}
}
export const addTaskAC = (title: string, todolistId: string): AddTasksActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): ChangeStatusActionType => {
    return {type: 'CHANGE-STATUS', id, isDone, todolistId}
}
export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', id, newTitle, todolistId}
}

