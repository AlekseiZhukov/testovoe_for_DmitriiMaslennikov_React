import {Chart} from "../store/dataTasksSlice";
import {DateTime} from "luxon";

export const getArrayDate = (array: Chart[], arrayDays: number[]) => {
    for (let item of array) {
        if (item.sub) {
            arrayDays.push(DateTime.fromISO(item.period_start).toUnixInteger())
            getArrayDate(item.sub, arrayDays)
        } else {
            arrayDays.push(DateTime.fromISO(item.period_start).toUnixInteger())
        }
    }
}


export const expandData = (data: Chart, floor = 0, startCalendarGrid: number, durDay: number) => {

    if (data.hasOwnProperty('sub')) {
        data.hidden = false
        data.floor = floor
        data.intervalStartProgressBar = Math.ceil((DateTime.fromFormat(data.period_start, 'yyyy-MM-dd').toUnixInteger() - startCalendarGrid) / durDay)
        data.lengthProgressBar = Math.floor((DateTime.fromFormat(data.period_end, 'yyyy-MM-dd').toUnixInteger() - DateTime.fromFormat(data.period_start, 'yyyy-MM-dd').toUnixInteger()) / durDay) + 1
        data.sub.forEach(item => {
            expandData(item, floor + 1, startCalendarGrid, durDay)
        })
    } else {
        data.hidden = false
        data.floor = floor + 1
        data.intervalStartProgressBar = Math.ceil((DateTime.fromFormat(data.period_start, 'yyyy-MM-dd').toUnixInteger() - startCalendarGrid) / durDay)
        data.lengthProgressBar = Math.floor((DateTime.fromFormat(data.period_end, 'yyyy-MM-dd').toUnixInteger() - DateTime.fromFormat(data.period_start, 'yyyy-MM-dd').toUnixInteger()) / durDay) + 1
    }
    return data
}

export const hiddenTasks = (data: Chart, floor: number) => {
    if (data.hasOwnProperty('sub')) {
        if (data.floor && data.floor >= floor - 1) {
            data.hidden = !data.hidden
        }
        data.sub.forEach(item => {
            hiddenTasks(item, floor)
        })

    } else {
        if (data.floor === floor - 1) {
            data.hidden = !data.hidden
        }
    }
    return data
}