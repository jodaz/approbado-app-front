import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import InputContainer from '@approbado/lib/components/InputContainer'
import { Form, Field } from 'react-final-form'
import Button from '@approbado/lib/components/Button'
import Checkbox from '@approbado/lib/components/Checkbox'
import validateSchedule from './validateSchedule'
import SelectTriviasInput from './SelectTriviasInput'
import SelectLevelsInput from './SelectLevelInput'
import TextInput from '@approbado/lib/components/TextInput'
import MuiDatepicker from './MuiDatepicker'
import { useSchedulesState } from '@approbado/lib/hooks/useSchedules'
import Box from '@material-ui/core/Box'
import SubthemesInput from './SubthemesInput'
import DateInput from './DateInput'
import TimeInput from './TimeInput'
import SelectUsersInput from './SelectUsersInput'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: '2rem'
    },
    datePickerContainer: {
        display: 'flex',
        justifyContent: 'start',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center'
        }
    },
    actions: {
        marginTop: '2rem'
    }
}))

const ScheduleForm = ({
    handleSubmit,
    record = {}
}) => {
    const schedules = useSchedulesState();
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Form
                onSubmit={handleSubmit}
                validate={validateSchedule}
                initialValues={record}
                render={({ handleSubmit, submitting, form }) => (
                    <form onSubmit={handleSubmit} noValidate>
                        <Grid container>
                            <Grid item md={6} className={classes.datePickerContainer}>
                                <MuiDatepicker data={schedules} name="starts_at" />
                            </Grid>
                            <Grid item md={6}>
                                <Grid container>
                                    <Box sx={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>
                                        Agendar una trivia
                                    </Box>
                                    <InputContainer
                                        disabled={submitting}
                                        label='Título de la reunión'
                                        sm={12}
                                        md={12}
                                    >
                                        <TextInput
                                            name='title'
                                            placeholder='Ingrese un título'
                                            fullWidth
                                        />
                                    </InputContainer>
                                    <Grid container spacing={1}>
                                        <DateInput name="starts_at" submitting={submitting} />
                                        <TimeInput submitting={submitting} />
                                    </Grid>
                                    <SelectUsersInput />
                                    <SelectTriviasInput />
                                    <SelectLevelsInput />
                                    <SubthemesInput submitting={submitting} />
                                    <InputContainer disabled={submitting} label='Descripción' sm={12} md={12}>
                                        <TextInput
                                            name='description'
                                            placeholder='Añadir una descripción'
                                            fullWidth
                                            multiline
                                        />
                                    </InputContainer>
                                    <Field
                                        name="notify_before"
                                        type="checkbox"
                                        value="notify_before"
                                        component={Checkbox}
                                    >
                                        <label style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            Enviar recordatorio 30 minutos antes de la reunión
                                        </label>
                                    </Field>
                                    <Grid container className={classes.actions}>
                                        <Grid item xs='6'>
                                            <Button
                                                variant='outlined'
                                                size='large'
                                                onClick={form.reset}
                                                unresponsive
                                            >
                                                Descartar
                                            </Button>
                                        </Grid>
                                        <Grid item xs='6'>
                                            <Button disabled={submitting} onClick={() => {
                                                handleSubmit();
                                                form.reset()
                                            }} size='large' unresponsive>
                                                Guardar
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                )}
            />
        </Grid>
    )
}

export default ScheduleForm
