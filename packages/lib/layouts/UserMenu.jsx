import * as React from 'react'
import Avatar from '@approbado/lib/components/Avatar';
import {
    Tooltip,
    IconButton,
    Popover,
    MenuList,
    Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ChevronDown } from '../icons'
import { useUserState } from '@approbado/lib/hooks/useUserState'

const useStyles = makeStyles(theme => ({
    avatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        marginRight: '1rem'
    },
    usernameContainer: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    usernameButton: {
        color: theme.palette.primary.main,
        display: 'flex',
        fontWeight: '700',
        borderRadius: '6px',
        padding: '0.5rem !important'
    }
}))

const UserMenu = props => {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const classes = useStyles();
    const { children, logout } = props
    const open = Boolean(anchorEl)
    const { user } = useUserState();
    const handleMenu = (event) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)
    if (!logout && !children) return null

    let { picture, names } = user;

    return (
        <>
            <Tooltip title={'Menú'}>
                <IconButton
                    color="inherit"
                    onClick={handleMenu}
                    className={classes.usernameButton}
                >
                    <Avatar
                        className={classes.avatar}
                        source={picture}
                        alt={'user_picture'}
                    />
                    <Typography variant="subtitle1" fontWeight='900'>
                        {names}
                    </Typography>
                    <ChevronDown />
                </IconButton>
            </Tooltip>
            <Popover
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
                <MenuList>
                    {React.Children.map(children, (menuItem) =>
                        React.cloneElement(menuItem, {
                            onClick: handleClose,
                        })
                    )}
                    {logout}
                </MenuList>
            </Popover>
        </>
    )
}

export default UserMenu
