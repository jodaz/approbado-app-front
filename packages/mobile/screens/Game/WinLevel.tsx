import * as React from 'react'
import {
    Button,
    Container,
    Row,
    Text
} from '../../components';
import {
    Scale
} from 'lucide-react-native';
import { ScrollView, View } from 'react-native'
import Logotipo from '@approbado/lib/illustrations/Logotipo.svg'
import Stage1 from '@approbado/lib/illustrations/Stage1.svg'

const WinLevel = props => {

    return (
        <View style={{
            flex: 1
        }}>
            <Container>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Row size={3} align='center' direction='row' justify='space-between'>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Scale size={24} color='#000' />
                            <Text align='center'>
                                {' '} Derecho laboral
                            </Text>
                        </View>
                    </Row>
                    <Row size={4} justify='center' align='center'>
                        <Stage1 />
                        <Logotipo />
                    </Row>
                    <Row>
                        <Text fontWeight={700} align='center'>
                            ¡Felicitaciones!
                        </Text>
                    </Row>
                    <Row>
                        <Text fontWeight={700} align='center'>
                            Haz alcanzado el nivel Approbado Oro
                        </Text>
                    </Row>
                    <Row size={1}>
                        <Button onPress={() => console.log("saltar")} >
                            Ver resultados
                        </Button>
                    </Row>
                </ScrollView>
            </Container>
        </View>
    )
}

export default WinLevel
