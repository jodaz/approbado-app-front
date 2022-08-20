import * as React from 'react';
import { makeStyles, alpha } from '@material-ui/core/styles';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ReactComponent as PlusIcon } from '@approbado/lib/icons/Plus.svg'

const CreateButton = props => {
    const {
        basePath = '',
        className,
        classes: classesOverride,
        label = 'Crear',
        scrollToTop = true,
        variant,
        to,
        ...rest
    } = props;
    const classes = useStyles(props);
    const isSmall = useMediaQuery(theme =>
        theme.breakpoints.down('sm')
    );

    return isSmall ? (
        <Fab
            component={Link}
            className={classnames(classes.floating, className)}
            to={to}
            aria-label={label}
            {...rest}
        >
            <PlusIcon />
        </Fab>
    ) : (
        <Button
            component={Link}
            to={to}
            className={classnames(classes.fullwidth, className)}
            label={label}
            variant={variant}
            color="secondary"
            {...rest}
        >
            {label}
        </Button>
    );
};

const useStyles = makeStyles(
    theme => ({
        floating: {
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 60,
            left: 'auto',
            position: 'fixed',
            zIndex: 1000,
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
        },
        fullwidth: {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
            '&:hover': {
                backgroundColor: `${alpha(theme.palette.secondary.main, 0.8)} !important`
            }
        }
    }),
    { name: 'RaCreateButton' }
);

export default CreateButton;
