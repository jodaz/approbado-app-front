import { path } from 'ramda'

export const theme = {
    palette: {
        secondary: {
            main: '#07021A',  // Negro primario
            light: '#B7B7B7', // Plomo cuaternario
            dark: '#011C2C',  // Negro
        },
        primary: {
            main: '#FFE835',   // Amarillo segundario
            light: '#E8E8E8',
            dark: '#283436', // Gray
        },
        error: {
            main: '#E02340',  // Rojo
        },
        background: {
            default: '#FFFFFF',
            dark: '#F9F9F9',
            light: '#F5F5F5'
        },
        info: {
            main: '#2280ED', // Azul primario,
            light: '#6D6D6D', // Plomo secundario,
            dark: '#333333', // Plomo secndario
            success: '#00B94A', // Verde
            blue: '#232730'
        }
    },
    color: {
        dark: '#F9F9F9',
    },
    space: [
        "4px",
        "8px",
        "12px",
        "16px",
        "24px",
        "32px",
        "48px",
        "64px",
        "96px",
        "128px",
        "192px",
        "256px",
        "384px"
    ]
};

export const themeAccesor = (keys = []) =>
    (props: any) => path(['theme', ...theme], props);

export const color = (key: string) => themeAccesor(['color', key]);
