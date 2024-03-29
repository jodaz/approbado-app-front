import * as React from 'react';
import {
    CardActions,
    Box,
    Typography,
    makeStyles,
    Link
} from '@material-ui/core';
import { apiProvider } from '@approbado/lib/api';
import Button from '@approbado/lib/components/Button'
import InputContainer from '@approbado/lib/components/InputContainer'
import AuthLayout from '../layouts/AuthLayout'
import formStyles from '@approbado/lib/styles/formStyles'
import { theme } from '@approbado/lib/styles';
import { ThemeProvider, createMuiTheme, styled } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import Dialog from '@approbado/lib/components/Dialog'
import DefaultLinkBehavior from '@approbado/lib/components/LinkBehavior'
import TextInput from '@approbado/lib/components/TextInput'

const LinkBehavior = styled(DefaultLinkBehavior)(({ theme }) => ({
    'color': theme.palette.primary.main,
}));

const validate = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Ingrese su correo electrónico';
    }

    return errors;
};

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%',
        padding: '0 1.5rem'
    },
    cardHeader: {
        textAlign: 'center',
        marginBottom: '2rem'
    },
}));

const ResetPassword = () => {
    const [loading, setLoading] = React.useState(false);
    const classes = { ...formStyles(), ...useStyles() };
    const history = useHistory()
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
        history.push('/login')
    };

    const handleSubmit = React.useCallback(values => {
        setLoading(true)

        return apiProvider.post(`/reset-password`, values)
            .then(res => {
                setLoading(false);
                setOpen(true)
            }).catch(err => {
                setLoading(false);

                if (err.response.status == 500) {
                    history.push('/error');
                }

                if (err.response.data.errors) {
                    return err.response.data.errors;
                }
            });
    }, [])

    return (
        <AuthLayout validate={validate} handleSubmit={handleSubmit} title='Iniciar sesión'>
            <div className={classes.form}>
                <Box className={classes.cardHeader}>
                    <Typography variant="h5" classKey='h3'>
                        Recupera tu cuenta
                    </Typography>
                    <Typography variant="subtitle1" classKey='p'>
                        Ingresa tu correo electrónico para recuperar tu cuenta
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
                <CardActions className={classes.actions}>
                    <Button disabled={loading} type="submit" unresponsive fullWidth>
                        Recuperar contraseña
                    </Button>
                </CardActions>
                <Link
                    to={`/login`}
                    color='info'
                    underline='underline'
                    component={LinkBehavior}
                >
                    Volver al inicio
                </Link>
            </div>
            <Dialog open={open} handleClose={handleClose}>
                <Typography gutterBottom>
                    ¡Hemos enviado un link de recuperación a su correo!.
                </Typography>
                <Button onClick={handleClose}>
                    Vale, llévame al inicio.
                </Button>
            </Dialog>
        </AuthLayout >
    );
};

const ResetPasswordWithTheme = props => (
    <ThemeProvider theme={createMuiTheme(theme)}>
        <ResetPassword {...props} />
    </ThemeProvider>
);

export default ResetPasswordWithTheme;
