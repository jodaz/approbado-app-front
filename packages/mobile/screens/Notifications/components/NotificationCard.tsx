import React from 'react';
import { Notification } from '@approbado/lib/types/models'
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../routes';
import { Text, Row, DrawerButton } from '../../../components';
import { MoreHorizontal, Trash2 } from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';
import { horizontalScale, verticalScale } from '../../../styles/scaling';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale'
import { useBottomSheet } from '../../../contexts/BottomSheetContext';
import { deleteNotification } from '@approbado/lib/services/notifications.services'
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext';
import styled from 'styled-components/native';
import RenderHtml from 'react-native-render-html';

const StyledCard = styled.TouchableOpacity`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    height: fit-content;
    padding-vertical: ${props => verticalScale(props.theme.space[3])}px;
    padding-horizontal: ${props => horizontalScale(props.theme.space[2])}px;
    margin-vertical: ${props => verticalScale(props.theme.space[1])}px;
    border-color: ${props => props.theme.palette.secondary.light};
    width: 100%;
    border-bottom-width: 1px;
`

interface INotificationCardProps {
    item: Notification;
    refresh: () => void;
}

const NotificationCard = ({ item, refresh } : INotificationCardProps ) : JSX.Element => {
    const navigation = useNavigation();
    const bottomSheet = useBottomSheet()
    const { dispatch } = useToast();

    const handleNavigate = () => navigation.navigate(Routes.ShowNotification, {
        item: item
    })

    const handleDelete = async () => {
        const { success } = await deleteNotification(item.id);

        if (success) {
            refresh();
            bottomSheet.collapse()
        } else {
            await openToast(
                dispatch,
                'error',
                'Ha ocurrido un error.'
            )
        }
    }

    const content = () => (
        <View style={{
            paddingHorizontal: horizontalScale(20)
        }}>
            <DrawerButton icon={<Trash2 />} onPress={handleDelete}>
                Eliminar notificación
            </DrawerButton>
        </View>
    )

    const showOptions = () => bottomSheet.expand({
        renderContent: () => content
    });

    return (
        <StyledCard key={item.id} onPress={handleNavigate}>
            <View style={{
                flex: 1,
                flexDirection: 'column',
                height: '100%'
            }}>
                <Row size={1} style={{
                    width: 200
                }}>
                    <Text>
                        <RenderHtml
                            source={{ html: item.data }}
                            baseStyle={{
                                fontSize: 18
                            }}
                            contentWidth={100}
                        />
                    </Text>
                </Row>
                <Row
                    size={1}
                    style={{ marginVertical: 'none' }}
                    direction='row'
                    align='center'
                >
                    <Text fontWeight={400} fontSize={16}>
                        Hace
                        {' '}
                        {formatDistanceToNow(
                            parseISO(item.created_at), {
                            addSuffix: false, locale: es
                        })}
                    </Text>
                </Row>
                <TouchableOpacity style={{
                    position: 'absolute',
                    top: 10,
                    right: 10
                }} onPress={showOptions}>
                    <MoreHorizontal
                        color='#000'
                        size={24}
                    />
                </TouchableOpacity>
            </View>
        </StyledCard>
    )
}

export default NotificationCard;
