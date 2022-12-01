import React, {ReactNode} from 'react';
import s from './Title.module.scss'
import cn from 'classnames'

interface TitleProps {
    title: string
    className?: string
    children?: ReactNode
}

const Title:React.FC<TitleProps> = ({className, title, children}) => {
    return (
        <div className={cn( s.root, className)}>
            <h1>{title}</h1>
            {children}
        </div>
    );
};

export default Title;