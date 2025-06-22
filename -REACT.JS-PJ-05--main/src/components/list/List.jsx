import { useState } from 'react'
//import { findByAltText } from '@testing-library/react' 
//, useEffect
import { Link } from 'react-router-dom'
import { LIST_TYPES, LIST_COLORS } from '../../config'
import FormAdddNewTask from '../forms/FormAddNewTask'
import css from './List.module.css'
import classNames from 'classnames';


const List = props => {
	const { title, type, tasks, addNewTask,  previousTasks, allTasks, setTasksMain } = props
	const [isFormVisible, setFormVisible1] = useState(false)
	const [errorTrigered, setError] = useState(false)

	function addTaskClick() {
		setFormVisible1(!isFormVisible)
	}		
	let btnGroupClasses;
	switch (LIST_COLORS[type]) {
		case 'BACKLOG':
			btnGroupClasses = classNames(
				css.task,
				css.BACKLOG
			);
			break;
		case 'READY':
			btnGroupClasses = classNames(
				css.task,
				css.READY
			);
			break;
		case 'IN_PROGRESS':
			btnGroupClasses = classNames(
				css.task,
				css.IN_PROGRESS
			);
			break;
		case 'DONE':
			btnGroupClasses = classNames(
				css.task,
				css.DONE
			);
			break;
		default:
			break;
	}

	function changeTaskCategory(e, taskId) {
		
		const updatedTasks = allTasks.map(task => {
			if (taskId === task.id) {
				return { ...task, status: type }
			}
			return task
		})
		console.log(updatedTasks)
		setTasksMain(updatedTasks)
	}
	return (
		<div className={css.list} list_type={type} >
			<h2 className={css.listTitle}>{title}</h2>
			{
				tasks.map(task => {
					return (
						<Link key={task.title} to={`/tasks/${task.id}`}>
							<div className={btnGroupClasses}>{task.title}</div>
						</Link>
					)
				})
			}
			{type === LIST_TYPES.BACKLOG && (				
				<div className={classNames(css.addTaskBlock,isFormVisible?css.opened:'') }>
					<div className={css.addTaskButtonBlock} onClick={addTaskClick} >
						<button className={css.addButton} >Добавить новую задачу</button>
						<span className={css.taskAddArrow}> &or; </span>	
					</div>
				</div>
			)}
			{type !== LIST_TYPES.BACKLOG && (previousTasks.length > 0) && (
				<div className={classNames(css.addTaskBlock,isFormVisible?css.opened:'') }>
					<div className={css.addTaskButtonBlock} onClick={addTaskClick}>
						<button className={css.addButton} >Добавить новую задачу</button>
						<span className={css.taskAddArrow}> &or; </span>	
					</div>
					<div className={css.taskAddList}>
						{
							previousTasks.map(task =>
							{
								return (
									<div onClick={ (e) => changeTaskCategory(e, task.id)} className={css.addTaskItem}>{task.title}</div>
								)
							})
						}
					</div>
					
				</div>
			)}

			{type === LIST_TYPES.BACKLOG && isFormVisible === true && (
				<FormAdddNewTask addNewTask={addNewTask} setFormVisible1={setFormVisible1} setError={setError} />
			)}
			{type === LIST_TYPES.BACKLOG && errorTrigered === true && (
				<label className={css.errorLabel} htmlFor="">Введите имя задачи</label>
			)}

		</div>

	)

}

export default List
