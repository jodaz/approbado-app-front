import * as React from 'react'
import { useTriviaState } from '@approbado/lib/hooks/useTriviaSelect'
import Box from '@material-ui/core/Box'
import makeStyles from '@material-ui/styles/makeStyles'
import Button from '@approbado/lib/components/Button'
import { Link } from 'react-router-dom'
import { alpha } from '@material-ui/core/styles/colorManipulator';
import PodiumCard from '../components/PodiumCard'
import PodiumRow from '../components/PodiumRow'

const award = {
    title: 'Approbado Oro',
    icon_winner: 'http://localhost:4000/public/default/insignia_oro.svg'
}

const users = [
    {
        user_name: '@maria_antonieta',
        status: 'completed',
        points: 74
    },
    {
        user_name: '@primero',
        status: 'pending',
        points: 100
    },
    {
        user_name: '@tercero',
        status: 'pending',
        points: 70
    },
    {
        user_name: '@cuarto',
        status: 'pending',
        points: 64
    },
    {
        user_name: '@quinto',
        status: 'pending',
        points: 64
    },
]

const titleStyles = {
    fontSize: '1.1rem',
    fontWeight: 600,
    marginBottom: '0.8rem'
}

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '3rem',
        width: '50%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: '4rem',
        color: theme.palette.info.dark,
        [theme.breakpoints.down('sm')]: {
            width: '80%',
            paddingTop: '0rem'
        }
    },
    awardName: {
        ...titleStyles,
        fontWeight: 700,
        fontSize: '1.75rem'
    },
    triviaName: {
        ...titleStyles,
        display: 'flex',
        alignItems: 'center'
    },
    iconWinner: {
        height: '200px',
        width: '200px',
        marginBottom: '2rem'
    },
    secondaryButton: {
        color: theme.palette.info.dark,
        backgroundColor: '#fff',
        border: `2px solid ${theme.palette.info.dark}`,
        fontSize: '1.1rem',
        '&:hover': {
            backgroundColor: alpha(theme.palette.info.dark, 0.05)
        }
    },
    darkButton: {
        color: '#fff',
        backgroundColor: theme.palette.info.blue,
        border: `2px solid ${theme.palette.info.blue}`,
        fontSize: '1.1rem',
        '&:hover': {
            backgroundColor: alpha(theme.palette.info.dark, 0.9)
        }
    }
}))

const Results = () => {
    const { room: { loaded } } = useTriviaState();
    const classes = useStyles();
    const sortedUsers = users.sort((a, b) => (a.points > b.points) ? -1 : 1)
    const firstUsers = sortedUsers.slice(0, 3);
    const lastUsers = sortedUsers.slice(3);

    return (
        <Box sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Box className={classes.root}>
                <Box className={classes.awardName}>
                    Resultados
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'end',
                    padding: '0 1rem',
                    borderBottom: '1px solid #6D6D6D',
                    height: '400px',
                }}>
                    {firstUsers.map((user, i) => <PodiumCard user={user} i={i} />)}
                </Box>
                <Box sx={{ width: '100%' }}>
                    {lastUsers.map((user, i) => <PodiumRow user={user} i={i} />)}
                </Box>
                <Box sx={{
                    width: '400px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '4rem'
                }}>
                    <Button
                        to='/trivias'
                        component={Link}
                        unresponsive
                        className={classes.secondaryButton}
                    >
                        Ver más trivias
                    </Button>
                    <Button
                        to='/show-results'
                        component={Link}
                        className={classes.darkButton}
                        unresponsive
                    >
                        Ver respuestas
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

Results.defaultProps = award

export default Results
