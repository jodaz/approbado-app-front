import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import OptionsCardMenu from '@approbado/lib/components/OptionsCardMenu';
import makeStyles from '@material-ui/styles/makeStyles';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import configs from '@approbado/lib/configs'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import Skeleton from "@material-ui/lab/Skeleton";
import DeleteNotification from './DeleteNotification'
import { axios } from '@approbado/lib/providers'
import { useChatDispatch } from '@approbado/lib/hooks/useChat'

const useStyles = makeStyles(theme => ({
    root: {
        border: 'none',
        borderBottom: '1px solid #D1D1D1',
        cursor: 'pointer',
        marginBottom: '2rem',
        padding: '1rem'
    },
    title: {
        fontSize: '1rem',
        fontWeight: 400,
        color: theme.palette.primary.main
    },
    lightTypography: {
        fontSize: '0.9rem',
        fontWeight: 400,
        color: theme.palette.info.light,
    },
    primaryTypography: {
        fontSize: '0.9rem',
        fontWeight: 600,
        color: theme.palette.primary.main
    },
    header: {
        padding: '0rem'
    },
    content: {
        padding: '0 0 0 3.5rem',
        height: '4rem',
        '&:last-child': {
            paddingBottom: 'unset !important'
        }
    },
    actions: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '200px',
        marginLeft: 'auto'
    }
}));

const NotificationCard = ({ data, rootRef, index }) => {
    const loading = data == null;
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const anchorRef = React.useRef(null);
    const ref = React.useRef(null)
    const [isLoading, setIsLoading] = React.useState(false)
    const { acceptChat } = useChatDispatch()

    const handleAccept = async (status) => {
        setIsLoading(true)

        // const res = await axios.put(`/chats/status/${chat_id}/${currUserId}`, {
        //     status: status
        // })

        // if (res.status >= 200 && res.status <= 300) {
        //     acceptChat(status);
        // }
        setIsLoading(false)
    }

    const handleExpandClick = e => {
        if (anchorRef.current && anchorRef.current.contains(e.target)) {
            setExpanded(!expanded);
        }
        e.preventDefault();
    };

    return (
        <Card
            className={classes.root}
            onClick={handleExpandClick}
            ref={anchorRef}
            key={index}
        >
            <CardHeader
                className={classes.header}
                avatar={
                    loading ? (
                      <Skeleton
                        animation="wave"
                        variant="circle"
                        width={40}
                        height={40}
                      />
                    ) : (
                        <Avatar
                            aria-label="recipe"
                            src={`${configs.SOURCE}/${data.user.picture}`}
                        />
                    )
                }
                action={
                    <>
                        {!loading && (
                            <OptionsCardMenu>
                                <DeleteNotification id={data.id} />
                            </OptionsCardMenu>
                        )}
                    </>
                }
                title={
                    loading ? (
                      <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{ marginBottom: 6 }}
                      />
                    ) : (
                        <Box
                            component='div'
                            className={classes.title}
                            dangerouslySetInnerHTML={{ __html: data.data }}
                        />
                    )
                }
                subheader={
                    loading ? (
                      <Skeleton
                        animation="wave"
                        height={10}
                        width="20%"
                        style={{ marginBottom: 6 }}
                      />
                    ) : (
                        format(new Date(data.created_at), 'eee. d, MMMM', { locale: es }).toUpperCase()
                    )
                }
            />
            <>
                {!loading && (
                (data.type == 'request') && (
                    <Collapse in={!loading && expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <CardActions className={classes.actions} disableSpacing>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => handleAccept('rejected')}
                                >
                                    Rechazar
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleAccept('accepted')}
                                >
                                    Aceptar
                                </Button>
                            </CardActions>
                        </CardContent>
                    </Collapse>
                )
                )}
            </>
        </Card>
    );
}

export default NotificationCard
