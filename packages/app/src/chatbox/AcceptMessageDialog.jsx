import * as React from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Spinner from '@approbado/lib/components/Spinner'
import { JSONAxiosInstance as axios } from '@approbado/lib/api'
import { useChatDispatch } from '@approbado/lib/hooks/useChat'

const AcceptMessageDialog = ({ id: chat_id, is_private, receptor, notification, currUserId }) => {
    const [isLoading, setIsLoading] = React.useState(false)
    const { acceptChat } = useChatDispatch()

    const handleAccept = async (status) => {
        setIsLoading(true)

        const res = await axios.put(`/chats/status/${chat_id}/${currUserId}`, {
            status: status
        })

        if (res.status >= 200 && res.status <= 300) {
            acceptChat(status);
        }
        setIsLoading(false)
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
            height: '50%',
            textAlign: 'center',
            boxShadow: '0px -1px 4px rgba(0, 0, 0, 0.08)'
        }}>
            <Box
                sx={{ fontWeight: 600 }}
                dangerouslySetInnerHTML={{ __html: notification.long_data }}
            />
            <Box sx={{
                fontWeight: 400,
                color: '#6D6D6D'
            }}>
                {is_private ? (
                    <>
                        Si aceptas contestar el mensaje, <strong>@{receptor.user_name}</strong> podrá enviarte mensajes. Tanto tú como el usuario podrán visualizar su información de perfil y ver el estado de sus mensajes.
                    </>
                ) : (
                    <>
                        Si aceptas contestar el mensaje, tanto tú como los integrantes del grupo podrán visualizar su información de perfil y ver el estado de sus mensajes.
                    </>
                )}
            </Box>
            <Box sx={{
                display: 'flex',
                width: '12rem',
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
