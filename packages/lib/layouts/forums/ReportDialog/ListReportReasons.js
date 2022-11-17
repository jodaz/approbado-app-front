import * as React from 'react';
import Spinner from '@approbado/lib/components/Spinner'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import useSpinnerStyles from '@approbado/lib/styles/useSpinnerStyles'
import useFetch from '@approbado/lib/hooks/useFetch'
import ErrorMessage from '@approbado/lib/components/ErrorMessage'

const useStyles = makeStyles(
    () => ({
        padding: {
            padding: '0.5rem 1rem',
            borderRadius: '6px'
        }
    }),
    { name: 'RaDialog' }
);

export default function ReportDialog({ handleClick, reasonID }) {
    const classes = useStyles();
    const spinnerStyles = useSpinnerStyles();
    const {
        data,
        error,
        loading
    } = useFetch('/report-reasons', {
        page: 0,
        perPage: 10
    })

    if (loading) return <Spinner classes={spinnerStyles} />

    if (error) return <ErrorMessage>Ha ocurrido un error en su solicitud</ErrorMessage>

    return (
        <List
            component="nav"
            aria-label="secondary mailbox folder"
            style={{ width: '100%', marginBottom: '1rem' }}
        >
            {data.map(reason => (
                <ListItem
                    button
                    selected={reasonID === reason.id}
                    onClick={(event) => handleClick(event, reason.id)}
                    disableGutters
                    className={classes.padding}
                    key={reason.id}
                >
                    <ListItemText primary={reason.item} />
                </ListItem>
            ))}
        </List>
    );
}
