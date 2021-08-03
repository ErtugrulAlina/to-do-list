import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
type PropsType = {
    title:string
    callback:(title: string)=>void
}
export const EditableSpan = (props:PropsType) =>{
    let[edit,setEdit]=useState(false)
    let[title, setTitle]=useState(props.title)
    const onDoubleClickHandler=()=>{
        setEdit(true)
    }
    const onBlurHandler = () =>{
        setEdit(false)
        props.callback(title)
    }
    const onChangeHandler=(event: ChangeEvent<HTMLInputElement>)=>{
        setTitle(event.currentTarget.value)
    }
    return(
        edit
            ?<input autoFocus
                    onBlur={onBlurHandler}
                    onChange={onChangeHandler}
                    value={title}/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>

    )
}