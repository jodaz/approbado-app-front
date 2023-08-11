import * as React from 'react'
import Avatar from '@approbado/lib/components/Avatar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/styles/makeStyles';
import Link from '@material-ui/core/Link';
import Spinner from '@approbado/lib/components/Spinner'
import LinkBehavior from '@approbado/lib/components/LinkBehavior'
import RecentReports from '../components/RecentReports'
import { useParams } from 'react-router-dom'
import configs from '@approbado/lib/configs'
import RestrictButton from '../components/RestrictButton'
import { axios } from '@approbado/lib/providers';

const useStyles = makeStyles(theme => ({
    root: {
        borderRadius: '8px !important',
        padding: '8px 9px 16px 16px',
        backgroundColor: theme.palette.background.dark,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '16rem',
        height: '5rem'
    },
    content: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        padding: '1rem 0'
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
        display: 'inherit',
        alignItems: 'flex-start',
        color: theme.palette.info.light,
        height: 'inherit'
    }
}))

const BlacklistedUserShow = () => {
    const classes = useStyles();
    const { id: userId } = useParams();
    const [record, setRecord] = React.useState({})

    const fetchRecord = React.useCallback(async () => {
        const { data } = await axios.get(`/blacklisted-users/${userId}`)

        setRecord(data)
    }, [])

    React.useEffect(() => {
        fetchRecord();
    }, [])

    if (!Object.entries(record).length) return <Spinner />;

    const { names, user_name, id, picture } = record

    return (
        <Box>
            <Box marginBottom='2rem'>
                <Typography variant="h5">Reporte de {names}</Typography>
            </Box>
            <Box>
                <Box className={classes.root}>
                    <Box className={classes.reason}>
                        <Avatar
                            alt='user_pic'
                            source={picture}
                        />
                        <Box display="flex" flexDirection="column" marginRight='1rem'>
                            <Box component="span" sx={{
                                fontWeight: 500
                            }}>
                                {names}
                            </Box>
                            <Box component="span" sx={{
                                fontWeight: 400,
                                fontSize: '0.9rem'
                            }}>
                                @{user_name}
                            </Box>
                        </Box>
                    </Box>
                    <Box className={classes.count}>
                        <Link
                            to={`/${user_name}`}
                            color='info'
                            underline='hover'
                            component={LinkBehavior}
                        >
                            Ver perfil
                        </Link>
                    </Box>
                </Box>
            </Box>
            <Box margin='1rem 0'>
                <RestrictButton {...record} />
            </Box>
            <Box marginTop="1rem">
                <Typography variant="subtitle1">
                    Publicaciones reportadas
                </Typography>
                <Box marginTop='1rem'>
                    <RecentReports filterDefaultValues={{ reported_user_id: id }} />
                </Box>
            </Box>
        </Box>
    )
}

export default BlacklistedUserShow
