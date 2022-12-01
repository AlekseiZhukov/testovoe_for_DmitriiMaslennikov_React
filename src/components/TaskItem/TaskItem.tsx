import React from 'react';
import cn from 'classnames'
import s from './TaskItem.module.scss'
import {Chart} from "../../store/dataTasksSlice";
import {TaskElement} from "../Tasks/Tasks";
import {ReactComponent as Chevron} from '../../assets/img/chevron_down_filled.svg'

interface TaskItemProps {
    dataArray: Array<Chart>
    arrayTasks:TaskElement[]
    onHandleClick: (id:number) => void
}

const TaskItem:React.FC<TaskItemProps> = ({dataArray, onHandleClick, arrayTasks}) => {

    return (
        <>
            {
                dataArray.map (item => item.sub
                ? <div key={item.id}>
                        <div className={s.wrapButton}>
                            <div onClick={() => onHandleClick(item.id)} className={cn(s.button,
                                s[`issueFloor${arrayTasks &&  arrayTasks.length > 0 && arrayTasks.filter(elem => elem.id === item.id)[0].floor}`],
                                )}>
                                <Chevron className={cn( {[s.chevronClose]: arrayTasks && arrayTasks.length > 0 &&  arrayTasks.filter(elem => elem.id === item.id)[0].hidden })}/>
                                <span>{item.sub.length}</span> <span>{item.title}</span>
                            </div>
                        </div>
                    {
                        arrayTasks &&  arrayTasks.length > 0 && !arrayTasks.filter(elem => elem.id === item.id)[0].hidden && <TaskItem dataArray={item.sub} onHandleClick={onHandleClick} arrayTasks={arrayTasks}/>
                    }
                </div>
                : <div className={s.wrapBlockTask} key={item.id}>
                    <div className={cn(s.wrapTask, s.issueFloor4)} >
                        <span>0</span>
                        <span>{item.title}</span>
                    </div>
                </div>)
            }
        </>
    )
}

export default TaskItem;