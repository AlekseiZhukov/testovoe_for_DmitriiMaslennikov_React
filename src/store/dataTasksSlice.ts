// @ts-ignore
import {createAsyncThunk, createSlice, PayloadAction, SerializedError} from "@reduxjs/toolkit";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {RootState} from "./index";


interface Chart {
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
}
const initialState:TasksState = {
    isLoading: false,
    data: null,
    error: ''
}

export const fetchDataTasks = createAsyncThunk(
    'data/requestTasks',
    async (_, thunkApi) => {
        try {
            const body = await fetch('http://82.202.204.94/tmp/test.php').then(res => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            });
            return body
        } catch (e) {
            return thunkApi.rejectWithValue(e)
        }
    }
)

const dataTasksSlice = createSlice({
    name: 'dataTasksState',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDataTasks.pending, (state) => {
            state.isLoading = true
        })
            builder.addCase(fetchDataTasks.fulfilled, (state, action:PayloadAction<DataTasksState>) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = "";
        })
            builder.addCase(fetchDataTasks.rejected, (state, action:PayloadAction<errorType>) => {
                state.isLoading = false;
                state.error = action.payload;
        })
    }
});

export const dataTasksLoadingSelector = (state: RootState) => state.dataTasks.isLoading;
export const dataTasksFulfilledSelector = (state: RootState) => state.dataTasks.isLoading;
export const dataTasksErrorSelector = (state: RootState) => state.dataTasks.isLoading;

export default dataTasksSlice.reducer