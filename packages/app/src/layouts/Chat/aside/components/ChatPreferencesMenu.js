import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import SettingsIcon from '@approbado/lib/icons/SettingsIcon'
import PreferenceIcon from '@approbado/lib/icons/PreferenceIcon';
import NewChatIcon from '@approbado/lib/icons/NewChatIcon';
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
    },
    popper: {
        zIndex: 1000
    },
    paper: {
        boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.12)',
        borderRadius: '8px !important'
    },
    menuItem: {
        padding: '0.8rem 1rem',
        '& :nth-child(1)': {
            marginRight: '1rem'
        }
    }
}));

export default function ChatPreferencesMenu() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div className={classes.root}>
            <div>
                <IconButton
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <SettingsIcon />
                </IconButton>
                <Popper
                    open={open}
                    className={classes.popper}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                    placement='bottom-end'
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin: 'bottom',
                                zIndex: 1000
                            }}
                        >
                            <Paper className={classes.paper}>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="menu-list-grow"
                                        onKeyDown={handleListKeyDown}
                                    >
                                        <MenuItem
                                            onClick={handleClose}
                                            className={classes.menuItem}
                                            component={NavLink}
                                            to='/settings/privacy'
                                        >
                                            <PreferenceIcon />
                                            Preferencias
                                        </MenuItem>
                                        <MenuItem
                                            onClick={handleClose}
                                            className={classes.menuItem}
                                        >
                                            <NewChatIcon />
                                            Solicitud de mensajes
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </div>
    );
}
