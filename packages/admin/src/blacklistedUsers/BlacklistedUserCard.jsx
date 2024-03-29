import * as React from 'react';
import {
    makeStyles,
    Box,
    Link
} from '@material-ui/core'
import LinkBehavior from '@approbado/lib/components/LinkBehavior'
import Avatar from '@approbado/lib/components/Avatar';

const useStyles = makeStyles(theme => ({
    root: {
        borderRadius: '8px !important',
        padding: '8px 9px 16px 16px',
        backgroundColor: theme.palette.background.dark,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '16rem'
    },
    reason: {
        fontSize: '1rem',
        fontWeight: 400,
        color: theme.palette.primary.main,
        margin: '6px 0',
        flexGrow: 1,
        lineHeight: '26px',
        display: 'flex'
    },
    count: {
        paddingLeft: '1rem',
        textAlign: 'center',
        color: theme.palette.info.light,
    }
}));

const BlacklistedUserCard = ({ data }) => {
    const { id, names, user_name, picture, usersReportsCount } = data
    const classes = useStyles()

    return (
        <Box className={classes.root}>
            <Box className={classes.reason}>
                <Avatar
                    source={picture}
                    alt="profile_pic"
                />
                <Box display="flex" flexDirection="column">
                    <Box component="span">{names}</Box>
                    <Link
                        to={`/${user_name}`}
                        color='info'
                        underline='hover'
                        component={LinkBehavior}
                    >
                        Ver publicaciones
                    </Link>
                </Box>
            </Box>
            <Box className={classes.count}>
                {usersReportsCount}<br />reportes
            </Box>
        </Box>
    );
}

export default BlacklistedUserCard
