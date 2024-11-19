import {FilterValuesType, TaskType} from "./App";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

type PropsType = {
	title: string
	todolistId: string
	tasks: TaskType[]
	removeTask: (taskId: string, todolistId: string) => void
	changeFilter: (filter: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
	filter: FilterValuesType
	removeTodolist: (todolistId: string) => void
	changeTodolistTitle: (title: string, todolistId: string) => void
	changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
}

export const Todolist = (props: PropsType) => {
	const {
		title,
		tasks,
		filter,
		removeTask,
		changeFilter,
		addTask,
		changeTaskStatus,
		todolistId,
		removeTodolist,
		changeTodolistTitle,
		changeTaskTitle
	} = props

	// const [taskTitle, setTaskTitle] = useState('')
	// const [error, setError] = useState<string | null>(null)

	const addTaskHandler = (taskTitle: string) => {
			addTask(taskTitle, todolistId)
	}

	// const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
	// 	setTaskTitle(event.currentTarget.value)
	// }
	//
	// const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
	// 	setError(null)
	// 	if (event.key === 'Enter') {
	// 		addTaskHandler()
	// 	}
	// }

	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		changeFilter(filter, props.todolistId)
	}

	const removeTodolistHandler = () => {
		removeTodolist(todolistId)
	}

	const changeTodolistTitleRename = (title: string) => {
		changeTodolistTitle(title, todolistId)
	}

	const changeTaskTitleRename = (id: string, title: string) => {
		changeTaskTitle(id, title, todolistId)
	}

	return (
		<div>
			<div className={"todolist-title-container"}>
				<h3>
					<EditableSpan title={title} changeTitle={changeTodolistTitleRename}/>
				</h3>
				<Button title={'x'} onClick={removeTodolistHandler}/>
			</div>
			<AddItemForm addItem={addTaskHandler}/>
{/*			<div>
				<input
					className={error ? 'error' : ''}
					value={taskTitle}
					onChange={changeTaskTitleHandler}
					onKeyUp={addTaskOnKeyUpHandler}
				/>
				<Button title={'+'} onClick={addTaskHandler}/>
				{error && <div className={'error-message'}>{error}</div>}
			</div>*/}
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{tasks.map((task) => {

							const removeTaskHandler = () => {
								removeTask(task.id, todolistId)
							}

							const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
								const newStatusValue = e.currentTarget.checked
								changeTaskStatus(task.id, newStatusValue, todolistId)
							}

							// const changeTaskTitleRename = (title: string) => {
							// 	changeTaskTitle(task.id, title, todolistId)
							// }

							return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
								<input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
								<EditableSpan title={task.title} changeTitle={(newTitle) => changeTaskTitleRename(task.id, newTitle)}/>
								<Button onClick={removeTaskHandler} title={'x'}/>
							</li>
						})}
					</ul>
			}
			<div>
				<Button className={filter === 'all' ? 'active-filter' : ''} title={'All'}
				        onClick={() => changeFilterTasksHandler('all')}/>
				<Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'}
				        onClick={() => changeFilterTasksHandler('active')}/>
				<Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'}
				        onClick={() => changeFilterTasksHandler('completed')}/>
			</div>
		</div>
	)
}
