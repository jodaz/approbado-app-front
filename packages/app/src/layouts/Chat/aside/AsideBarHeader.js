import * as React from 'react'
import Box from '@material-ui/core/Box';
import SearchIcon from '@approbado/lib/icons/SearchIcon'
import TextField from '@material-ui/core/TextField'
import SelectMessagesType from './components/SelectMessagesType'

const AsideBarHeader = ({ onChange }) => (
    <Box sx={{
        width: '100%',
        padding: '1rem 0.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '6rem'
    }}>
        <SelectMessagesType />
        <Box sx={{
        }}>
            <TextField
                onChange={onChange}
                InputProps={{
                    startAdornment: (
                        <Box marginLeft='6px' display='flex'>
                            <SearchIcon />
                        </Box>
                    )
                }}
                placeholder='Buscar a un usuario'
            />
        </Box>
    </Box>
);

export default AsideBarHeader
