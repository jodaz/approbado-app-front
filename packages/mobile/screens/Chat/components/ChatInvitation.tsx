import React from 'react';
import { Chat } from '@approbado/lib/types/models'
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../routes';
import {
    Button,
    Image,
    Row,
    Text
} from '../../../components';
import { View } from 'react-native';
import { es } from 'date-fns/locale'
import { updateInvitation } from '@approbado/lib/services/chat.services'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import truncateString from '@approbado/lib/utils/truncateString'
import styled from 'styled-components/native';
import { horizontalScale, verticalScale } from '../../../styles/scaling';

const Container = styled.View`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding-horizontal: ${props => horizontalScale(props.theme.space[2])}px;
    padding-vertical: ${props => verticalScale(props.theme.space[2])}px;
    margin-vertical: ${props => verticalScale(props.theme.space[1])}px;
    width: 100%;
`

const StyledButton = styled(Button)`
    width: fit-content;
    padding-horizontal: ${props => horizontalScale(props.theme.space[2])}px;
    padding-vertical: ${props => verticalScale(props.theme.space[2])}px;
    margin-right: ${props => props.theme.space[1]}px;
`

interface IChatCardProps {
    item: Chat,
    user_id: number
}

const ChatInvitation = ({ item, user_id } : IChatCardProps ) : JSX.Element => {
    const { dispatch } = useToast()
    const [disabled, setDisabled] = React.useState(false);
    const [datetime, setDatetime] = React.useState(null)
    const [message, setMessage] = React.useState<null | string>(null)
    const chatName = item.is_private
        ? item.participants.find(({ id } : User) => id !== user_id).user_name
        : item.name;
    const navigation = useNavigation();

    const handleNavigate = () => navigation.navigate(Routes.UserChat, {
        chat: item
    })

    const getDistanceInWords = () => formatDistanceToNowStrict(new Date(item?.created_at), {
        locale: es,
    }).slice(0, 12)

    const toggleDisabled = () => setDisabled(!disabled)

    const onRejectInvitation = async () => {
        toggleDisabled()
        const { success } = await updateInvitation({
            chat_id: item.id,
            status: 'rejected'
        })

        if (success) {
            toggleDisabled()
            setMessage('Has rechazado la solicitud')
        } else {
            toggleDisabled()
            await openToast(
                dispatch,
                'error',
                'Ha ocurrido un error.'
            )
        }
    }

    const onAcceptInvitation = async () => {
        toggleDisabled()
        const { success } = await updateInvitation({
            chat_id: item.id,
            status: 'accepted'
        })

        if (success) {
            toggleDisabled()
            setMessage('Has aceptado la solicitud')
        } else {
            toggleDisabled()
            await openToast(
                dispatch,
                'error',
                'Ha ocurrido un error.'
            )
        }
    }

    React.useEffect(() => {
        if (item?.created_at) {
            setDatetime(getDistanceInWords())

            const interval = setInterval(() => {
                setDatetime(getDistanceInWords())
            }, 5000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [])

    return (
        <Container onPress={handleNavigate} key={item.id}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Image source={item.participants[1].picture} />
                <View style={{
                    flex: 1,
                    flexDirection: 'column'
                }}>
                    <Text fontSize={18}>
                        {truncateString(chatName, 20)}
                    </Text>
                    <Row direction='row' size={2}>
                        {message ? (
                            <Text fontSize={16} fontWeight={400}>
                                {message}
                            </Text>
                        ) : (
                            <>
                                <StyledButton
                                    disabled={disabled}
                                    onPress={onAcceptInvitation}
                                >
                                    Confirmar
                                </StyledButton>
                                <StyledButton
                                    variant='outlined'
                                    color='secondary'
                                    disabled={disabled}
                                    onPress={onRejectInvitation}
                                >
                                    Rechazar
                                </StyledButton>
                            </>
                        )}
                    </Row>
                </View>
                <Text fontSize={16} fontWeight={400}>
                    {datetime}
                </Text>
            </View>
        </Container>
    )
}

export default ChatInvitation;
