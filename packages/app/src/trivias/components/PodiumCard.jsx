import * as React from 'react'
import Avatar from '@approbado/lib/components/Avatar';
import Box from '@material-ui/core/Box'
import makeStyles from '@material-ui/styles/makeStyles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(() => ({
    root: {
        height: props => `${props.height}px`,
        width: '200px',
        position: 'relative',
        background: 'linear-gradient(135.16deg, #E6EA00 -22.35%, #FDE000 113.73%)',
        boxShadow: '1.715px 0px 2.28667px rgba(0, 0, 0, 0.12), -1.715px 0px 2.28667px rgba(0, 0, 0, 0.13)',
        borderRadius: '4.57333px 4.57333px 0px 0px',
        fontSize: '1rem',
        paddingBottom: '1rem',
        '&::before': {
            content: "''",
            background: `url(${process.env.PUBLIC_URL}/Vector.svg)`,
            backgroundRepeat: 'repeat-y',
            position: 'absolute',
            width: '97px',
            height: '177px',
            top: '50px',
            left: '-50px',
            zIndex: 1000
        }
    },
    container: {
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        flexDirection: 'column',
        fontWeight: 700
    },
    avatar: {
        height: '3rem',
        width: '3rem',
        border: '3px solid #fff'
    },
    innerContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '1rem 0',
        textDecoration: 'none',
        color: '#000'
    }
}))

const calcHeight = (i) => {
    if (i == 0) {
        return 300
    } else if (i == 1) {
        return 270
    } else {
        return 230
    }
}

const PodiumCard = ({ user, i }) => {
    const classes = useStyles({
        height: calcHeight(i)
    });

    return (
        <Box className={classes.root}>
            <Box className={classes.container}>
                <Box className={classes.innerContainer} component={Link} to={`/${user.user_name}`}>
                    <Avatar alt='user_picture' source={user.picture} className={classes.avatar} />
                    <Box>{user.user_name}</Box>
                </Box>
                <Box className={classes.innerContainer}>
                    <Box fontWeight={500}>16/16</Box>
                    <Box>{user.points} ptos.</Box>
                </Box>
            </Box>
        </Box>
    )
}

export default PodiumCard
