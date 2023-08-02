import * as React from 'react'
import { BooleanInput } from 'react-admin'
import { useParams, useHistory } from 'react-router-dom'
import InputContainer from '@approbado/lib/components/InputContainer'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { FieldArray } from 'react-final-form-arrays'
import { Form } from "react-final-form";
import arrayMutators from 'final-form-arrays'
import CustomCreateButton from '@approbado/lib/components/Button'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'
import { unmarkOptions, validate } from './questionsFormUtils'
import FormHelperText from '@material-ui/core/FormHelperText';
import TextInput from '@approbado/lib/components/TextInput'
import { useUiDispatch } from '@approbado/lib/hooks/useUI'
import { apiProvider as axios } from '@approbado/lib/api'
import Spinner from '@approbado/lib/components/Spinner'
import SelectLevelInput from './SelectQuestionLevelInput'
import SelectFileInput from './SelectQuestionFileInput'
import SelectAclaratoryInput from './SelectAclaratoryInput'

const useStyles = makeStyles(theme => ({
    arrayRootField: {
        marginBottom: '2rem'
    },
    button: {
        border: `1px solid ${theme.palette.primary.light}`,
        color: `${theme.palette.info.light}`,
        borderRadius: '6px',
        textTransform: 'none',
        fontWeight: 600,
        padding: '5px 15px !important'
    },
    arrayItem: {
        paddingBottom: '2rem',
        paddingRight: '1rem'
    }
}))

const QuestionEdit = () => {
    const { subtheme_id, trivia_id, question_id } = useParams()
    const [record, setRecord] = React.useState({})
    const history = useHistory()
    const { showNotification } = useUiDispatch();
    const classes = useStyles();

    const fetchData = async () => {
        const { data } = await axios.get(`/questions/${question_id}`)

        if (data) {
            setRecord(data)
        }
    }

    const save = React.useCallback(async (values) => {
        try {
            const { data } = await axios.put(`/questions/${question_id}`, {
                subtheme_id: subtheme_id,
                ...values
            });

            if (data) {
                history.push(`/trivias/${subtheme_id}/subthemes/${data.subtheme_id}/questions`)
                showNotification(`¡Actualizó la pregunta "${data.description}" exitosamente!`)
            }
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [question_id])

    React.useEffect(async () => {
        if (question_id) {
            fetchData()
        }
    }, [question_id])

    if (!Object.entries(record).length) return <Spinner />

    return (
        <Box component='div'>
            <Form
                initialValues={record}
                onSubmit={save}
                mutators={{
                    ...arrayMutators,
                    unmarkOptions
                }}
                validate={validate}
                render={({
                    handleSubmit,
                    form: {
                        mutators: { push, unmarkOptions }
                    },
                    values,
                    submitting,
                    errors
                }) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <Box maxWidth="90em" paddingTop='2rem'>
                                <Grid container spacing={1}>
                                    <Typography component='h1' variant='h5'>Editar pregunta</Typography>
                                    <Box paddingBottom='1rem' width='100%'>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            Enunciado
                                        </Typography>
                                    </Box>
                                    <InputContainer label='Pregunta' sm={12} md={12}>
                                        <TextInput
                                            name="description"
                                            placeholder="Ingresa el enunciado"
                                            disabled={submitting}
                                            fullWidth
                                            multiline
                                        />
                                    </InputContainer>
                                    <Grid container className={classes.arrayRootField}>
                                        <FieldArray name="options">
                                            {({ fields }) =>
                                                fields.map((name, index) => (
                                                    <Grid item xs={12} sm={12} md={6} key={name} className={classes.arrayItem}>
                                                        <InputLabel>Opción {index + 1}</InputLabel>
                                                        <TextInput
                                                            name={`${name}.statement`}
                                                            placeholder="Ingrese la respuesta"
                                                            fullWidth
                                                            label=""
                                                            disabled={submitting}
                                                        />
                                                        <Box width="100%" display="flex" justifyContent="space-between">
                                                            <BooleanInput
                                                                source={`${name}.is_right`}
                                                                label="Opción correcta"
                                                                onClick={unmarkOptions}
                                                            />
                                                            <Grid item>
                                                                <Button
                                                                    variant="outlined"
                                                                    type="button"
                                                                    onClick={() => (values.options.length > 1) ? fields.remove(index) : null}
                                                                    className={classes.button}
                                                                    disabled={!(values.options.length > 1)}
                                                                >
                                                                    Eliminar opción
                                                                </Button>
                                                            </Grid>
                                                        </Box>
                                                    </Grid>
                                                ))
                                            }
                                        </FieldArray>
                                        <Grid container>
                                            <Grid item xs={12} md={2}>
                                                <Button
                                                    variant="outlined"
                                                    type="button"
                                                    onClick={() => push('options', undefined)}
                                                    className={classes.button}
                                                >
                                                    Agregar opción
                                                </Button>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                {errors.options_field && <FormHelperText error>{errors.options_field}</FormHelperText>}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Box paddingBottom='1rem' width='100%'>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            {'Aclaratorias'}
                                        </Typography>
                                    </Box>
                                    <SelectAclaratoryInput disabled={submitting } />
                                    <InputContainer sm='12' md='6' label='Aclaratoria'>
                                        <TextInput
                                            name="explanation"
                                            placeholder="Ingrese el texto de la aclaratoria"
                                            disabled={submitting}
                                            fullWidth
                                        />
                                    </InputContainer>
                                    <SelectFileInput trivia_id={trivia_id} />
                                    <SelectLevelInput />
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={4} lg={3}>
                                            <CustomCreateButton
                                                disabled={submitting}
                                                onClick={event => {
                                                    if (event) {
                                                        event.preventDefault();
                                                    }
                                                    console.log(errors)
                                                    handleSubmit()
                                                }}
                                            >
                                                Actualizar
                                            </CustomCreateButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        </form>
                    )
                }}
            />
        </Box>
    )
}

export default QuestionEdit
