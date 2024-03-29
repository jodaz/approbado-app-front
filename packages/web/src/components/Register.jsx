import * as React from 'react';
import { Field } from 'react-final-form';
import {
    CardActions,
    Typography,
    Box,
    InputAdornment,
    ThemeProvider,
    createMuiTheme
} from '@material-ui/core';
import { Lock, User, Email, Arroba, Phone, ConfirmationNumber } from '@approbado/lib/icons';
import { Link } from 'react-router-dom'
import { theme } from '@approbado/lib/styles';
import { useFormAuthState, useFormAuthDispatch } from '@approbado/lib/hooks/useFormAuth'
import Button from '@approbado/lib/components/Button'
import axios from 'axios'
import AuthLayout from './AuthLayout'
import useStyles from '@approbado/lib/styles/formStyles'
import Checkbox from '@approbado/lib/components/Checkbox'
import TextInput from '@approbado/lib/components/TextInput'
import formatString from "format-string-by-pattern";

const validate = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Ingrese su correo electrónico';
    }

    if (!values.names) {
        errors.names = 'Ingrese su nombre';
    }

    if (!values.user_name) {
        errors.user_name = 'Ingrese su nombre de usuario';
    }

    if (!values.phone) {
        errors.phone = 'Ingrese su teléfono';
    }

    if (!values.password) {
        errors.password = 'Ingrese su contraseña';
    }
    if (!values.conditions || !values.conditions.length) {
        errors.conditions = 'Debe aceptar los términos y condiciones.'
    }

    return errors;
};

const initialValues = {
    external: false
}

const Register = () => {
    const [loading, setLoading] = React.useState(false);
    const [formInitialValues, setFormInitialValues] = React.useState(initialValues)
    const [sendWithCode, setSendWithCode] = React.useState(false);
    const classes = useStyles();
    const state = useFormAuthState();
    const { unset } = useFormAuthDispatch();

    const handleSubmit = React.useCallback(values => {
        setLoading(true)
        let url = !sendWithCode ?
            `${process.env.REACT_APP_API_DOMAIN}/auth/send`
            : `${process.env.REACT_APP_API_DOMAIN}/auth/register`;

        return axios.post(url, values)
            .then(res => {
                setSendWithCode(!sendWithCode);
                setLoading(false);

                if (sendWithCode) {
                    const { token } = res.data;

                    window.location.href =
                        `${process.env.REACT_APP_LOCATION}/auth?token=${token}`;
                }
            }).catch(err => {
                setLoading(false);

                if (err.response.data.errors) {
                    return err.response.data.errors;
                }
            });
    }, [sendWithCode]);

    React.useEffect(() => {
        if (state.isFilled) {
            setFormInitialValues(state.data)
            unset()
        }
    }, [state]);

    return (
        <AuthLayout
            validate={validate}
            handleSubmit={handleSubmit}
            initialValues={formInitialValues}
            title="Crear usuario"
        >
            <div className={classes.form}>
                <TextInput
                    name="names"
                    type="text"
                    placeholder='Ingresa un nombre'
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
                    name="email"
                    // @ts-ignore
                    placeholder='Ingresa un correo electrónico'
                    disabled={loading}
                    className={classes.input}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Email size='1.5em' />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextInput
                    name="user_name"
                    type="text"
                    placeholder='Ingresa un nombre de usuario'
                    disabled={loading}
                    className={classes.input}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Arroba size='1.5em' />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextInput
                    name="password"
                    // @ts-ignore
                    placeholder='Ingresa una contraseña'
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
                <TextInput
                    name="phone"
                    // @ts-ignore
                    placeholder='Teléfono'
                    type="text"
                    disabled={loading}
                    parse={formatString("+49 (AAAA) BBBBBBB")}
                    className={classes.input}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Phone size='1.5em' />
                            </InputAdornment>
                        ),
                    }}
                />
                <Field
                    name="conditions"
                    type="checkbox"
                    value="conditions"
                    component={Checkbox}
                >
                    <label>
                        {' '}
                        He leído y acepto los {' '}
                        <a
                            href="http://approbado.alaxatech.com/terminos-y-condiciones/"
                            target="_blank"
                            className={classes.link}
                        >
                            <strong>términos y condiciones</strong>
                        </a>
                    </label>
                </Field>
                {sendWithCode && (
                    <TextInput
                        name="code"
                        type="text"
                        placeholder='Ingresa el código de confirmación'
                        disabled={loading}
                        className={classes.input}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <ConfirmationNumber size='1.5em' />
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
                <CardActions className={classes.actions}>
                    <Button
                        variant='contained'
                        color='secondary'
                        disabled={loading}
                        fullWidth
                        unresponsive
                    >
                        {'Crear una cuenta'}
                    </Button>
                    <Box component="div" marginTop="2rem">
                        <Typography variant="subtitle1" component="p">
                            ¿Ya tienes una cuenta?
                            {' '}
                            <Link to="/login" className={classes.link}>
                                <strong>Ingresa aquí</strong>
                            </Link>
                        </Typography>
                    </Box>
                </CardActions>
            </div>
        </AuthLayout >
    );
};

const RegisterWithTheme = props => (
    <ThemeProvider theme={createMuiTheme(theme)}>
        <Register {...props} />
    </ThemeProvider>
);

export default RegisterWithTheme;
