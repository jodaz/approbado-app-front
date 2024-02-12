import * as React from 'react';
import {
    CardActions,
    Box,
    Typography,
    makeStyles
} from '@material-ui/core';
import Button from '@approbado/lib/components/Button'
import InputContainer from '@approbado/lib/components/InputContainer'
import AuthLayout from '../layouts/AuthLayout'
import formStyles from '@approbado/lib/styles/formStyles'
import { theme } from '@approbado/lib/styles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom'
import { useUserDispatch } from '@approbado/lib/hooks/useUserState'
import TextInput from '@approbado/lib/components/TextInput'
import PasswordInput from '@approbado/lib/components/PasswordInput'
import { loginAdmin } from '@approbado/lib/services/auth.services';

const validate = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Ingrese su correo electrónico';
    }

    if (!values.password) {
        errors.password = 'Ingrese su contraseña';
    }

    return errors;
};

const useStyles = makeStyles(() => ({
    form: {
        width: '100%',
        padding: '0 1.5rem'
    },
    cardHeader: {
        textAlign: 'center',
        marginBottom: '2rem'
    },
}));

const Login = () => {
    const [loading, setLoading] = React.useState(false);
    const classes = { ...formStyles(), ...useStyles() };
    const history = useHistory()
    const { setUser } = useUserDispatch();

    const handleSubmit = React.useCallback(async (values) => {
        setLoading(true)

        const { success, data } = await loginAdmin(values);

        if (success) {
            await setUser({
                user: data.user,
                token: data.token
            });
            await history.push('/');

            setLoading(false);
        } else {
            setLoading(false);

            if (err.response.status == 500) {
                history.push('/error');
            }

            if (data) {
                return data;
            }
        }
    }, [])

    return (
        <AuthLayout validate={validate} handleSubmit={handleSubmit} title='Iniciar sesión'>
            <div className={classes.form}>
                <Box className={classes.cardHeader}>
                    <img src={`/logotipo.png`} alt='approbado_logotipo' height="50px" width="200px" />
                    <Typography variant="subtitle1" classKey='p'>
                        Administrador
                    </Typography>
                </Box>
                <InputContainer label='Correo electrónico' md={12}>
                    <TextInput
                        name="email"
                        placeholder="Ingrese su correo electrónico"
                        disabled={loading}
                        fullWidth
                    />
                </InputContainer>
                <InputContainer label='Contraseña' md={12}>
                    <PasswordInput
                        name="password"
                        placeholder="Ingrese su contraseña"
                        disabled={loading}
                        fullWidth
                    />
                </InputContainer>
                <Box component="div" display='flex' justifyContent="center" marginTop="1rem">
                    <Link to="/reset-password" className={classes.link}>¿Olvidaste tu contraseña?</Link>
                </Box>
                <CardActions className={classes.actions}>
                    <Button disabled={loading} unresponsive fullWidth>
                        Iniciar sesión
                    </Button>
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
