import * as React from 'react';
import { makeStyles, Box, useMediaQuery  } from '@material-ui/core';
import Dot from '@approbado/lib/components/Dot'
import { Link } from 'react-router-dom'
import ItemCollection from '@approbado/lib/components/ItemCollection'
import { useConvertPostgresDate } from '@approbado/lib/hooks/useConvertPostgresDate'
import { ReactComponent as TagIcon } from '@approbado/lib/icons/Tag.svg'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        height: 'fit-content'
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
    link: {
        fontSize: '0.9rem',
        fontWeight: 600,
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    content: {
        display: 'flex',
        alignItems: 'center'
    }
}))

export default ({ record }) => {
    const { categories, trivias } = record
    const date = useConvertPostgresDate(record.created_at)
    const classes = useStyles();
    const isXSmall = useMediaQuery(theme =>
        theme.breakpoints.down('xs')
    )

    return (
        <Box component="div" className={classes.root}>
            <Box className={classes.content}>
                <span className={classes.lightTypography}>
                Por &nbsp;
                </span>
                <Link
                    className={classes.link}
                    to={`/${record.owner.user_name}`}
                >
                    {record.owner.names}
                </Link>
                <Dot />
                <span className={classes.lightTypography}>
                    {date}
                </span>
                {(!isXSmall) && (
                    <>
                    <Dot />
                    <span className={classes.lightTypography}>
                        {record.commentsCount} respuestas
                    </span>
                    </>
                )}
            </Box>
            <Box pt={1}>
                <ItemCollection
                    items={categories}
                    icon={<TagIcon />}
                />
            </Box>
            <Box pt={1}>
                <ItemCollection
                    items={trivias}
                    color='dark'
                />
            </Box>
        </Box>
    );
}
