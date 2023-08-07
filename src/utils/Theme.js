import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffe135',
        },
        secondary: {
            main: '#6c757d',
        },
        success: {
            main: '#28a745',
        },
        error: {
            main: '#dc3545',
        },
        warning: {
            main: '#ffc107',
        },
        info: {
            main: '#17a2b8',
        },
        background: {
            default: '#f8f9fa',
        },
    },
});

export default theme;
