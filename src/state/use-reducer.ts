import React from 'react';


type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    newName?:string
    [key: string]: any
}
export const userReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case 'INCREMENT-AGE':
            const newStateAge = {...state}
            newStateAge.age = state.age + 1;
            return newStateAge;
        case 'INCREMENT-CHILDREN-COUNT':
            const newState = {...state}
            newState.childrenCount = state.childrenCount + 1;
            return newState;
        case 'CHANGE-NAME':
           return {...state, name:action.newName}

        default:
            throw new Error("I don't understand this type")
    }
}
