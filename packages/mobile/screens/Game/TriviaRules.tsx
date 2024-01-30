import * as React from 'react'
import {
    Button,
    Container,
    Row,
    Text
} from '../../components';
import {
    Clock,
    Layers,
    PlusCircle
} from 'lucide-react-native';
import ClockIllustration from '@approbado/lib/illustrations/Clock.svg'
import { ScrollView } from 'react-native'
import AddFriendsModal from './components/AddFriendsModal';
import { useForm } from 'react-hook-form';

const TriviaRules = props => {
    const { control } = useForm();

    return (
        <Container>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Row size={3} align='center' direction='row' justify='center'>
                    <ClockIllustration />
                </Row>
                <Row size={1}>
                    <Text align='center' fontSize={24} fontWeight={700}>
                        Antes de comenzar
                    </Text>
                </Row>
                <Row size={1} direction='row'>
                    <Layers size={24} color='#000' style={{ marginRight: 10 }} />
                    <Text align='left' fontSize={20}>
                        Responde y demuestra lo que sabes
                    </Text>
                </Row>
                <Row size={1} direction='row'>
                    <Layers size={24} color='#000' style={{ marginRight: 10 }} />
                    <Text align='left' fontSize={20}>
                        La trivia consta de 16 preguntas
                    </Text>
                </Row>
                <Row size={1} direction='row'>
                    <PlusCircle size={24} color='#000' style={{ marginRight: 10 }} />
                    <AddFriendsModal
                        control={control}
                    />
                </Row>
                <Row size={1} direction='row'>
                    <Clock size={24} color='#000' style={{ marginRight: 10 }} />
                    <Text align='left' fontSize={20}>
                        Tiempo: 24 minutos
                    </Text>
                </Row>
                <Row size={1}>
                    <Button>
                        Comenzar
                    </Button>
                </Row>
                <Row size={1}>
                    <Button variant='outlined'>
                        Salir
                    </Button>
                </Row>
            </ScrollView>
        </Container>
    )
}

export default TriviaRules
