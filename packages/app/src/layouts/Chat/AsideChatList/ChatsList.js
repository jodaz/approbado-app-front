import * as React from 'react';
import Box from '@material-ui/core/Box';
import UserMessageCard from './components/UserMessageCard'
import ErrorMessage from '@approbado/lib/components/ErrorMessage'
import Spinner from '@approbado/lib/components/Spinner'

const ChatsList = ({ total, items, loading, error, lastItemRef }) => {
    return (
        <Box>
            {total ? items.map((item, index) => {
                if (items.length === index + 1) {
                    return (
                        <UserMessageCard
                            data={item}
                            index={index}
                            rootRef={lastItemRef}
                        />
                    );
                } else {
                    return (
                        <UserMessageCard
                            index={index}
                            data={item}
                        />
                    )
                }
            }) : (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '5rem'
                }}>
                    <ErrorMessage>
                        No tiene mensajes disponibles.
                    </ErrorMessage>
                </Box>
            )}
            {(loading || error) && (
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    padding: '2rem 0'
                }}>
                    {(loading) && <Spinner />}

                    {(error) && <ErrorMessage />}
                </Box>
            )}
        </Box>
    );
}

export default ChatsList;
