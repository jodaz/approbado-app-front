import * as React from 'react'
import { useTriviaState } from '@approbado/lib/hooks/useTriviaSelect'
import Box from '@material-ui/core/Box'
import makeStyles from '@material-ui/styles/makeStyles'
import Button from '@approbado/lib/components/Button'
import { Link } from 'react-router-dom'
import {
    Balance
} from '@approbado/lib/icons'

const award = {
    title: 'Approbado Oro',
    icon_winner: 'http://localhost:4000/public/default/insignia_oro.svg'
}

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
        fontSize: '2rem'
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
}))

const WinAward = ({ title, icon_winner }) => {
    const { room: { loaded, ...restRoom } } = useTriviaState();
    const classes = useStyles();

    return (
        <Box sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Box className={classes.root}>
                <img src={icon_winner} className={classes.iconWinner} />
                <Box className={classes.triviaName}>
                    <Balance />
                    <Box marginLeft='0.5rem'>Derecho laboral</Box>
                </Box>
                <Box className={classes.awardName}>
                    {`${title}`}!
                </Box>
                <Box sx={{ ...titleStyles, fontWeight: 400}}>
                    ¡Felicitaciones!
                </Box>
                <Box sx={{ ...titleStyles, fontWeight: 400}}>
                    {`Haz alcanzado el nivel ${title}`}
                </Box>
                <Box marginTop='1rem'>
                    <Button
                        to='/show-results'
                        component={Link}
                        unresponsive
                    >
                        Ver resultados
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

WinAward.defaultProps = award

export default WinAward
