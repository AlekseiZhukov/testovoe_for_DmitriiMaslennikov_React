// @ts-ignore
import {createAsyncThunk, createSlice, SerializedError} from "@reduxjs/toolkit";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {RootState} from "./index";


export interface Chart {
    id: number
    title: string
    period_start: string
    period_end: string
    sub: Array<Chart>
}

interface DataTasksState {
    project:string
    period: string
    chart: Chart
}

type errorType = SerializedError | FetchBaseQueryError | unknown

interface TasksState {
    isLoading: boolean
    data: DataTasksState | null
    error: errorType
    startDay: number
    finishDay: number
}

const initialState:TasksState = {
    isLoading: false,
    data: null,
    error: '',
    startDay: 0,
    finishDay: 0
}

export const fetchDataTasks = createAsyncThunk(
    'data/requestTasks',
    async (_, thunkApi) => {
        try {
            return await fetch('http://82.202.204.94/tmp/test.php').then(res => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            });

        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

const dataTasksSlice = createSlice({
    name: 'dataTasksState',
    initialState,
    reducers: {
        setStartDay: (state, action) => {
            state.startDay = action.payload
        },
        setFinishDay: (state, action) => {
            state.finishDay = action.payload
        },


    },
    extraReducers: (builder) => {
        builder.addCase(fetchDataTasks.pending, (state) => {
            state.isLoading = true
        })
            builder.addCase(fetchDataTasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = "";
        })
            builder.addCase(fetchDataTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
        })
    }
});

export const dataTasksLoadingSelector = (state: RootState) => state.dataTasks.isLoading;
export const dataTasksFulfilledSelector = (state: RootState) => state.dataTasks.data;
export const dataTasksErrorSelector = (state: RootState) => state.dataTasks.error;
export const startDaySelector = (state: RootState) => state.dataTasks.startDay;
export const finishDaySelector = (state: RootState) => state.dataTasks.finishDay;

export const {setStartDay, setFinishDay} = dataTasksSlice.actions;

export default dataTasksSlice.reducer