import * as React from 'react';
import { makeStyles, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    item: {
        color: theme.palette.secondary.light,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '4px 8px',
        backgroundColor: props => theme.palette.info[props.color],
        borderRadius: '6px',
        marginRight: '0.5rem',
        fontSize: '14px',
        fontWeight: '600',
        width: 'max-content',
        height: 'max-content',
        marginTop: '0.5rem'
    },
    icon: {
        marginRight: '0.3rem'
    }
}))

const Tag = ({ name, icon, color = 'main' }) => {
    const classes = useStyles({ color: color });

    return (
        <Box className={classes.item}>
            {(icon) && React.cloneElement(icon, {
                className: classes.icon
            })}
            {name}
        </Box>
    );
}

Tag.defaultProps = {
    label: 'name'
}

export default Tag;
