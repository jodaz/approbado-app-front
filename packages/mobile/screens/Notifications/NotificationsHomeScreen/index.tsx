import * as React from 'react'
import { Container, LoadingScreen, Row, Text, TitleBar } from '../../../components';
import { listNotifications } from '@approbado/lib/services/notifications.services'
import { FlatList, View } from 'react-native';
import NoNotifications from '../components/NoNotifications';
import NotificationCard from '../components/NotificationCard';

const ListNotifications = ({ data, refresh }) => (
    <FlatList
        data={data}
        renderItem={({ item }) => (
            <NotificationCard
                item={item}
                refresh={() => refresh(item)}
            />
        )}
        showsVerticalScrollIndicator={false}
    />
)

const NotificationsHomeScreen = ({ route }) => {
    const [data, setData] = React.useState(null)

    const fetchNotifications = React.useCallback(async () => {
        const { success, data } = await listNotifications()

        if (success) {
            console.log(JSON.stringify(data, null, ' '))
            setData(data);
        }
    }, []);

    const deleteItem = (item) => {
        const filteredItems = data.filter((i) => i.id != item.id)

        setData(filteredItems)
    }

    React.useEffect(() => { fetchNotifications() }, [])

    // if () {
    //     return (
    //         <View style={{
    //             height: 300
    //         }}>
    //             <NoNotifications />
    //         </View>
    //     )
    // }

    if (!data) {
        return (
            <LoadingScreen />
        )
    }

    return (
        <Container>
            <Row>
                <TitleBar>
                    <Text>
                        Notificaciones
                    </Text>
                </TitleBar>
            </Row>
            <View>
                {!data.length
                    ? <NoNotifications />
                    : <ListNotifications data={data} refresh={deleteItem} />
                }
            </View>
        </Container>
    )
}

export default NotificationsHomeScreen
