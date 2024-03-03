import * as React from 'react'
import { Layer } from '@approbado/lib/icons';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles'
import { useTriviaDispatch, useTriviaState } from '@approbado/lib/hooks/useTriviaSelect'
import { getMaxTime } from '@approbado/lib/utils'
import Button from '@approbado/lib/components/Button'
import Switch from '@approbado/lib/components/Switch';
import AddFriendsModal from './AddFriendsModal';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    test: {
        display: 'flex',
        marginBottom: '0.75rem',
        '& > :first-child': {
            display: 'flex',
            justifyContent: 'start',
            width: '3rem'
        }
    },
    link: {
        textDecoration: 'underline',
        color: theme.palette.info.main,
        cursor: 'pointer'
    }
}))

const BeforeStarting = () => {
    const { questions, selectedSubthemes, room } = useTriviaState()
    const [maxTime, setMaxTime] = React.useState(false)
    const classes = useStyles();
    const { setConfigs, startCounter } = useTriviaDispatch();
    const history = useHistory();
    const [url, setUrl] = React.useState('/game')

    const handleSetMaxTime = () => {
        if (!maxTime) {
            setMaxTime(getMaxTime(selectedSubthemes))
        } else {
            setMaxTime(false)
        }
    }

    const handleClick = () => {
        setConfigs({
            view: 'playing',
            duration: maxTime
        })

        if (maxTime) { startCounter(maxTime) }

        history.push(url)
    }

    React.useEffect(() => {
        if (room.token) {
            setUrl(`/rooms/${room.token}`)
        }
    }, [room.token])

    return (
        <Box
            display='flex'
            height='80%'
            width='80%'
            flexDirection='column'
            justifyContent='start'
        >
            <Box fontWeight='600' paddingBottom='2rem'>
                Antes de comenzar
            </Box>
            <Box className={classes.test}>
                <Box>
                    😎
                </Box>
                <Box>
                    Responde y demuestra lo que sabes
                </Box>
            </Box>
            <Box className={classes.test}>
                <Box>
                    <Layer />
                </Box>
                <Box>
                    {`La trivia consta de ${questions.length} preguntas`}
                </Box>
            </Box>
            <AddFriendsModal />
            <Box className={classes.test}>
                <div>
                    <Switch onClick={handleSetMaxTime} />
                </div>
                <Box>
                    Definir tiempo
                    {(maxTime) && (
                        <Box fontWeight={600} fontSize='0.9rem' marginTop='0.5rem'>
                            {`Tiempo asignado: ${maxTime} minutos`}
                        </Box>
                    )}
                </Box>
            </Box>
            <Box marginTop='2rem'>
                <Button unresponsive onClick={handleClick}>
                    Comenzar
                </Button>
            </Box>
        </Box>
    )
}

BeforeStarting.defaultProps = {
    questions: [1, 2, 3]
}

export default BeforeStarting
