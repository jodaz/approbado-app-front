import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles, alpha } from '@material-ui/core';

const NavLinkRef = React.forwardRef((props, ref) => (
    <NavLink innerRef={ref} {...props} />
));

const useStyles = makeStyles(
    theme => ({
        root: {
            color: theme.palette.primary.light,
            fill: theme.palette.primary.light,
            stroke: theme.palette.primary.light,
            borderRadius: '6px',
            marginTop: '0.15rem',
            display: 'flex',
            alignItems: 'center',
            '&:hover': {
                backgroundColor: alpha(theme.palette.primary.light, 0.16),
            }
        },
        active: {
            borderLeft: `3px solid ${theme.palette.secondary.main}`,
            backgroundColor: alpha(theme.palette.secondary.main, 0.16),
            color: theme.palette.secondary.main,
            fill: theme.palette.secondary.main,
            stroke: theme.palette.secondary.main
        },
        linkIcon: {
            minWidth: theme.spacing(4),
        },
        icon: {
            fill: 'inherit',
            stroke: 'inherit',
        },
    }),
    { name: 'RaMenuItemLink' }
);

const MenuItemLink = React.forwardRef((props, ref) => {
    const {
        classes: classesOverride,
        className,
        primaryText,
        leftIcon,
        onClick,
        sidebarIsOpen,
        tooltipProps,
        ...rest
    } = props;

    const classes = useStyles(props);

    const renderMenuItem = () => {
        return (
            <MenuItem
                className={classnames(classes.root, className)}
                activeClassName={classes.active}
                component={NavLinkRef}
                ref={ref}
                tabIndex={0}
                {...rest}
            >
                {leftIcon && (
                    <ListItemIcon className={classes.linkIcon}>
                        {React.cloneElement(leftIcon, {
                            titleAccess: primaryText,
                            className: classes.icon
                        })}
                    </ListItemIcon>
                )}
                {sidebarIsOpen && primaryText}
            </MenuItem>
        );
    };

    return sidebarIsOpen ? (
        renderMenuItem()
    ) : (
        <Tooltip title={primaryText} placement="right" {...tooltipProps}>
            {renderMenuItem()}
        </Tooltip>
    );
});

MenuItemLink.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    leftIcon: PropTypes.element,
    onClick: PropTypes.func,
    primaryText: PropTypes.node,
    staticContext: PropTypes.object,
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    sidebarIsOpen: PropTypes.bool,
};

export default MenuItemLink;
