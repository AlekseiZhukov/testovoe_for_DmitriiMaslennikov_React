import {Chart} from "../store/dataTasksSlice";
import {DateTime} from "luxon";
import {TaskElement} from "../components/Tasks/Tasks";

export const getArrayDate = (array:Chart[], arrayDays:number[]) => {
   for (let item of array) {
      if (item.sub) {
         arrayDays.push(DateTime.fromISO(item.period_start).toUnixInteger())
         getArrayDate(item.sub, arrayDays)
      } else {
         arrayDays.push(DateTime.fromISO(item.period_start).toUnixInteger())
      }
   }
}

export const getArrayTaskData = (array:Chart[], arrayTasks:TaskElement[], floor:number, startCalendarGrid:number, durDay:number) => {

   for (let item of array) {
      if (item.sub) {
         arrayTasks.push({
            hidden: false,
            id: item.id,
            intervalStartProgressBar:Math.ceil((DateTime.fromFormat(item.period_start, 'yyyy-MM-dd').toUnixInteger() - startCalendarGrid) /  durDay),
            floor: floor + 1,
            title: item.title,
            lengthProgressBar: Math.floor((DateTime.fromFormat(item.period_end, 'yyyy-MM-dd').toUnixInteger() - DateTime.fromFormat(item.period_start, 'yyyy-MM-dd').toUnixInteger()) / durDay) +1
         });
         getArrayTaskData(item.sub, arrayTasks, floor+1, startCalendarGrid, durDay)
      } else {
         arrayTasks.push({
            hidden: false,
            id: item.id,
            intervalStartProgressBar: Math.ceil((DateTime.fromFormat(item.period_start, 'yyyy-MM-dd').toUnixInteger() - startCalendarGrid) /  durDay),
            floor: floor + 1,
            title: item.title,
            lengthProgressBar: Math.floor((DateTime.fromFormat(item.period_end, 'yyyy-MM-dd').toUnixInteger() - DateTime.fromFormat(item.period_start, 'yyyy-MM-dd').toUnixInteger()) / durDay) +1
         })
      }
   }
}