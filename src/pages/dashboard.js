import React, { useContext } from 'react';
import {ThemeProvider} from "styled-components";
import Sidebar from '../component/Sidebar/Sidebar';
import Main from '../component/Main/Main';
import {GlobalStyles} from "../styles/global";
import {lightTheme, darkTheme} from "../styles/theme";
import { ThemeContext } from '../context/themeContext';

const Dashboard = () => {

    const context = useContext(ThemeContext);
    const {theme} = context

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <GlobalStyles/>
            <div>
                <Sidebar/>
                <Main/>
            </div>
        </ThemeProvider>
    );
}

export default Dashboard;