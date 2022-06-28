import * as React from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { useMediaQuery } from '@material-ui/core'
import Spinner from '@approbado/lib/components/Spinner'
import { axios } from '@approbado/lib/providers'

const AcceptMessageDialog = ({ id: chat_id, notification, currUserId }) => {
    const [isLoading, setIsLoading] = React.useState(false)
    const isSmall = useMediaQuery(theme =>
        theme.breakpoints.down('sm')
    )

    const handleAccept = async (status) => {
        setIsLoading(true)

        const { res } = await axios.put(`/chats/status/${chat_id}/${currUserId}`, {
            status: status
        })
    }

    if (isLoading) return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: '2rem',
        }}>
            <Spinner />
        </Box>
    )

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '2rem',
            height: '10rem',
            textAlign: 'center',
            boxShadow: '0px -1px 4px rgba(0, 0, 0, 0.08)'
        }}>
            <Box
                sx={{ fontWeight: 600 }}
                dangerouslySetInnerHTML={{ __html: notification.long_data }}
            />
            <Box sx={{
                fontWeight: 600,
                color: '#6D6D6D'
            }}>
                Si aceptas contestar el mensaje el usuario podrá enviarte mensajes.
                Tanto tú como el usuario podrán visualizar su información de perfil
                y ver el estado de sus mensajes.
            </Box>
            <Box sx={{
                display: 'flex',
                width: isSmall ? '80%' : '30%',
                justifyContent: 'space-between',
                padding: '1rem 0',
                alignSelf: 'center'
            }}>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleAccept('rejected')}
                >
                    Rechazar
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAccept('accepted')}
                >
                    Aceptar
                </Button>
            </Box>
        </Box>
    )
}

export default AcceptMessageDialog;
