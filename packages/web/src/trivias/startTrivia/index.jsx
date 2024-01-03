import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, alpha } from '@material-ui/core'
import Button from '@material-ui/core/Button';
import Sidebar from './Sidebar'
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import clsx from 'clsx';
import { useTriviaState, useTriviaDispatch } from '@approbado/lib/hooks/useTriviaSelect'
import { useHistory } from 'react-router-dom'
import { apiProvider as axios } from '@approbado/lib/api'
import { stringify } from 'qs';
// Icons
import ItemCollection from '@approbado/lib/components/ItemCollection';
import useFetch from '@approbado/lib/hooks/useFetch'
import {
    Balance
} from '@approbado/lib/icons'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '100%',
        paddingTop: '2rem'
    },
    content: {
        width: '100%',
        display: 'flex',
        paddingLeft: '1rem',
        paddingTop: '0.2rem',
        flexDirection: 'column'
    },
    title: {
        fontWeight: 600,
        fontSize: '1.2rem',
        color: theme.palette.info.main,
        paddingBottom: '1rem'
    },
    triviaInformation: {
        display: 'flex',
        justifyContent: 'space-between',
        width: 'max-content',
        alignItems: 'center'
    },
    button: {
        width: '10rem',
        color: theme.palette.primary.main,
        border: '2px solid #6D6D6D',
        marginRight: '2rem',
    },
    selectedButton: {
        color: theme.palette.primary.main,
        border: `2px solid ${theme.palette.secondary.main}`,
        '&:hover': {
            backgroundColor: alpha(theme.palette.secondary.main, 0.9)
        }
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'start',
        paddingTop: '1rem',
        flexDirection: 'row',
        alignItems: 'space-between',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between'
        }
    }
}))

const StartTrivia = () => {
    const classes = useStyles();
    const { setQuestions, setConfigs } = useTriviaDispatch();
    const state = useTriviaState()
    const { selectedSubthemes, trivia } = state
    const {
        loading,
        data,
        error
    } = useFetch('/configurations/levels', {
        perPage: 5,
        page: 0,
        sort: { field: 'created_at', order: 'DESC' }
    })
    const { configs: { level } } = state;
    const history = useHistory();

    React.useEffect(() => {
        if (!state.selected) {
            history.push('/trivias');
        }
    }, [state])

    React.useEffect(async () => {
        if (level) {
            const query = stringify({
                'filter[subthemes_ids]': selectedSubthemes.map(({ id }) => id),
            }, { arrayFormat: 'brackets' });

            try {
                const res = await axios.get(`/questions?filter[options]=true&filter[level_id]=${level}&${query}`)
                const { data } = res.data

                setQuestions(data)
            } catch (error) {
                console.log(error)
            }
        }
    }, [level, selectedSubthemes])

    if (error) return (
        <Box fontWeight={700}>
            Ha ocurrido un error en su solicitud.
        </Box>
    )

    if (loading) return null;

    return (
        <Box sx={{ padding: '2rem' }}>
            <Grid container>
                <Grid item xs>
                    <Typography component='h6' className={classes.title}>
                        Genial! Estas a punto de iniciar una trivia
                    </Typography>
                    <Box className={classes.triviaInformation}>
                        <Balance />
                        &nbsp;
                        <Typography variant='subtitle1'>{trivia.name}</Typography>
                    </Box>
                    <Box className={classes.triviaInformation}>
                        <Typography variant='subtitle1'>Tema: </Typography>&nbsp;
                        <Box>
                            <ItemCollection items={selectedSubthemes} />
                        </Box>
                    </Box>
                </Grid>
                <Grid item md={3}>
                    <Divider orientation='horizontal'  />
                </Grid>
                <Grid container>
                    <Grid item xs>
                        <Box paddingTop='2rem' paddingBottom='2rem'>
                            <Box fontWeight='600' fontSize='1.1rem'>
                                Selecciona un nivel
                            </Box>
                            <Box className={classes.buttonContainer}>
                                {data.map(item =>
                                    <Button
                                        className={clsx(classes.button, (item.id == state.configs.level) && classes.selectedButton)}
                                        onClick={e => setConfigs({
                                            ...state.configs,
                                            level: e.currentTarget.value
                                        })}
                                        value={item.id}
                                    >
                                        {item.name}
                                    </Button>
                                )}
                            </Box>
                        </Box>
                        <Box paddingTop='2rem' paddingBottom='2rem'>
                            <Box fontWeight='600' fontSize='1.1rem'>
                                Selecciona un tipo
                            </Box>
                            <Box className={classes.buttonContainer} marginBottom='1rem'>
                                <Button
                                    className={clsx(classes.button, ('Práctica' == state.configs.type) && classes.selectedButton)}
                                    onClick={e => setConfigs({
                                        ...state.configs,
                                        type: e.currentTarget.innerText
                                    })}
                                >
                                    Práctica
                                </Button>
                                <Button
                                    className={clsx(classes.button, ('Reto' == state.configs.type) && classes.selectedButton)}
                                    onClick={e => setConfigs({
                                        ...state.configs,
                                        type: e.currentTarget.innerText
                                    })}
                                >
                                    Reto
                                </Button>
                            </Box>
                            {(state.configs.type == 'Práctica') && (
                                <Typography variant='subtitle2'>
                                    *Este tipo de trivia es exploratoria.
                                    Contestarás las preguntas y podrás visualizar las respuestas en el momento.
                                </Typography>
                            )}
                        </Box>
                    </Grid>
                    <Divider orientation='vertical' />
                    <Grid item xs>
                        <Sidebar {...state} />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default StartTrivia;
