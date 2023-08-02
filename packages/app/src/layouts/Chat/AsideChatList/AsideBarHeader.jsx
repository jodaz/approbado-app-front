import * as React from 'react'
import { Search } from '@approbado/lib/icons'
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField'
import SelectMessagesType from './components/SelectMessagesType'
import ChatPreferencesMenu from './components/ChatPreferencesMenu'

const AsideBarHeader = ({ onChange }) => (
    <Box sx={{
        padding: '1rem 0.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '6rem',
        boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.18)'
    }}>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
        }}>
            <SelectMessagesType />
            <ChatPreferencesMenu />
        </Box>
        <Box>
            <TextField
                onChange={onChange}
                InputProps={{
                    startAdornment: (
                        <Box marginLeft='6px' display='flex'>
                            <Search />
                        </Box>
                    )
                }}
                placeholder='Buscar a un usuario'
            />
        </Box>
    </Box>
);

export default AsideBarHeader
