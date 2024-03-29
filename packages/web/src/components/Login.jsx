import * as React from 'react';
import {
    CardActions,
    Typography,
    InputAdornment,
    Box
} from '@material-ui/core';
import AuthLayout from './AuthLayout'
import useStyles from '@approbado/lib/styles/formStyles'
import { theme } from '@approbado/lib/styles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { Link } from 'react-router-dom'
import Button from '@approbado/lib/components/Button'
import TextInput from '@approbado/lib/components/TextInput'
import CONFIG_NAMES from '@approbado/lib/env';
import { Lock, User } from '@approbado/lib/icons';
import { loginUser } from '@approbado/lib/services/auth.services';

const validate = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Ingrese su nombre de usuario';
    }

    if (!values.password) {
        errors.password = 'Ingrese su contraseña';
    }

    return errors;
};

const Login = () => {
    const [loading, setLoading] = React.useState(false);
    const classes = useStyles();

    const handleSubmit = React.useCallback(async values => {
        setLoading(true)

        const { success, data } = await loginUser(values);

        if (success) {
            const { token } = data;

            window.location.href =
                `${CONFIG_NAMES.REDIRECT_TO}/auth?token=${token}`;

            setLoading(false);
        } else {
            setLoading(false);

            if (data) {
                return data;
            }
        }
    }, [])

    return (
        <AuthLayout
            validate={validate}
            handleSubmit={handleSubmit}
            title='Iniciar sesión'
        >
            <div className={classes.form}>
                <TextInput
                    name="email"
                    type="text"
                    fullWidth
                    placeholder='Usuario'
                    disabled={loading}
                    className={classes.input}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <User size='1.5em' />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextInput
                    name="password"
                    // @ts-ignore
                    placeholder='Contraseña'
                    type="password"
                    disabled={loading}
                    className={classes.input}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Lock size='1.5em' />
                            </InputAdornment>
                        ),
                    }}
                />
                <Box component="div" display='flex' justifyContent="flex-end" marginTop="1rem">
                    <Link to="/reset-password" className={classes.link}> ¿Olvidaste tu contraseña? </Link>
                </Box>
                <CardActions className={classes.actions}>
                    <Button
                        variant='contained'
                        color='secondary'
                        disabled={loading}
                        type='submit'
                        unresponsive
                        fullWidth
                    >
                        {'Iniciar sesión'}
                    </Button>
                    <Box component="div" marginTop="2rem">
                        <Typography variant="subtitle1" component="p">
                            ¿Aún no tienes una cuenta?
                            {' '}
                            <Link to="/register" className={classes.link}><strong>Ingresa aquí</strong></Link>
                        </Typography>
                    </Box>
                </CardActions>
            </div>
        </AuthLayout >
    );
};

const LoginWithTheme = props => (
    <ThemeProvider theme={createMuiTheme(theme)}>
        <Login {...props} />
    </ThemeProvider>
);

export default LoginWithTheme;
