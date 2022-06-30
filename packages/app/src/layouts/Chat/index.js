import * as React from 'react'
import Box from '@material-ui/core/Box'
import Default from '../Default'
import ListProfilesModal from './components/ListProfilesModal'
import LeaveGroupDialog from './components/LeaveGroupDialog'

const ChatLayout = ({ children }) =>  (
    <Default disablePaddingContent>
        <Box sx={{
            display: 'flex',
            width: '100%',
            height: '100%'
        }}>
            {children}
        </Box>
        <ListProfilesModal />
        <LeaveGroupDialog />
    </Default>
)

export default ChatLayout
