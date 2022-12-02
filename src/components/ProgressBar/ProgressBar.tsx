import React from 'react';
import {Chart} from "../../store/dataTasksSlice";
import cn from 'classnames'
import s from './ProgressBar.module.scss'

interface ProgressBarProps {
    dataArray: Array<Chart>
}

const ProgressBar: React.FC<ProgressBarProps> = ({dataArray}) => {

    return (
        <>
            {
                dataArray.map(item => item.sub
                    ? <div key={item.id}>
                        <div className={s.wrapProgress}>
                            <div style={{
                                marginLeft: `${item.intervalStartProgressBar ? item.intervalStartProgressBar * 22 : 0}px`,
                                width: `${item.lengthProgressBar ? item.lengthProgressBar * 22 : 0}px`
                            }} className={cn(s[`progressBar${item.floor}`])}/>

                            <span>{item.title}</span>
                        </div>
                        {
                            !item.hidden && <ProgressBar dataArray={item.sub}/>
                        }
                    </div>
                    : <div className={s.wrapProgress} key={item.id}>
                        <div style={{
                            marginLeft: `${item.intervalStartProgressBar ? item.intervalStartProgressBar * 22 : 0}px`,
                            width: `${item.lengthProgressBar ? item.lengthProgressBar * 22 : 0}px`
                        }} className={cn(s[`progressBar${item.floor}`])}/>

                        <span>{item.title}</span>

                    </div>)
            }
        </>
    );
};

export default ProgressBar;