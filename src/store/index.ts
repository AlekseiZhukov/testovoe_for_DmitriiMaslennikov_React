import {configureStore} from "@reduxjs/toolkit";
import dataTasksSlice from './dataTasksSlice'

const store = configureStore({
    reducer: {
        dataTasks: dataTasksSlice,
    },

});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store