import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ThemeProvider, Typography} from "@mui/material";
import theme from './utils/Theme';
import MediaQuery from 'react-responsive';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={theme}>
        <MediaQuery minDeviceWidth={1224}>
            <App />
        </MediaQuery>
        <MediaQuery maxDeviceWidth={1224}>
            <Typography>
                This app is not optimized for mobile. Please view on a desktop.
            </Typography>
        </MediaQuery>
        <App />
    </ThemeProvider>,
);
