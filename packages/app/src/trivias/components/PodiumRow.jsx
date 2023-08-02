import * as React from 'react'
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import makeStyles from '@material-ui/styles/makeStyles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        fontWeight: 700,
        justifyContent: 'start',
        border: 'border: 1px solid #D1D1D1',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.12)',
        borderRadius: '6px',
        marginTop: '1.5rem'
    },
    container: {
        display: 'flex',
        padding: '1rem',
        fontSize: '1.1rem'
    },
    avatar: {
        height: '3rem',
        width: '3rem',
        border: '3px solid #fff'
    },
    innerContainer: {
        display: 'flex',
        padding: '1rem',
        flex: 1,
        justifyContent: 'start',
        textDecoration: 'none',
        color: '#000'
    }
}))

const PodiumRow = ({ user, i }) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Box className={classes.container}>
                {i+4} º
            </Box>
            <Box className={classes.innerContainer} component={Link} to={`/${user.user_name}`}>
                <Avatar className={classes.avatar} />
                <Box className={classes.innerContainer}>{user.user_name}</Box>
            </Box>
            <Box className={classes.container}>16/16</Box>
            <Box className={classes.container}>{user.points} ptos.</Box>
        </Box>
    )
}

export default PodiumRow
