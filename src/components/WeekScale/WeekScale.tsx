import React, {useCallback, useEffect, useMemo, useState} from 'react';
import s from './WeekScale.module.scss'
import {DateTime, Duration} from 'luxon'
import {useAppSelector} from "../../hooks";
import {finishDaySelector, startDaySelector} from "../../store/dataTasksSlice";
import ProgressBars from "../ProgressBars";

const WeekScale: React.FC = () => {

    const startDay = useAppSelector(startDaySelector)
    const finishDay = useAppSelector(finishDaySelector)

    const [intervalInWeeks, setIntervalInWeeks] = useState([''])
    const [intervalInDays, setIntervalInDays] = useState([''])

    const durWeek = Duration.fromObject({days: 7})
    const durDay = Duration.fromObject({hours: 24})
    const weeks = useMemo(() => Math.ceil((finishDay - startDay) / durWeek.as("seconds")), [finishDay, startDay, durWeek])
    const days = useMemo(() => Math.ceil((finishDay - startDay) / durDay.as("seconds")), [finishDay, startDay, durDay])

    const getIntervalInDays = useCallback(() => {
        const arrayDays = []
        let myStartDay = startDay
        for (let i = 0; i < days; i++) {
            arrayDays.push(`${DateTime.fromSeconds(myStartDay).toFormat("d")}`)
            myStartDay += durDay.as("seconds")
        }
        setIntervalInDays(arrayDays)
    }, [days, durDay])

    const getIntervalInWeeks = useCallback(() => {
        const arrayWeeks = []
        let start = startDay
        for (let i = 0; i < weeks; i++) {
            arrayWeeks.push(`${DateTime.fromSeconds(start).toFormat("dd MMM")} - ${DateTime.fromSeconds(start).plus(durWeek).minus({day: 1}).toFormat("dd MMM")}`)
            start += durWeek.as("seconds")
        }
        setIntervalInWeeks(arrayWeeks)
    }, [durWeek, weeks])


    useEffect(() => {
        getIntervalInWeeks()
        getIntervalInDays()
    }, [startDay, finishDay])

    return (
        <div className={s.root}>
            <div className={s.weeks}>
                {intervalInWeeks.length > 0 && intervalInWeeks.map((item, index) => (
                    <div key={index}><p>{item}</p></div>
                ))}
            </div>
            <div className={s.days}>
                {intervalInDays.length > 0 && intervalInDays.map((item, index) => (
                    <div key={index}><p>{item}</p></div>
                ))}
            </div>
            <div className={s.greed}>
                {intervalInDays.length > 0 && intervalInDays.map((item, index) => (
                    <div key={index}/>
                ))}
            </div>
            <ProgressBars/>
        </div>
    );
};

export default WeekScale;