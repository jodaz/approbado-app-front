import * as React from 'react'
// Components
import TabbedList from '@approbado/lib/components/TabbedList'
import Default from '../Default'
import Box from '@material-ui/core/Box'

const tags = [
    {
        name: 'Privacidad',
        pathname: '/settings/privacy'
    },
    {
        name: 'Notificaciones',
        pathname: '/settings/notifications'
    },
    {
        name: 'Cambiar contraseña',
        pathname: '/settings/security'
    },
    {
        name: 'Eliminar cuenta',
        pathname: '/settings/delete-account'
    },
]

const AccountSettings = ({ children }) => (
    <Default>
        <Box padding='1rem'>
            <TabbedList
                tags={tags}
                defaultTag='privacy'
                name='Configuraciones'
            />
            <Box>
                {children}
            </Box>
        </Box>
    </Default>
)

export default AccountSettings
