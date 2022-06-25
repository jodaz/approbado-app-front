import * as React from 'react'
import { useTriviaState, useTriviaDispatch } from '@approbado/lib/hooks/useTriviaSelect'
import { axios, history } from '@approbado/lib/providers'
import Box from '@material-ui/core/Box'
import makeStyles from '@material-ui/styles/makeStyles'
import { useParams } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    title: {
        color: theme.palette.info.main,
        fontWeight: 600
    }
}))

const PreparingRoom = () => {
    const { room: { loaded, ...restRoom } } = useTriviaState();
    const { setRoom } = useTriviaDispatch()
    const { token } = useParams()
    const classes = useStyles();

    // const fetchTriviaGrupal = React.useCallback(async () => {
    //     try {
    //         const res = await axios.get(`/trivias/grupal/${token}`)

    //         setRoom(res)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }, [])

    // React.useEffect(() => {
    //     if (!loaded) {
    //         fetchTriviaGrupal();
    //     }
    // }, [loaded])

    return (
        <>
            <Box>
                <Box className={classes.title}>
                    Preparando sala...
                </Box>
            </Box>
        </>
    )
}

export default PreparingRoom
