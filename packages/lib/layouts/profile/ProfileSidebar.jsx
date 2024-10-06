import * as React from 'react'
import { Edit } from '@approbado/lib/icons';
import Box from '@material-ui/core/Box'
import { useUserState } from '@approbado/lib/hooks/useUserState'
import ProfileExtraInfoCard from '@approbado/lib/components/ProfileExtraInfoCard'
import { makeStyles, alpha } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import ProfilePhotoInput from '@approbado/lib/components/ProfilePhotoInput'
import { useLocation } from 'react-router-dom'

// Illustrations
import Stage1 from '@approbado/lib/illustrations/Stage1.svg';
import Forum from '@approbado/lib/illustrations/Forum.svg';
import Forum2 from '@approbado/lib/illustrations/Forum2.svg';
import Ribbon from '@approbado/lib/illustrations/Ribbon.svg';
import LinkBehavior from '@approbado/lib/components/LinkBehavior'

import Avatar from '../../components/Avatar';

const Spacer = () => <span style={{ height: 0, width: '100%', borderBottom: '0.1rem solid rgba(0, 0, 0, 0.2)' }} />;

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
    picture: {
        height: '8rem',
        width: '8rem'
    },
    name: {
        fontWeight: 600
    },
    username: {
        fontWeight: 600,
        color: alpha(theme.palette.primary.dark, 0.7)
    },
    headerContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '2rem',
        position: 'relative'
    },
    icon: {
        zIndex: 1000,
        position: 'absolute',
        top: 0,
        right: 0,
    }
}));

const numberFormat = number => {
    let nf = new Intl.NumberFormat('en-US');

    return nf.format(number)
}

const ProfileSidebar = ({
    picture,
    names,
    user_name,
    awards,
    comments,
    discussion,
    profile
}) => {
    const { pathname } = useLocation();
    const { user } = useUserState();
    const classes = useStyles();
    const isEditting = pathname == '/profile/edit'

    return (
        <Box className={classes.root}>
            <Box className={classes.headerContainer}>
                {(!isEditting) ? (
                    <Avatar
                        className={classes.picture}
                        source={`/${picture}`}
                    />
                ) : (
                    <ProfilePhotoInput
                        source='file'
                        preview={user.picture}
                        accept='image/jpeg, image/png'
                    />
                )}
                <Typography variant="subtitle1" className={classes.name}>
                    {names}
                </Typography>
                <Typography variant="body2" className={classes.username}>
                    {user_name}
                </Typography>
                {(user.id == profile.user_id && !isEditting) && (
                    <Box className={classes.icon} to='/profile/edit' component={LinkBehavior}>
                        <Edit />
                    </Box>
                )}
            </Box>
            <Box display='flex' flexDirection='column' justifyContent='flex-start' width='100%'>
                <ProfileExtraInfoCard
                    Image={Stage1}
                    text='Puntos acumulados'
                    amount={numberFormat(profile.points)}
                />
                <Spacer />
                <ProfileExtraInfoCard
                    Image={Forum}
                    text='Debates respondidos'
                    amount={numberFormat(comments.length)}
                />
                <Spacer />
                <ProfileExtraInfoCard
                    Image={Forum2}
                    text='Debates iniciados'
                    amount={numberFormat(discussion.length)}
                />
                <Spacer />
                <ProfileExtraInfoCard
                    Image={Ribbon}
                    text='Certificaciones'
                    amount={numberFormat(awards.length)}
                />
            </Box>
        </Box>
    );
}

export default ProfileSidebar
