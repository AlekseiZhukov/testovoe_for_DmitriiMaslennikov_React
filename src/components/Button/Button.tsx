import React from 'react';
import s from './Button.module.scss'
import {ReactComponent as Vector} from '../../assets/img/Vector.svg'

interface ButtonProps {
    buttonName?: string
}

const Button:React.FC<ButtonProps> = ({buttonName}) => {

    return (
        <button className={s.root}>
            {buttonName ? buttonName : "button"}
            <Vector />
        </button>
    );
};

export default Button;