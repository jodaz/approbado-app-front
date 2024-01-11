import React from 'react';
import { Schedule } from '@approbado/lib/types/models'
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../routes';
import { Text, Row, Button, DrawerButton } from '../../../components';
import { Edit2, MoreHorizontal, Trash2 } from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';
import { horizontalScale, verticalScale } from '../../../styles/scaling';
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import styled from 'styled-components/native';
import { useBottomSheet } from '../../../contexts/BottomSheetContext';

const Dot = styled.View`
    height: 5px;
    width: 5px;
    background-color: #bbb;
    display: inline-block;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 50px;
`;

const StyledCard = styled.TouchableOpacity`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    height: fit-content;
    background: #fff;
    padding-vertical: ${props => verticalScale(props.theme.space[3])}px;
    padding-horizontal: ${props => horizontalScale(props.theme.space[2])}px;
    margin-vertical: ${props => verticalScale(props.theme.space[1])}px;
    border-radius: 6px;
    width: 100%;
    border-left-width: 6px;
    border-color: ${props => props.color};
`

interface IScheduleCardProps {
    item: Schedule;
    accessTrivia?: boolean;
}

const ScheduleCard = ({ item, accessTrivia } : IScheduleCardProps ) : JSX.Element => {
    const navigation = useNavigation();
    const bottomSheet = useBottomSheet()

    const handleNavigate = () => navigation.navigate(Routes.ShowSchedule, {
        item: item
    })

    const handleEdit = () => {
        navigation.navigate(Routes.EditSchedule, {
            item: item
        })
        bottomSheet.collapse()
    }

    const handleDelete = () => {
        navigation.navigate(Routes.EditSchedule, {
            item: item
        })
        bottomSheet.collapse()
    }

    const content = () => (
        <View style={{
            paddingHorizontal: horizontalScale(20)
        }}>
            <DrawerButton icon={<Edit2 />} onPress={handleEdit}>
                Editar
            </DrawerButton>
            <DrawerButton icon={<Trash2 />} onPress={handleDelete}>
                Eliminar
            </DrawerButton>
        </View>
    )

    const showOptions = () => bottomSheet.expand({
        renderContent: () => content
    });

    return (
        <StyledCard key={item.id} style={{
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.12,
            shadowRadius: 12,
            elevation: 6,
            borderLeftColor: item.level.color,
            borderLeftWidth: 6,
        }} color={item.level.color} onPress={handleNavigate}>
            <View style={{
                flex: 1,
                flexDirection: 'column',
                height: '100%'
            }}>
                <Row size={1}>
                    <Text>
                        {item.title}
                    </Text>
                </Row>
                <Row
                    size={1}
                    style={{ marginVertical: 'none' }}
                    direction='row'
                    align='center'
                >
                    <Text fontWeight={400} fontSize={18}>
                        {format(new Date(item.starts_at), 'eee. d, MMMM', { locale: es }).toUpperCase()}
                    </Text>
                    <Dot />
                    <Text fontWeight={400} fontSize={18}>
                        {format(new Date(item.starts_at), 'p')}
                    </Text>
                </Row>
                {accessTrivia ? (
                    <Row>
                        <Button onPress={() => navigation.navigate(Routes.Game, {
                            item: item
                        })}>
                            Ingresar
                        </Button>
                    </Row>
                ) : null}
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

export default ScheduleCard;
