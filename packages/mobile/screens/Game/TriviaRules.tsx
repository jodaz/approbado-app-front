import * as React from 'react'
import {
    Button,
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
import { useGame, resetGame } from '@approbado/lib/contexts/GameContext';
import { horizontalScale } from '../../styles/scaling';
import { Routes } from '../routes';

const TriviaRules = ({ navigation }) => {
    const { state, dispatch } = useGame()
    const { formState, control, watch, handleSubmit } = useForm();

    const onSubmit = async (values) => {
        navigation.navigate(Routes.Play)
    }

    const onDiscard = async () => {
        resetGame(dispatch)
        navigation.navigate(Routes.ListTrivias)
    }

    return (
        <ScrollView contentContainerStyle={{
            paddingHorizontal: horizontalScale(16)
        }}>
            <Row size={3} align='center' direction='row' justify='center'>
                <ClockIllustration />
            </Row>
            <Row size={1}>
                <Text align='center' fontSize={24} fontWeight={700}>
                    Antes de comenzar
                </Text>
            </Row>
            {/* <Row size={1} direction='row'>
                <Layers size={24} color='#000' style={{ marginRight: 10 }} />
                <Text align='left' fontSize={20}>
                    Responde y demuestra lo que sabes
                </Text>
            </Row> */}
            <Row size={1} direction='row'>
                <Layers size={24} color='#000' style={{ marginRight: 10 }} />
                <Text align='left' fontSize={20}>
                    La trivia consta de {state.questions.length} preguntas
                </Text>
            </Row>
            {/* <Row size={1} direction='row'>
                <PlusCircle size={24} color='#000' style={{ marginRight: 10 }} />
                <AddFriendsModal
                    control={control}
                />
            </Row> */}
            <Row size={1} direction='row'>
                <Clock size={24} color='#000' style={{ marginRight: 10 }} />
                <Text align='left' fontSize={20}>
                    Tiempo: {state.duration} minutos
                </Text>
            </Row>
            <Row size={1}>
                <Button onPress={handleSubmit(onSubmit)}>
                    Comenzar
                </Button>
            </Row>
            <Row size={1}>
                <Button variant='outlined' onPress={onDiscard}>
                    Salir
                </Button>
            </Row>
        </ScrollView>
    )
}

export default TriviaRules
