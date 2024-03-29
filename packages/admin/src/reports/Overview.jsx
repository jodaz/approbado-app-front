import * as React from 'react'
import {
    Box,
    Typography,
    makeStyles,
    Link,
    Card,
    CardHeader
} from '@material-ui/core'
import Avatar from '@approbado/lib/components/Avatar'
import LinkBehavior from '@approbado/lib/components/LinkBehavior'
import DeleteReportButton from './DeleteReportButton'
import BlacklistButton from './BlacklistButton'
import isEmpty from 'is-empty'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '100%',
        height: 'max-content',
        backgroundColor: theme.palette.background.dark,
        borderRadius: '6px',
        padding: '1rem',
        flexDirection: 'column'
    },
    card: {
        background: theme.palette.background.dark,
        border: 'none',
        height: 'content-height',
        alignItems: 'start',
        padding: '0.5rem 1rem 1rem 1rem'
    },
    headerRoot: {
        padding: '0 !important',
        height: '3rem',
        alignItems: 'start',
    },
    content: {
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    action: {
        margin: 'unset'
    },
}))

export default function({ record }) {
    const classes = useStyles();

    const { post } = record

    return (
        <>
            <Box marginBottom='2rem'>
                <Typography variant="h6">Publicado por</Typography>
            </Box>
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar
                            source={post.owner.picture}
                            alt="user_picture"
                        />
                    }
                    title={post.owner.names}
                    subheader={post.owner.user_name}
                    action={
                        <Link
                            to={`/${post.owner.user_name}`}
                            color='info'
                            underline='hover'
                            component={LinkBehavior}
                        >
                            Ver perfil
                        </Link>
                    }
                    classes={{
                        root: classes.headerRoot,
                        content: classes.content,
                        action: classes.action
                    }}
                />
                <Box paddingTop='1rem' display="flex">
                    {isEmpty(post.owner.blacklisted) && <BlacklistButton {...post} />}
                    <DeleteReportButton id={post.id} />
                </Box>
            </Card>
        </>
    )
}
