import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box';
import Emoji from '@approbado/lib/components/Emoji'
import { makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import configs from '@approbado/lib/configs'
import ReplyIcon from '@approbado/lib/icons/ReplyIcon';
import ErrorMessage from '@approbado/lib/components/ErrorMessage'
import getQueryFromParams from '@approbado/lib/utils/getQueryFromParams'
import { apiProvider as axios } from '@approbado/lib/api'

const payload = {
    pagination: { page: 1, perPage: 5 },
    sort: { field: 'contributionsCount', order: 'DESC'}
};

const useStyles = makeStyles(theme => ({
    card: {
        padding: '1rem 0.4rem',
        display: 'flex'
    },
    username: {
        marginLeft: '0.2rem',
        fontWeight: '600',
        cursor: 'pointer',
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    icon: {
        marginRight: '1rem',
        height: theme.spacing(6),
        width: theme.spacing(6)
    },
    description: {
        display: 'inherit',
        flexDirection: 'column',
    },
    contributionsCount: {
        display: 'inherit',
        marginTop: '0.25rem',
        color: theme.palette.info.light
    }
}))

const TopContributors = ({ isXSmall }) => {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [data, setData] = React.useState([])

    const fetchUsers = async () => {
        setLoading(true)

        const res = await axios.get('/users', { params: getQueryFromParams(payload) })

        if (res.status >= 200 && res.status < 300) {
            setData(res.data.data)
        } else {
            setError(true)
        }

        setLoading(false)
    }

    React.useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <Box>
            {!isXSmall && (
                <Box p='0 0 0 2rem'>
                    <Typography component="div">
                        <Box sx={{ fontWeight: '700', fontSize: '1.5rem' }}>
                            Top - Contribuidores
                        </Box>
                    </Typography>
                    <Typography component="div">
                        <Box sx={{ fontWeight: '400', fontSize: '1rem' }}>
                            {'Personas que comentaron debates y compartieron conocimientos en el foro.'}
                        </Box>
                    </Typography>

                    {error && <Box mt={5}><ErrorMessage /></Box>}

                    {!!(!loading && data.length) && (
                        <Box>
                            {data.map(user =>
                                <Box className={classes.card}>
                                    <Avatar
                                        className={classes.icon}
                                        source={user.picture}
                                        alt='photo_profile'
                                    />
                                    <Box className={classes.description}>
                                        <Link
                                            className={classes.username}
                                            to={`/${user.user_name}`}
                                        >
                                            {user.names}
                                        </Link>
                                        <Box className={classes.contributionsCount}>
                                            <ReplyIcon />
                                            {user.contributionsCount} discusiones
                                        </Box>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    )}

                    {(loading || !data.length && !error) && (
                        <Box className={classes.description} paddingTop='2rem' >
                            <Typography component={'p'} variant="body1">
                                No tenemos contribuidores disponibles
                                {' '}
                                <Emoji symbol="😔" />
                            </Typography>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
}

TopContributors.propTypes = {
    isXSmall: PropTypes.bool
}

export default TopContributors
