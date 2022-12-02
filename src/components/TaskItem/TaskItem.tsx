import React from 'react';
import cn from 'classnames'
import s from './TaskItem.module.scss'
import {Chart} from "../../store/dataTasksSlice";
import {ReactComponent as Chevron} from '../../assets/img/chevron_down_filled.svg'

interface TaskItemProps {
    dataArray: Array<Chart>
    onHandleClick: (id:number) => void
}

const TaskItem:React.FC<TaskItemProps> = ({dataArray, onHandleClick, }) => {

    return (
        <>
            {
                dataArray.map(item => item.sub
                    ? <div key={item.id}>
                        <div className={s.wrapButton}>
                            <div onClick={() => onHandleClick(item.id)} className={cn(s.button,
                                s[`issueFloor${item.floor}`],
                            )}>
                                <Chevron className={cn({[s.chevronClose]: item.hidden})}/>
                                <span>{item.sub.length}</span> <span>{item.title}</span>
                            </div>
                        </div>
                        {
                            !item.hidden && <TaskItem dataArray={item.sub} onHandleClick={onHandleClick}/>
                        }
                    </div>
                    : <div className={s.wrapBlockTask} key={item.id}>
                        <div className={cn(s.wrapTask, s.issueFloor4)}>
                            <span>0</span>
                            <span>{item.title}</span>
                        </div>
                    </div>)
            }
        </>
    )
}

export default TaskItem;