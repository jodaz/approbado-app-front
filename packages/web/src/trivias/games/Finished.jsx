import * as React from 'react'
import { makeStyles } from '@material-ui/core'
import { useTriviaState, useTriviaDispatch } from '@approbado/lib/hooks/useTriviaSelect'
import { useHistory } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import Emoji from '@approbado/lib/components/Emoji'
import { useGetResponses } from '@approbado/lib/hooks/useGetResponses'
import { ReactComponent as StateIllustration } from '@approbado/lib/illustrations/Stage1.svg'
import Button from '@approbado/lib/components/Button'
import Checkbox from '../components/Checkbox'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NoAnswer from '../components/NoAnswer'
// Icons
import { CheckCircle, CloseCircle } from '@approbado/lib/icons'
import Switch from '@approbado/lib/components/Switch'
import Item from './Item'

const statisticsBoxStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem 0.5rem',
    borderRadius: '6px',
    width: '7rem',
    height: '7rem',
    fontSize: '1.1rem'
}

const useStyles = makeStyles(theme => ({
    congratulations: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 'max-content',
        marginBottom: '2rem',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row'
        }
    },
    button: {
        margin: '0.5rem 0'
    },
    item: isRight => ({
        borderRadius: '6px',
        backgroundColor: 'transparent',
        opacity: 'unset',
        border: isRight
            ? `3px solid ${theme.palette.success.main} !important`
            : `3px solid ${theme.palette.error.main} !important`
    }),
    header: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '1rem',
        justifyContent: 'space-between',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row'
        }
    },
    statistics: {
        display: 'flex',
        justifyContent: 'space-evenly',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '280px'
        }
    },
    points: {
        ...statisticsBoxStyles,
        color: theme.palette.background.light,
        backgroundColor: theme.palette.info.main
    },
    totalRights: {
        ...statisticsBoxStyles,
        color: theme.palette.primary.dark,
        backgroundColor: theme.palette.secondary.light
    }
}))

export default function() {
    const {
        selected,
        trivia,
        questions,
        answers,
        points,
        rights
    } = useTriviaState();
    const { unsetTrivia, getResults } = useTriviaDispatch();
    const { responses } = useGetResponses(questions, answers)
    const classes = useStyles();
    const [showAnswers, setShowAnswers] = React.useState(false);
    const history = useHistory();

    React.useEffect(() => {
        if (!selected) {
            history.push('/trivias');
        } else {
            getResults();
        }
    }, [selected])

    const handleGoHome = () => {
        unsetTrivia();
        history.push('/');
    }

    const toggleChecked = () => {
        setShowAnswers((prev) => !prev);
    };

    if (!selected) return null

    return (
        <Box>
            <Box fontWeight={600} margin='2rem 0'>
                {trivia.name}
            </Box>
            <Box className={classes.header}>
                <Box className={classes.congratulations}>
                    <Box sx={{ paddingRight: '2rem' }}>
                        <StateIllustration />
                    </Box>
                    <Box>
                        <Box fontSize="1.6rem" fontWeight="600">
                            Excelente trivia!
                            <br/>
                            Sigue así <Emoji symbol='😉' />
                        </Box>
                        <Box>Sigue practicando y llegarás lejos.</Box>
                        <Button
                            className={classes.button}
                            onClick={handleGoHome}
                            unresponsive
                        >
                            Ir a home
                        </Button>
                    </Box>
                </Box>
                <Box className={classes.statistics}>
                    <Box className={classes.totalRights}>
                        <Box fontSize='1.5rem' fontWeight='600'>
                            {rights}/{questions.length}
                        </Box>
                        <Box>Aciertos</Box>
                    </Box>
                    <Box className={classes.points}>
                        <Box fontSize='1.5rem' fontWeight='600'>{points}</Box>
                        <Box>Puntos</Box>
                    </Box>
                </Box>
            </Box>
            <Box display='flex' alignItems='center'>
                <Switch checked={showAnswers} onChange={toggleChecked} />
                <Box sx={{ paddingLeft: '1rem' }}>
                    Mostrar respuestas
                </Box>
            </Box>
            {showAnswers && (
                <Box margin='1rem 0 4rem 0'>
                    {responses.map((item, index) => (
                        <Box sx={{
                            borderBottom: '1px solid #A6A6A6',
                            padding: '1rem 0'
                        }}>
                            <Box fontWeight='600' margin='1rem 0'>
                                {`${index + 1}. ${item.description}`}
                            </Box>
                            <Item
                                key={item.id}
                                dense
                                disabled={false}
                                isRight={item.is_right}
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={true}
                                        tabIndex={-1}
                                        disableRipple
                                        checkedIcon={(item.is_right) ? <CheckCircle /> : <CloseCircle />}
                                    />
                                </ListItemIcon>
                                <Box sx={{ fontWeight: 600 }}>
                                    {item.answer ? item.answer : <NoAnswer />}
                                </Box>
                            </Item>
                            {(item.explanation) && (
                                <Box sx={{ color: '#333333', fontSize: '0.9rem', padding: '1rem 0' }}>
                                    Nota: {item.explanation}
                                </Box>
                            )}
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    )
}
