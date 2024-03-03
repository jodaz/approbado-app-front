import * as React from 'react'
import { Button, Row } from "../../../components";
import { useNavigation } from '@react-navigation/native';
import { BookOpen, Users, Timer } from 'lucide-react-native';
import { useForm } from 'react-hook-form';
import { Routes } from '../../routes';
import QuickTriviaSelector from './QuickTriviaSelector';
import styled from "styled-components/native";
import BroGaming from '@approbado/lib/illustrations/BroGaming.svg'
import { useGame, setTimer } from '@approbado/lib/contexts/GameContext';
import TriviaMode from "./TriviaMode";

const Container = styled.View`
    align-items: center;
    width: 100%;
`

const options = [
    {
        label: 'Trivia rápida',
        value: 'Rápida',
        icon: <Timer />
    },
    {
        label: 'Trivia por tema',
        value: 'Tema',
        icon: <BookOpen />
    },
    {
        label: 'Trivia grupal',
        value: 'Grupal',
        icon: <Users />
    }
]

const QuickTrivia = () => {
    const navigation = useNavigation();
    const { control, handleSubmit, reset, formState: { isDirty } } = useForm()
    const { dispatch } = useGame()
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleModal = () => setIsOpen(!isOpen);

    const onSubmit = ({ selected }) => {
        if (selected == 'Grupal') {
            navigation.navigate(Routes.CreateEvent)
        }
        if (selected == 'Rápida') {
            setTimer(dispatch, true)
            navigation.navigate(Routes.Game, {
                timer: true
            })
        }
        if (selected == 'Tema') {
            setTimer(dispatch, false)
            navigation.navigate(Routes.Game)
        }
    }

    React.useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen])

    return (
        <Container>
            <Row size={1} align="center">
                <BroGaming />
            </Row>
            <Row size={1} align="center">
                <Button onPress={toggleModal} fullWidth>
                    Trivia rápida
                </Button>
            </Row>
            <TriviaMode
                isOpen={isOpen}
                handleClose={() => toggleModal()}
            >
                <QuickTriviaSelector
                    control={control}
                    options={options}
                    name='selected'
                />
                <Row size={2}>
                    <Button
                        disabled={!isDirty}
                        onPress={handleSubmit(onSubmit)}
                        fullWidth
                    >
                        Siguiente
                    </Button>
                </Row>
            </TriviaMode>
        </Container>
    )
}

export default QuickTrivia
