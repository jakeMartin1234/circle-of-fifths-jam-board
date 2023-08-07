import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffe135',
        },
        secondary: {
            main: '#5a5555',
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
            default: '#4a4545',
        },
    },
});

export default theme;
