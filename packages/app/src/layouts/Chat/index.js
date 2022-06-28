import * as React from 'react'
import Box from '@material-ui/core/Box'
import Default from '../Default'

const ChatLayout = ({ children }) =>  (
    <Default disablePaddingContent>
        <Box sx={{
            display: 'flex',
            width: '100%',
            height: '100%'
        }}>
            {children}
        </Box>
    </Default>
)

export default ChatLayout
