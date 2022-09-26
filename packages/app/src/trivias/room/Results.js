import * as React from 'react'
import { useTriviaState } from '@approbado/lib/hooks/useTriviaSelect'
import Box from '@material-ui/core/Box'
import makeStyles from '@material-ui/styles/makeStyles'
import Button from '@approbado/lib/components/Button'
import BalanceIcon from '@approbado/lib/icons/BalanceIcon'
import { Link } from 'react-router-dom'
import { alpha } from '@material-ui/core/styles/colorManipulator';

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

const Results = ({ title, icon_winner }) => {
    const { room: { loaded } } = useTriviaState();
    const classes = useStyles();

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
                    width: '400px',
                    display: 'flex',
                    justifyContent: 'space-between'
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
