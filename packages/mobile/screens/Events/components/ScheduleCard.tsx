import React from 'react';
import { Schedule } from '@approbado/lib/types/models'
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../routes';
import { Text, Row } from '../../../components';
import { MoreHorizontal } from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';
import { horizontalScale, verticalScale } from '../../../styles/scaling';
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import styled from 'styled-components/native';

const Dot = styled.View`
    height: 5px;
    width: 5px;
    background-color: #bbb;
    display: inline-block;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 50px;
`;

const Pressable = styled.Pressable`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
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
    openDrawerMenu?: () => void;
}

const ScheduleCard = ({ item, openDrawerMenu } : IScheduleCardProps ) : JSX.Element => {
    const navigation = useNavigation();

    const handleNavigate = () => navigation.navigate(Routes.ShowSchedule, {
        item: item
    })

    return (
        <Pressable onPress={handleNavigate} key={item.id} style={{
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.12,
            shadowRadius: 12,
            elevation: 6,
            borderLeftColor: item.level.color,
            borderLeftWidth: 6
        }} color={item.level.color}>
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
            </View>
            <TouchableOpacity>
                <MoreHorizontal
                    color='#000'
                    size={24}
                />
            </TouchableOpacity>
        </Pressable>
    )
}

export default ScheduleCard;
