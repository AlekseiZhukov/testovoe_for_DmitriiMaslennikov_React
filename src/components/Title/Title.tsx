import React from 'react';
import {findAllInRenderedTree} from "react-dom/test-utils";

interface TitleProps {
    title: string
}

const Title:React.FC<TitleProps> = ({title}) => {
    return (
        <>
            <h1>{title}</h1>
        </>
    );
};

export default Title;