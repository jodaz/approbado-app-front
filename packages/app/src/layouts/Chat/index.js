import * as React from 'react'
import Box from '@material-ui/core/Box'
import Aside from './aside'
import Default from '../Default'
import { useMediaQuery } from '@material-ui/core';

const ChatLayout = ({ children }) =>  {
    const isXSmall = useMediaQuery(theme =>
        theme.breakpoints.down('xs')
    )

    return (
        <Default disablePaddingContent>
            <Box sx={{
                display: 'flex',
                width: '100%',
                height: '100%'
            }}>
                <Aside />
                {(!isXSmall) && (
                    <>
                        {children}
                    </>
                )}
            </Box>
        </Default>
    )
}

export default ChatLayout
