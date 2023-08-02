import * as React from 'react';
import {
    Settings,
    Home,
    Profile,
    Balance,
    Email,
    Podium,
    Bell
} from '@approbado/lib/icons'
import MenuItemLink from '@approbado/lib/components/MenuItemLink'

const MenuItems = ({ open, onMenuClick, dense, user }) => (
    <React.Fragment>
        <MenuItemLink
            to="/dashboard"
            primaryText={'Inicio'}
            leftIcon={<Home />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
            exact
        />
        <MenuItemLink
            to='/notifications'
            primaryText='Notificaciones'
            leftIcon={<Bell />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
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
            to='/forums'
            primaryText='Foros'
            leftIcon={<Podium />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
        />
        <MenuItemLink
            to='/chats'
            primaryText='Mensajes'
            leftIcon={<Email />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
        />
        <MenuItemLink
            to={`/${user.user_name}`}
            primaryText='Perfil'
            leftIcon={<Profile />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
            exact
        />
        <MenuItemLink
            to="/settings"
            primaryText='Configuración'
            leftIcon={<Settings />}
            onClick={onMenuClick}
            sidebarIsOpen={open}
            dense={dense}
            exact
        />
    </React.Fragment>
);

export default MenuItems;
