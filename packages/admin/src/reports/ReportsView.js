import * as React from 'react'
// Components
import Admin from '../layouts/Admin'
import TabbedList from '@approbado/lib/components/TabbedList'
import Box from '@material-ui/core/Box'

const tags = [
    {
        name: 'Nuevos',
        pathname: '/reports/recent'
    },
    {
        name: 'Lista negra',
        pathname: '/reports/blacklisted'
    },
    {
        name: 'Restringidos',
        pathname: '/reports/restricted'
    },
]

const ReportsList = ({ children }) => (
    <Admin>
        <Box marginTop='1rem'>
            <TabbedList
                tags={tags}
                name='Reportes del foro'
            />
            {children}
        </Box>
    </Admin>
)

export default ReportsList
