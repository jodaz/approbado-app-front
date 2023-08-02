import * as React from 'react'
import { useTriviaState, useTriviaDispatch } from '@approbado/lib/hooks/useTriviaSelect'
import { useHistory } from 'react-router-dom'
import { RadialSelected } from '@approbado/lib/icons'
import Box from '@material-ui/core/Box'
import Emoji from '@approbado/lib/components/Emoji'
import Button from '@approbado/lib/components/Button'
import { useGetResponses } from '@approbado/lib/hooks/useGetResponses'
import NoAnswer from '../components/NoAnswer'
import makeStyles from '@material-ui/styles/makeStyles'

const useStyles = makeStyles(theme => ({
    header: {
        display: 'flex',
        flexDirection: 'column',
        fontWeight: 600,
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        }
    },
    answer: {
        display: 'flex',
        alignItems: 'center',
        padding: '1rem',
        border: `2px solid ${theme.palette.primary.dark}`,
        borderRadius: '6px',
        margin: '1rem 0'
    },
    icon: {
        fill: theme.palette.background.default,
        marginRight: '1rem'
    }
}))

export default function() {
    const classes = useStyles();
    const { selected, answers, questions, configs, room } = useTriviaState()
    const { setConfigs } = useTriviaDispatch()
    const { responses } = useGetResponses(questions, answers)
    const history = useHistory();

    const handleSubmit = () => {
        if (room.loaded) {
            setConfigs({
                ...configs,
                view: 'waiting'
            })
        } else {
            setConfigs({
                ...configs,
                view: 'finished'
            })
        }
    }

    React.useEffect(() => {
        if (!selected) {
            history.push('/trivias');
        }
    }, [selected])

    if (!selected) return null

    return (
        <>
            <Box>
                <Box margin='1rem 0' fontSize="2rem" fontWeight="600">
                    Resumen
                </Box>
                <Box className={classes.header}>
                    <Box>
                        Revisa tus respuestas antes de enviar <Emoji symbol='😉' />
                    </Box>
                    <Button onClick={handleSubmit} unresponsive>
                        Enviar
                    </Button>
                </Box>
            </Box>
            <Box margin='1rem 0 4rem 0'>
                {responses.map((item, index) => (
                    <Box sx={{
                        borderBottom: '1px solid #A6A6A6',
                        padding: '1rem 0'
                    }} key={index}>
                        <Box fontWeight='600' margin='1rem 0'>
                            {`${index + 1}. ${item.description}`}
                        </Box>
                        <Box className={classes.answer}>
                            <RadialSelected className={classes.icon}/>
                            {item.answer ? item.answer : <NoAnswer />}
                        </Box>
                    </Box>
                ))}
            </Box>
        </>
    )
}
