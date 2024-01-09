import * as React from 'react'
import { Container, LoadingScreen, Row, Text, TitleBar } from '../../../components';
import { getSchedule } from '@approbado/lib/services/schedules.services'
import ScheduleCard from '../components/ScheduleCard';
import truncateString from '@approbado/lib/utils/truncateString'
import { Linking } from 'react-native';

const EventInfoItem = ({ title, data }) => (
    <Row>
        <Text color='info' variant='light'>
            {title}
        </Text>
        <Text>
            {data}
        </Text>
    </Row>
)

const ShowSchedule = ({ route }) => {
    const schedule = route.params.item
    const [data, setData] = React.useState(null)

    const fetchSchedules = React.useCallback(async () => {
        const { success, data } = await getSchedule(schedule.id)

        if (success) {
            setData(data);
        }
    }, []);

    React.useEffect(() => { fetchSchedules() }, [])

    if (!data) return <LoadingScreen />

    return (
        <Container>
            <Row>
                <TitleBar>
                    <Text>
                        Ver evento
                    </Text>
                </TitleBar>
            </Row>
            <ScheduleCard
                item={data}
                accessTrivia
            />
            <EventInfoItem
                title='Título'
                data={data.title}
            />
            <EventInfoItem
                title='Trivia'
                data={data.trivia.name}
            />
            <EventInfoItem
                title='Nivel'
                data={data.level.name}
            />
            <EventInfoItem
                title='Tema'
                data={data.subtheme.name}
            />
            {data?.share_link ? (
                <Row>
                    <Text color='info' variant='light'>
                        Enlace
                    </Text>
                    <Text
                        fontWeight={600}
                        decoration='underline'
                        color='info'
                        variant="main"
                        onPress={() => Linking.openURL(data?.share_link)}
                    >
                        {truncateString(data?.share_link, 20)}
                    </Text>
                </Row>
            ) : null}
            {data?.description ? (
                <Row>
                    <Text color='info' variant='light'>
                        Descripción
                    </Text>
                    <Text fontWeight={400}>
                        {data.description}
                    </Text>
                </Row>
            ) : null}
        </Container>
    )
}

export default ShowSchedule
