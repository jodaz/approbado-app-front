import * as React from 'react'
import {
    Row,
    Button,
    Container,
    Text
} from '../../components';
import { FlatList, View } from 'react-native';
import { listSchedules } from '@approbado/lib/services/schedules.services'
import { Routes } from '../routes';
import TitleBar from '../../components/TitleBar';
import NoSchedules from './components/NoSchedules';
import ScheduleCard from './components/ScheduleCard';

const ListEvents = ({ data }) => (
    <FlatList
        data={data}
        renderItem={({ item }) => <ScheduleCard item={item} />}
    />
)

const Events = ({ navigation }) => {
    const [schedules, setSchedules] = React.useState(null);

    const fetchSchedules = React.useCallback(async () => {
        const { success, data } = await listSchedules()

        if (success) {
            setSchedules(data);
        }
    }, []);

    React.useEffect(() => { fetchSchedules() }, [])

    return (
        <Container>
            <TitleBar>
                <Text fontSize={18} fontWeight={600}>
                    Eventos
                </Text>
            </TitleBar>
            <View>
                {!schedules ? <NoSchedules /> : <ListEvents data={schedules} />}
            </View>
            <Row>
                <Button onPress={() => navigation.navigate(Routes.CreateEvent)}>
                    Crear nuevo evento
                </Button>
            </Row>
        </Container>
    );
}

export default Events
