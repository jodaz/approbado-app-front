import * as React from 'react'
import {
    Row,
    Button,
    LoadingScreen
} from '../../components';
import { FlatList, View } from 'react-native';
import { listSchedules } from '@approbado/lib/services/schedules.services'
import { Routes } from '../routes';
import NoSchedules from './components/NoSchedules';
import ScheduleCard from './components/ScheduleCard';
import { horizontalScale } from '../../styles/scaling';
import { useIsFocused } from '@react-navigation/native';

const ListEvents = ({ data }) => (
    <FlatList
        data={data}
        renderItem={({ item }) => <ScheduleCard item={item} />}
        showsVerticalScrollIndicator={false}
    />
)

const Events = ({ navigation }) => {
    const [schedules, setSchedules] = React.useState(null);
    const isFocused = useIsFocused();

    const fetchSchedules = React.useCallback(async () => {
        const { success, data } = await listSchedules()

        if (success) {
            setSchedules(data);
        }
    }, []);

    React.useEffect(() => { fetchSchedules() }, [isFocused])

    if (!schedules) return <LoadingScreen />

    return (
        <View style={{
            paddingHorizontal: horizontalScale(10)
        }}>
            <View>
                {!schedules.length ? <NoSchedules /> : <ListEvents data={schedules} />}
            </View>
            <Row>
                <Button onPress={() => navigation.navigate(Routes.CreateEvent)}>
                    Crear nuevo evento
                </Button>
            </Row>
        </View>
    );
}

export default Events
