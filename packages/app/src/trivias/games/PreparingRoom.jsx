import * as React from 'react'
import { useTriviaState, useTriviaDispatch } from '@approbado/lib/hooks/useTriviaSelect'
import { apiProvider as axios } from '@approbado/lib/api'
import Box from '@material-ui/core/Box'
import { useUserState } from '@approbado/lib/hooks/useUserState'
import makeStyles from '@material-ui/styles/makeStyles'
import { useParams, useHistory } from 'react-router-dom'
import Spinner from '@approbado/lib/components/Spinner'
import Avatar from '@approbado/lib/components/Avatar';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    player: {
        width: '7rem',
        height: '7rem'
    },
    otherPlayers: {
        width: '4rem',
        height: '4rem'
    },
    title: {
        color: theme.palette.info.main,
        fontWeight: 600
    }
}))

const PreparingRoom = () => {
    const { room: { loaded, participants }, trivia, selected } = useTriviaState();
    const { setRoom } = useTriviaDispatch();
    const classes = useStyles();
    const { user } = useUserState();
    const { token } = useParams()
    const history = useHistory();

    const fetchTriviaGrupal = async () => {
        try {
            const { data } = await axios.get(`/trivias/grupal/${token}`)

            setRoom(data);
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        if (selected && loaded) {
            history.push('/game')
        }
        fetchTriviaGrupal();
    }, [selected, loaded])

    if (!selected) return <Spinner />

    return (
        <Box className={classes.root}>
            <Box sx={{
                display: 'flex',
                padding: '1rem',
                alignItems: 'center',
                flexDirection: 'column',
                '& > *': {
                    marginTop: '2rem'
                }
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '1rem'
                }}>
                    <Avatar source={user.picture} alt="user_picture" className={classes.player} />
                    <Box marginTop='1rem'>{user.names}</Box>
                </Box>
                <Box fontWeight='700' fontSize='1.5rem'>VS</Box>
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    flexWrap: 'wrap'
                }}>
                    {participants.map(user => (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            margin: '1rem'
                        }}>
                            <Avatar source={user.picture} alt="user_picture" className={classes.otherPlayers} />
                            <Box sx={{ marginTop: '1rem' }}>
                                {user.names}
                            </Box>
                        </Box>
                    ))}
                </Box>
                <Box className={classes.title}>
                    Preparando sala...
                </Box>
            </Box>
        </Box>
    )
}

export default PreparingRoom
