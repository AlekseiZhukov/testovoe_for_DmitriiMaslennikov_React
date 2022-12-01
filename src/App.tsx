
import s from './App.module.scss';
import React, {useCallback, useEffect, useMemo} from "react";
import {dataTasksFulfilledSelector, fetchDataTasks, setFinishDay, setStartDay} from "./store/dataTasksSlice";
import {useAppDispatch, useAppSelector} from "./hooks";
import Title from "./components/Title/Title";
import Tasks from "./components/Tasks";
import Button from "./components/Button";
import WeekScale from "./components/WeekScale";
import {DateTime} from "luxon";
import {getArrayDate} from "./helpers";


function App() {
  const dispatch = useAppDispatch()

  const data = useAppSelector(dataTasksFulfilledSelector)

    const getStartDateDay = useCallback((arrayStartDates:number[] = []):number => {
        if (data) {
            arrayStartDates.push(DateTime.fromISO(data.chart.period_start).toUnixInteger())
            if (data.chart.hasOwnProperty('sub')) {
                getArrayDate(data.chart.sub, arrayStartDates)
            }
        }
        return Math.min(...arrayStartDates)
    }, [data])

    const getFinishDateDay = useCallback(() => {
        if (data) {
            return DateTime.fromFormat(data.period.split("-")[1], "dd.MM.yyyy").toUnixInteger()
        }
    }, [data])

    const myFinishDay = useMemo(() => getFinishDateDay(),[ getFinishDateDay])
    const myStartDay = useMemo(() => getStartDateDay(),[ getStartDateDay])

  useEffect(()=> {
    dispatch(fetchDataTasks())
  }, [dispatch])

    useEffect(() => {
        dispatch(setStartDay(myStartDay))
        dispatch(setFinishDay(myFinishDay))
    }, [data, myStartDay, myFinishDay, dispatch])

  return (
    <div className={s.wrapApp}>
      {data && <Title title={`${data.project} / ${data.period}`} ><Button buttonName='Export'/> </Title>}
      <Tasks />
      <WeekScale />
    </div>
  );
}

export default App;
