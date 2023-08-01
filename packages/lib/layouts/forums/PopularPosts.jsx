import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box';
import Emoji from '@approbado/lib/components/Emoji'
import { makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import ErrorMessage from '@approbado/lib/components/ErrorMessage'
import { JSONAxiosInstance } from '@approbado/lib/api';
import getQueryFromParams from '../../utils/getQueryFromParams';

const payload = {
    pagination: { page: 1, perPage: 5 },
    sort: { field: 'comments', order: 'DESC'}
}

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight: '700',
        fontSize: '1.5rem',
        marginBottom: '2rem'
    },
    container: {
        padding: '1.6rem 0.4rem',
        color: theme.palette.info.light,
        borderTop: '1px solid rgba(0, 0, 0, 0.12)'
    },
    postTitle: {
        color: theme.palette.primary.main,
        fontWeight: 600,
        cursor: 'pointer',
        fontSize: '1rem',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
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
    description: {
        paddingTop: '1rem',
        display: 'flex',
        fontSize: '0.9rem'
    }
}))

const PopularPosts = ({ isXSmall }) => {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(false)
    const [data, setData] = React.useState([])

    const fetchData = async () => {
        setLoading(true)

        const res = await JSONAxiosInstance.get('/forums', {
            params: getQueryFromParams(payload)
        })

        if (res.status >= 200 && res.status < 300) {
            setData(res.data.data)
        } else {
            setError(true)
        }

        setLoading(false)
    }

    React.useEffect(() => fetchData(), [])

    return (
        <Box>
            {!isXSmall && (
                <Box p='0 0 0 2rem'>
                    <Typography component="div">
                        <Box className={classes.title}>
                            Debates más hots{' '} <Emoji symbol="😰" />
                        </Box>
                    </Typography>

                    {error && (
                        <Box mt={5}>
                            <ErrorMessage />
                        </Box>
                    )}

                    {!!(!loading && data.length) && (
                        <Box>
                            {data.map(post =>
                                <Box className={classes.container}>
                                    <Box className={classes.innerContent}>
                                        <Link
                                            className={classes.postTitle}
                                            to={`/forums/${post.id}/show`}
                                        >
                                            {post.message}
                                        </Link>
                                        <Box className={classes.description}>
                                            Por
                                            <Link
                                                className={classes.username}
                                                to={`/users/${post.owner.id}/show`}
                                            >
                                                {post.owner.names}
                                            </Link>
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

PopularPosts.propTypes = {
    isXSmall: PropTypes.bool
}

export default PopularPosts
