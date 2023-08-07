import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ThemeProvider, Typography} from "@mui/material";
import theme from './utils/Theme';
import { isMobile } from "react-device-detect";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={theme}>
        {!isMobile &&
            <App />}
        {isMobile &&
            <Typography color="primary" fontSize="30px">
                This app is not optimized for mobile. Please view on a desktop.
            </Typography>}
    </ThemeProvider>,
);
