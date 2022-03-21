import React from 'react';
import NavBar from '../../components/NavBar/NavBar';

interface MainContainerProps{
    navTitle: string,
    children: React.ReactChild

}

const MainContainer: React.FC<MainContainerProps> = ({ navTitle, children }) => {

    return(
    <>
    <NavBar navTitle={navTitle}/>
    {children}
    </>
    )
};

export default MainContainer;