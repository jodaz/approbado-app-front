import * as React from 'react';
import { DateInput } from 'react-admin'
import {
    Box,
    Button,
    makeStyles
} from '@material-ui/core'
import { Form } from 'react-final-form'
import DialogTitle from '@approbado/lib/components/DialogTitle';
import Dialog from '@approbado/lib/components/Dialog';
import InputContainer from '@approbado/lib/components/InputContainer'
import SelectInput from '@approbado/lib/components/SelectInput';
import download from '@approbado/lib/utils/download';

const TYPES = [
    { id: 'none', name: 'none' },
    { id: 'De pago', name: 'De pago' }
]

const useStyles = makeStyles(
    () => ({
        title: {
            display: 'flex',
            justifyContent: 'end'
        },
        content: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start'
        },
        padding: {
            padding: '0.5rem 1rem',
            borderRadius: '6px'
        }
    }),
    { name: 'RaDialog' }
);

const validate = (values) => {
    const errors = {};

    if (!values.to) {
        errors.to = "Seleccione una fecha.";
    }
    if (!values.from) {
        errors.from = "Seleccione una fecha.";
    }
    if (!values.payment_method) {
        errors.payment_method = "Seleccione un tipo de pago.";
    }

    return errors;
}

export default function() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = e => {
        setOpen(false);
    };

    const handleSubmit = React.useCallback(async (values) => {
        setLoading(true);
        try {
            await download(
                'memberships/payments/download',
                {values},
                'reporte-pagos-approbado.pdf'
            )
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
        setLoading(false)
    }, []);

    return (
        <div>
            <Button
                color="primary"
                onClick={handleClickOpen}
                size="large"
            >
                Generar reporte
            </Button>
            <Dialog
                onClose={handleClose}
                open={open}
                title={<DialogTitle handleClose={handleClose} />}
            >
                <Form
                    onSubmit={handleSubmit}
                    validate={validate}
                    render={ ({ handleSubmit, submitting }) => (
                        <Box width='20rem' display='flex' justifyContent="center" flexDirection='column'>
                            <Box component="h3" textAlign="center">
                                Reporte
                            </Box>
                            <Box component="p" marginBottom='2rem' textAlign="center">
                                Selecciona el rango de fechas y el tipo de pago para crear el reporte.
                            </Box>
                            <InputContainer label='Tipo de pago' md='12' disabled={submitting}>
                                <SelectInput name="payment_method" options={TYPES} />
                            </InputContainer>
                            <InputContainer label='Desde' md='12' disabled={submitting}>
                                <DateInput source="from" fullWidth />
                            </InputContainer>
                            <InputContainer label='Hasta' md='12' disabled={submitting}>
                                <DateInput source="to" fullWidth />
                            </InputContainer>
                            <Button
                                color="primary"
                                disabled={submitting}
                                onClick={event => {
                                    if (event) {
                                        event.preventDefault();
                                        handleSubmit();
                                    }
                                }}
                                unresponsive
                            >
                                Descargar
                            </Button>
                        </Box>
                    )}
                />
            </Dialog>
        </div>
    );
}
