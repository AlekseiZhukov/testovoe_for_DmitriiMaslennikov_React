import React from 'react';
import s from './ProgressBars.module.scss'
import   {ReactComponent as Vector} from '../../assets/img/Vector.svg'

interface ButtonProps {
    buttonName?: string
}

const ProgressBars:React.FC<ButtonProps> = ({buttonName}) => {

    return (
        <button className={s.root}>
            {buttonName ? buttonName : "button"}
            <Vector />
        </button>
    );
};

export default ProgressBars;