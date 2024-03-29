import * as React from 'react';
import {
    CardActions,
    Typography,
    Box,
    InputAdornment,
    ThemeProvider,
    createMuiTheme
} from '@material-ui/core';
import { User } from '@approbado/lib/icons';
import { theme } from '@approbado/lib/styles';
import { Link, useLocation } from 'react-router-dom'
import AuthLayout from './AuthLayout'
import useStyles from '@approbado/lib/styles/formStyles'
import { theme } from '@approbado/lib/styles';
import { Link, useLocation } from 'react-router-dom'
import Spinner from '@approbado/lib/components/Spinner'
import queryString from 'query-string'
import Button from '@approbado/lib/components/Button'
import TextInput from '@approbado/lib/components/TextInput'
import { apiProvider } from '@approbado/lib/api';

const validate = (values) => {
    const errors = {};

    if (!values.password) {
        errors.password = 'Ingrese su nueva contraseña';
    }
    if (!values.password_confirmed) {
        errors.password_confirmed = 'Repita su nueva contraseña';
    } else {
        if (values.password_confirmed !== values.password) {
            errors.password_confirmed = 'Las contraseñas no coinciden.';
        }
    }

    return errors;
};

const UpdatePassword = () => {
    const [loading, setLoading] = React.useState(false);
    const [isVerifying, setIsVerifying] = React.useState(true);
    const [verificationError, setVerificationError] = React.useState(undefined)
    const classes = useStyles();
    const { search } = useLocation()
    const values = queryString.parse(search)
    const { token } = values;

    const handleSubmit = React.useCallback(values => {
        setLoading(true)

        return apiProvider.put(`/reset-password/?token=${token}`, values)
            .then(res => {
                setIsVerifying(true)
            }).catch(err => {
                setLoading(false);

                if (err.response.data.errors) {
                    return err.response.data.errors;
                }
            });
    }, [])

    React.useEffect(() => {
        return apiProvider.get(`/reset-password/?token=${token}`)
            .then(res => {
                setIsVerifying(false);
            }).catch(err => {
                setIsVerifying(false);

                if (err.response.data.errors) {
                    const { token } = err.response.data.errors

                    setVerificationError(token)
                }
            });
    }, []);

    return (
        <>
            {(isVerifying)
                ? <Spinner />
                : (
                    <AuthLayout validate={validate} handleSubmit={handleSubmit} title='Recuperar contraseña'>
                        <div className={classes.form}>
                            {(verificationError == undefined)
                                ? (
                                    <>
                                        <TextInput
                                            name="password"
                                            type="text"
                                            placeholder='Nueva contraseña'
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
                                            name="password_confirmed"
                                            type="text"
                                            placeholder='Ingresa de nuevo tu contraseña'
                                            disabled={loading}
                                            className={classes.input}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AccountCircle />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </>
                                )
                                : (
                                    <Typography variant='subtitle1'>
                                        Lo siento, {verificationError}.
                                    </Typography>
                                )
                            }
                            <CardActions className={classes.actions}>
                                {(verificationError == undefined) && (
                                    <Button
                                        variant='contained'
                                        color='secondary'
                                        disabled={loading}
                                        unresponsive
                                        fullWidth
                                    >
                                        Actualizar contraseña
                                    </Button>
                                )}
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
                )
            }
        </>
    );
};

const UpdatePasswordWithTheme = props => (
    <ThemeProvider theme={createMuiTheme(theme)}>
        <UpdatePassword {...props} />
    </ThemeProvider>
);

export default UpdatePasswordWithTheme;
