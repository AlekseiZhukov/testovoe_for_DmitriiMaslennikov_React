import React, {useEffect, useMemo, useState} from 'react';
import s from './Tasks.module.scss'
import Title from "../Title";
import {dataTasksFulfilledSelector, startDaySelector} from "../../store/dataTasksSlice";
import {useAppSelector} from "../../hooks";
import TaskItem from "../TaskItem";
import {getArrayTaskData} from "../../helpers";
import cn from 'classnames'
import {DateTime, Duration} from "luxon";
import {ReactComponent as Chevron} from '../../assets/img/chevron_down_filled.svg'

export interface TaskElement {
    id: number
    hidden: boolean
    floor: number
    intervalStartProgressBar: number
    lengthProgressBar: number
    title: string
}

const Tasks: React.FC = () => {

    const data = useAppSelector(dataTasksFulfilledSelector)
    const startDay = useAppSelector(startDaySelector)
    const [arrayTasks, setArrayTasks] = useState<TaskElement[] | null>(null)
    const durDay = Duration.fromObject({hours: 24}).as('seconds')
    const startCalendarGrid = startDay > 0 && DateTime.fromSeconds(startDay).startOf('week').toUnixInteger()

    const newArrayTasks = (arrayTasks: TaskElement[] = [], floor = 0, newStartCalendarGrid: number = startCalendarGrid ? startCalendarGrid : 1,): TaskElement[] => {

        if (data) {
            arrayTasks.push({
                hidden: false,
                id: data.chart.id,
                intervalStartProgressBar: Math.ceil((DateTime.fromFormat(data.chart.period_start, 'yyyy-MM-dd').toUnixInteger() - newStartCalendarGrid) / durDay),
                title: data.chart.title,
                floor: floor,
                lengthProgressBar: Math.floor((DateTime.fromFormat(data.chart.period_end, 'yyyy-MM-dd').toUnixInteger() - DateTime.fromFormat(data.chart.period_start, 'yyyy-MM-dd').toUnixInteger()) / durDay) + 1,
            })
            if (data.chart.hasOwnProperty('sub')) {
                getArrayTaskData(data.chart.sub, arrayTasks, floor, newStartCalendarGrid, durDay,)
            }
        }
        return arrayTasks
    }

    const myArrayTasks = useMemo(() => newArrayTasks(), [data, startCalendarGrid])

    const onHandleAllTasksHidden = () => {
        setArrayTasks(prevState => prevState && prevState.map(item => {
            if (item.floor === 0) {
                return {
                    ...item,
                    hidden: !item.hidden
                }
            }
            return item
        }))
    }

    const onHandleHidden = (id: number) => {
        const floor = arrayTasks && arrayTasks.filter(item => item.id === id)[0].floor
        setArrayTasks(prevState => prevState && prevState.map(item => {
            if (floor && item.floor >= floor) {
                return {
                    ...item,
                    hidden: !item.hidden
                }
            }
            return item
        }))
    }

    useEffect(() => {
        if (startDay > 0) {
            setArrayTasks(myArrayTasks)
        }
    }, [myArrayTasks, startDay])

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
                            {arrayTasks && <Chevron
                                className={cn({[s.chevronClose]: arrayTasks && arrayTasks.length > 0 && arrayTasks[0].hidden})}/>}
                            <span>{data && data.chart.sub.length}</span>
                            <span>{data && data.chart.title}</span>
                        </div>
                    </div>
                    <>
                        {data && arrayTasks && arrayTasks.length > 0 && !arrayTasks[0].hidden &&
                        <TaskItem dataArray={data.chart.sub} onHandleClick={onHandleHidden} arrayTasks={arrayTasks}/>}
                    </>
                </div>
            </div>
        </div>
    );
};

export default Tasks;