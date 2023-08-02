import * as React from 'react';
import {
    Settings,
    InfoCircle,
    Home,
    Users,
    Dollar,
    Balance
} from '@approbado/lib/icons'
import MenuItemLink from '@approbado/lib/components/MenuItemLink'
import LogoutButton from '@approbado/lib/components/LogoutButton'
import Typography from '@material-ui/core/Typography'

const MenuItems = ({ open, onMenuClick, dense }) => (
    <React.Fragment>
        <MenuItemLink
            to="/"
            primaryText={'Inicio'}
            leftIcon={<Home />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
            exact
        />
        <MenuItemLink
            to="/trivias"
            primaryText='Trivias'
            leftIcon={<Balance />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
        />
        <MenuItemLink
            to='/users'
            primaryText='Usuarios'
            leftIcon={<Users />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
        />
        <MenuItemLink
            to="/memberships"
            primaryText={'Planes y membresías'}
            leftIcon={<Dollar />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
        />
        <MenuItemLink
            to='/reports'
            primaryText='Reportes'
            leftIcon={<InfoCircle />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
        />
        <MenuItemLink
            to="/configurations"
            primaryText={'Configuraciones'}
            leftIcon={<Settings />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
        />
        <LogoutButton>
            {open && (
                <Typography variant="subtitle1">
                    {'Cerrar sesión'}
                </Typography>
            )}
        </LogoutButton>
    </React.Fragment>
);

export default MenuItems;
