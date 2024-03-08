import * as React from 'react'
import { Button, Container, Image, LoadingScreen, Row, Text, TitleBar } from '../../../components';
import { getNotification } from '@approbado/lib/services/notifications.services'
import { Notification } from '@approbado/lib/types/models'
import RenderHTML from 'react-native-render-html';
import { scaleFontSize } from '../../../styles/scaling';

const ShowNotification = ({ route }) => {
    const notification = route.params.item
    const [data, setData] = React.useState(null)

    const fetchNotification = React.useCallback(async () => {
        const { success, data } = await getNotification(notification.id)

        if (success) {
            setData(data);
        }
    }, []);

    React.useEffect(() => { fetchNotification() }, [])

    if (!data) return <LoadingScreen />

    return (
        <Container>
            <Row>
                <TitleBar>
                    <Text>
                        Ver notificación
                    </Text>
                </TitleBar>
            </Row>
            <Row size={4} align='center'>
                <Image source={notification.user.picture} />
            </Row>
            <Row size={4} align='center'>
                <RenderHTML
                    source={{ html: data.long_data ? data.long_data : data.data }}
                    baseStyle={{
                        fontSize: scaleFontSize(20),
                        textAlign: 'center',
                        width: 300
                    }}
                    contentWidth={200}
                />
            </Row>
            <Row align='center'>
                <Button fullWidth>
                    Aceptar
                </Button>
            </Row>
            <Row align='center'>
                <Button variant='outlined' fullWidth>
                    Rechazar
                </Button>
            </Row>
        </Container>
    )
}

export default ShowNotification
