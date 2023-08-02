import * as React from 'react';
import { MoreHorizontal } from '@approbado/lib/icons'
import IconButton from '@material-ui/core/IconButton';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';

const useStyles = makeStyles(() => ({
    popper: {
        zIndex: 1000
    },
    paper: {
        boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.12)',
        borderRadius: '8px !important'
    },
    menuList: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    menuItem: {
        padding: '0.8rem 1rem',
        display: 'flex',
        alignItems: 'center'
    }
}));

const OptionsCardMenu = ({ children, icon }) => {
    const arrayChildren = React.Children.toArray(children)
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const classes = useStyles();

    const handleToggle = event => {
        setOpen((prevOpen) => !prevOpen);
        event.stopPropagation();
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
        } else if (event.key === 'Escape') {
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
        <>
            <IconButton
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                {React.cloneElement(icon, {})}
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
                        style={{ transformOrigin: 'right', zIndex: 1000 }}
                    >
                        <Paper className={classes.paper}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    id="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                >
                                    {React.Children.map(arrayChildren, (child, i) =>
                                        React.cloneElement(child, {
                                            onClick: handleToggle
                                        })
                                    )}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
}

OptionsCardMenu.defaultProps = {
    icon: <MoreHorizontal />
}

export default OptionsCardMenu;
