import * as React from 'react'
import { Button, Row } from "../../../components";
import { useNavigation } from '@react-navigation/native';
import { BookOpen, Users, Timer } from 'lucide-react-native';
import { useForm } from 'react-hook-form';
import { Routes } from '../../routes';
import QuickTriviaSelector from './QuickTriviaSelector';
import styled from "styled-components/native";
import BroGaming from '@approbado/lib/illustrations/BroGaming.svg'
import TriviaMode from "./TriviaMode";

const Container = styled.View`
    align-items: center;
    width: 100%;
`

const options = [
    {
        label: 'Trivia rápida',
        value: Routes.QuickTrivia,
        icon: <Timer />
    },
    {
        label: 'Trivia por tema',
        value: Routes.Game,
        icon: <BookOpen />
    },
    {
        label: 'Trivia grupal',
        value: Routes.ScheduleGame,
        icon: <Users />
    }
]

const QuickTrivia = () => {
    const navigation = useNavigation();
    const { control, handleSubmit, reset, formState: { isDirty } } = useForm()
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleModal = () => setIsOpen(!isOpen);

    const onSubmit = ({ selected }) => {
        navigation.navigate(selected)
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
