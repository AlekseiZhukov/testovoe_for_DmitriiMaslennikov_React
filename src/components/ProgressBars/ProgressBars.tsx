import React from 'react';
import s from './ProgressBars.module.scss'
import {useAppSelector} from "../../hooks";
import {extendDataSelector} from "../../store/dataTasksSlice";
import ProgressBar from '../ProgressBar'
import cn from "classnames";

const ProgressBars: React.FC = () => {
    const dataTasks = useAppSelector(extendDataSelector)

    return (
        <div className={s.root}>

            <div className={cn(s.wrapProgress)}>
                <div style={{
                    marginLeft: `${dataTasks && dataTasks.intervalStartProgressBar ? dataTasks.intervalStartProgressBar * 22 : 0}px`,
                    width: `${dataTasks && dataTasks.lengthProgressBar ? dataTasks.lengthProgressBar * 22 : 0}px`
                }} className={cn(s[`progressBar${dataTasks && dataTasks.floor}`])}/>
                <span>{dataTasks && dataTasks.title}</span>
            </div>
            <>
                {dataTasks && !dataTasks.hidden &&
                <ProgressBar dataArray={dataTasks.sub}/>}
            </>

        </div>


    );
};

export default ProgressBars;