import * as React from 'react'
import {
    makeStyles,
    Toolbar,
    useMediaQuery,
    Box,
    AppBar as MuiAppBar,
    Typography
} from '@material-ui/core';
import { MenuItemLink } from 'react-admin'
import { useUserState } from '@approbado/lib/hooks/useUserState'
import { useUiState } from '@approbado/lib/hooks/useUI';
import { Profile } from '../icons';
import LazyLoader from '@approbado/lib/components/LazyLoader'
import Dot from '@approbado/lib/components/Dot'
import LogoutButton from '@approbado/lib/components/LogoutButton'
// Icons
import ToggleSidebarButton from './ToggleSidebarButton';
import GoBackButton from './GoBackButton';
import UserMenu from './UserMenu'

const NotificationsButton = React.lazy(() => import('./NotificationsButton'))

const useStyles = makeStyles(theme => ({
        root: {
            backgroundColor: props =>
                props.isXSmall ? theme.palette.primary.main
                : theme.palette.background.default,
            width: props =>
                props.fullWidth ? '100%'
                : !props.isOpenSidebar && (!props.isXSmall) // Large screens
                    ? `calc(100% - 55px)`
                : (props.isXSmall) // Small screen
                    ? '100%'
                : `calc(100% - 240px)`, // Large screen
            boxShadow: 'none',
            borderBottom: 0,
            transition: 'width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
            height: '3rem !important'
        },
        toolbar: {
            display: 'flex',
            justifyContent: 'space-between',
            paddingRight: 24,
            backgroundColor: 'transparent',
            flexDirection: props =>
                props.isXSmall
                    ? 'row-reverse'
                    : 'row',
        },
        title: {
            flex: 1,
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
        },
        gameinfo: {
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.primary.main,
            padding: '0 1rem'
        }
    }),
    { name: 'RaAppBar' }
);

const CustomUserMenu = React.forwardRef(({ onClick, user }, ref) => (
    <UserMenu>
        <Box color='primary'>
            <MenuItemLink
                ref={ref}
                to={user.user_name ? `/${user.user_name}` : '/profile'}
                primaryText='Perfil'
                title='Configuraciones de perfil'
                leftIcon={<Profile color='inherit' />}
                onClick={onClick}
                sidebarIsOpen
            />
            <LogoutButton>
                <Typography variant="subtitle1">
                    {'Cerrar sesión'}
                </Typography>
            </LogoutButton>
        </Box>
    </UserMenu>
));

const AppBar = props => {
    const { selected } = props
    const isXSmall = useMediaQuery(theme =>
        theme.breakpoints.down('xs')
    );
    const { sidebarOpen } = useUiState();
    const classes = useStyles({
        isOpenSidebar: sidebarOpen,
        isXSmall: isXSmall,
        fullWidth: selected
    });
    const { user } = useUserState();

    return (
        <MuiAppBar className={classes.root} position='absolute'>
            <Toolbar
                disableGutters
                variant={isXSmall ? 'regular' : 'dense'}
                className={classes.toolbar}
            >
                <Box display='flex'>
                    {!selected && <ToggleSidebarButton />}
                    <GoBackButton />
                    {(selected && !isXSmall) && (
                        <Box className={classes.gameinfo}>
                            Trivia <Dot /> Derecho Laboral
                        </Box>
                    )}
                </Box>

                <div style={{ display: 'flex' }}>
                    {(user.is_registered) && (
                        <LazyLoader loader={false}>
                            <NotificationsButton />
                        </LazyLoader>
                    )}
                    <CustomUserMenu user={user} />
                </div>
            </Toolbar>
        </MuiAppBar>
    );
};

AppBar.defaultsProps = {
    fullWidth: false,
    selected: true
}

export default AppBar;
