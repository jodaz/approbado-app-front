import * as React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, alpha } from '@material-ui/core'
import {
    Balance
} from '@approbado/lib/icons'
import { listQuestions } from '@approbado/lib/services/questions.services'
import { listLevels } from '@approbado/lib/services/levels.services'
import { useTriviaState, useTriviaDispatch } from '@approbado/lib/hooks/useTriviaSelect'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Sidebar from './Sidebar'
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import clsx from 'clsx';
import ItemCollection from '@approbado/lib/components/ItemCollection';

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
    const [levels, setLevels] = React.useState([])
    const classes = useStyles();
    const { setQuestions, setConfigs } = useTriviaDispatch();
    const state = useTriviaState()
    const { selectedSubthemes, trivia } = state
    const { configs: { level } } = state;
    const history = useHistory();

    React.useEffect(() => {
        if (!state.selected) {
            history.push('/trivias');
        }
    }, [state])

    const fetchLevels = async () => {
        const { success, data } = await listLevels()

        if (success) {
            setLevels(data);
        }
    };

    const fetchQuestions = async () => {
        const { success, data } = await listQuestions({
            filter: {
                options: true,
                level_id: level,
                subthemes_ids: selectedSubthemes.map(({ id }) => id)
            }
        });

        if (success) {
            setQuestions(data);
        }
    }

    React.useEffect(() => {
        fetchQuestions()
        fetchLevels()
    }, [level, selectedSubthemes])

    if (!levels.length) return null;

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
                                {levels.map(item =>
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
