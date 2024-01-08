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
        },
        text: {
            primary: '#000',
            secondary: '#6D6D6D',
            white: '#fff'
        }
    },
    space: [
        "2",
        "8",
        "12",
        "16",
        "24",
        "32",
        "48",
        "64",
        "96",
        "128",
        "192",
        "256",
        "384"
    ],
    typography: {
        fontWeight: {
            100: 'NotoSans-Thin',
            200: 'NotoSans-ExtraLight',
            300: 'NotoSans-Light',
            400: 'NotoSans-Regular',
            500: 'NotoSans-Medium',
            600: 'NotoSans-SemiBold',
            700: 'NotoSans-Bold',
            800: 'NotoSans-ExtraBold',
            900: 'NotoSans-Black',
        }
    }
};

export const themeAccesor = (keys = []) =>
    (props: any) => path(['theme', ...theme], props);

export const color = (key: string) => themeAccesor(['color', key]);
