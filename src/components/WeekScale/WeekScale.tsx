import React, {useCallback, useEffect, useMemo, useState} from 'react';
import s from './WeekScale.module.scss'
import {DateTime, Duration} from 'luxon'
import { useAppSelector} from "../../hooks";
import { finishDaySelector, startDaySelector} from "../../store/dataTasksSlice";

const WeekScale:React.FC = () => {

    const startDay = useAppSelector(startDaySelector)
    const finishDay = useAppSelector(finishDaySelector)

    const [intervalInWeeks, setIntervalInWeeks] = useState([''])
    const [intervalInDays, setIntervalInDays] = useState([''])

    const durWeek = Duration.fromObject({days: 7})
    const durDay = Duration.fromObject({hours: 24})
    const weeks = useMemo(() =>  Math.ceil((finishDay - startDay ) / durWeek.as("seconds") ), [finishDay, startDay, durWeek])
    const days = useMemo( () =>  Math.ceil((finishDay - startDay ) / durDay.as("seconds")), [finishDay, startDay, durDay])
    const firstDayOfMonth = useMemo (() => DateTime.fromSeconds(startDay).toFormat('MM,yyyy'), [startDay])
    const firstDayOfWeek = useMemo(() => DateTime.fromFormat(firstDayOfMonth, "MM,yyyy").startOf('week').toFormat("MM,yyyy,dd"), [firstDayOfMonth])

    const getIntervalInDays = useCallback (() => {
        const arrayDays = []
        let startDay = DateTime.fromFormat(firstDayOfWeek, 'MM,yyyy,dd').toUnixInteger()
        for (let i=0; i < days; i++) {
            arrayDays.push(`${DateTime.fromSeconds(startDay).toFormat("d")}`)
            startDay += durDay.as("seconds")
        }
        setIntervalInDays(arrayDays)
    }, [firstDayOfWeek, days, durDay])

    const getIntervalInWeeks  = useCallback (() => {
        const arrayWeeks = []
        let start = DateTime.fromFormat(firstDayOfWeek, 'MM,yyyy,dd').toUnixInteger()
        for (let i = 0; i < weeks; i++) {
            arrayWeeks.push(`${DateTime.fromSeconds(start).toFormat("dd MMM")} - ${DateTime.fromSeconds(start).plus(durWeek).minus({day: 1}).toFormat("dd MMM")}`)
            start += durWeek.as("seconds")
        }
        setIntervalInWeeks(arrayWeeks)
    }, [durWeek, firstDayOfMonth, weeks])


    useEffect(() => {
        getIntervalInWeeks()
        getIntervalInDays()
}, [startDay, finishDay])

    return (
        <div className={s.root}>
           <div className={s.weeks}>
               {intervalInWeeks.length > 0 && intervalInWeeks.map((item, index) => (
                   <div key={index} ><p>{item}</p></div>
           )) }
           </div>
           <div className={s.days}>
                {intervalInDays.length > 0 && intervalInDays.map((item, index) => (
                    <div key={index} ><p>{item}</p></div>
                )) }
           </div>
            <div className={s.greed}>
                {intervalInDays.length > 0 && intervalInDays.map((item, index) => (
                    <div  key={index}/>
                )) }
            </div>
        </div>
    );
};

export default WeekScale;