import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}

export const EditableSpan = ({title, changeTitle}: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [taskTitle, setTaskTitle] = useState(title)

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        changeTitle(taskTitle)
        setEditMode(false)
    }

    return (
            editMode ?
                <input
                    value={taskTitle}
                    autoFocus
                    onBlur={offEditMode}
                    onChange={changeItemTitleHandler}
                /> :
                <span onDoubleClick={onEditMode}>{title}</span>
        );
};

//export default EditableSpan;