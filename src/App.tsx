
import s from './App.module.scss';
import React, {useEffect} from "react";
import {fetchDataTasks} from "./store/dataTasksSlice";
import {useAppDispatch, useAppSelector} from "./hooks";
import Title from "./components/Title/Title";


function App() {
  const dispatch = useAppDispatch()
  const selector = useAppSelector()
    const isLoading = useAppSelector(charactersIsLoadingSelector)
  useEffect(()=> {
    console.log("App UseEffect")
    dispatch(fetchDataTasks())
  }, [])

  return (
    <div className={s.wrapApp}>
      <Title title={}/>
      My App
    </div>
  );
}

export default App;
