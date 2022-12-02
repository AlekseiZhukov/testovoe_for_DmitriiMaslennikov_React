import React from 'react';
import s from './Tasks.module.scss'
import Title from "../Title";
import {setHiddenTask, setHiddenAllTasks, extendDataSelector} from "../../store/dataTasksSlice";
import {useAppDispatch, useAppSelector} from "../../hooks";
import TaskItem from "../TaskItem";
import cn from 'classnames'

import {ReactComponent as Chevron} from '../../assets/img/chevron_down_filled.svg'

const Tasks: React.FC = () => {

    const dataTasks = useAppSelector(extendDataSelector)
    const dispatch = useAppDispatch()

    const onHandleHidden = (floor: number) => {
        dispatch(setHiddenTask(floor))
    }
    const onHandleAllTasksHidden = () => {
        dispatch(setHiddenAllTasks())
    }

    return (
        <div>
            <Title title="Work item" className={s.title}/>
            <div className={s.root}>
                <div style={{
                    height: "40px",
                    borderWidth: "0 0 1px 0",
                    borderStyle: "solid",
                    borderColor: "rgba(38, 40, 66, 0.12)"
                }}/>
                <div className={s.wrapper}>
                    <div className={s.wrapButton}>
                        <div className={cn(s.button, s[`issueFloor${0}`])} onClick={onHandleAllTasksHidden}>
                            {dataTasks && <Chevron
                                className={cn({[s.chevronClose]: dataTasks.hidden})}/>}
                            <span>{dataTasks && dataTasks.sub.length}</span>
                            <span>{dataTasks && dataTasks.title}</span>
                        </div>
                    </div>
                    <>
                        {dataTasks && !dataTasks.hidden &&
                        <TaskItem dataArray={dataTasks.sub} onHandleClick={onHandleHidden}/>}
                    </>
                </div>
            </div>
        </div>
    );
};

export default Tasks;