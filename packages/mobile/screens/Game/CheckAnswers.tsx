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
import styled, { useTheme } from 'styled-components';
import { horizontalScale, verticalScale } from '../../styles/scaling';
import { Routes } from '../routes';
import { useGame } from '@approbado/lib/contexts/GameContext';
import Logotipo from '@approbado/lib/illustrations/Logotipo.svg'
import Stage1 from '@approbado/lib/illustrations/Stage1.svg'

const question = {
    "id": 1,
    "num": null,
    "description": "La respuesta a esta pregunta es la dos",
    "explanation": "La respuesta correcta es la dos",
    "explanation_type": false,
    "subtheme_id": null,
    "level_id": 1,
    "trivia_id": null,
    "file_id": 1,
    "created_at": "2023-12-29T19:43:13.655Z",
    "updated_at": null,
    "options": [
        {
            "id": 1,
            "statement": "Opcion 1",
            "is_right": false,
            "question_id": 1,
            "created_at": "2023-12-29T19:43:13.676Z",
            "updated_at": null
        },
        {
            "id": 2,
            "statement": "Opcion 2",
            "is_right": true,
            "question_id": 1,
            "created_at": "2023-12-29T19:43:13.676Z",
            "updated_at": null
        },
        {
            "id": 3,
            "statement": "Opcion 3",
            "is_right": false,
            "question_id": 1,
            "created_at": "2023-12-29T19:43:13.676Z",
            "updated_at": null
        }
    ]
}

const StyledPoints = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-vertical: ${props => props.theme.space[4]}px;
    margin-horizontal: ${props => props.theme.space[1]}px;
    border-radius: 6px;
    background-color: ${props => props.secondary ? '#ECEDF0' : '#2280ED'};
    height: ${verticalScale(100)}px;
    flex: 1;
`

const CheckAnswers = ({ navigation }) => {
    const theme = useTheme();
    const { state: {
        questions,
        currQuestion: current,
        duration,
        type
    }, dispatch } = useGame()

    return (
        <View style={{
            flex: 1
        }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
                paddingHorizontal: horizontalScale(theme.space[3])
            }}>
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
                </Row>
                <Row direction='row'>
                    <Text fontWeight={700} fontSize={24} align='center'>
                        Excelente trivia!
                    </Text>
                </Row>
                <Row align='center' direction='row'>
                    <Text fontWeight={700} fontSize={24} align='center'>
                        Estás {' '}
                    </Text>
                    <Logotipo />
                </Row>
                <Row align='center' direction='row'>
                    <StyledPoints secondary>
                        <Text fontSize={24} color='info' variant='main'>
                            16/16
                        </Text>
                        <Text fontSize={20} color='info' variant='main'>
                            Aciertos
                        </Text>
                    </StyledPoints>
                    <StyledPoints>
                        <Text fontSize={24} color='primary' variant='light'>
                            10
                        </Text>
                        <Text fontSize={20} color='primary' variant='light'>
                            Ptos. ganados
                        </Text>
                    </StyledPoints>
                </Row>
                <Row align='center' direction='row'>
                    <Text
                        fontSize={20}
                        decoration='underline'
                        color='info'
                        variant='main'
                    >
                        Ver respuestas
                    </Text>
                </Row>
                <Row size={1}>
                    <Button onPress={() => navigation.navigate(Routes.ListTrivias)}>
                        Ver más trivias
                    </Button>
                </Row>
                <Row size={1}>
                    <Button
                        bgvariant='secondary'
                        variant='outlined'
                        fontWeight={400}
                        onPress={() => navigation.navigate(Routes.ListTrivias)}
                    >
                        Salir
                    </Button>
                </Row>
            </ScrollView>
        </View>
    )
}

export default CheckAnswers
