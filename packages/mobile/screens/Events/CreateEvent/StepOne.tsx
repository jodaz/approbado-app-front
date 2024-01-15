import * as React from 'react'
import {
    Row,
    Button,
    Container,
    Text,
    TextInput
} from '../../../components';
import { Routes } from '../../routes';
import { ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import TitleBar from '../../../components/TitleBar';
import { horizontalScale, verticalScale } from '../../../styles/scaling';

const StepOne = ({ navigation, ...restProps }) => {
    const { control, handleSubmit, formState } = useForm();
    const [showPicker, setShowPicker] = React.useState(false);
    const [date, setDate] = React.useState(new Date());

    const togglePicker = () => setShowPicker(!showPicker)

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Row>
                <TextInput
                    control={control}
                    name='title'
                    placeholder='Ingresar un título'
                />
            </Row>
            <Row>

                <TextInput
                    control={control}
                    name='date'
                    placeholder='DD/MM'
                />
            </Row>
            <Row>
                <TextInput
                    control={control}
                    name='description'
                    placeholder='Añadir descripción'
                    multiline
                    numberOfLines={8}
                    editable
                />
            </Row>
            <Row>
                <Button onPress={() => navigation.navigate(Routes.CreateEventStepTwo)}>
                    Añadir amigos
                </Button>
            </Row>
            <Row>
                <Button variant='outlined' onPress={() => navigation.goBack()}>
                    Descartar
                </Button>
            </Row>
        </ScrollView>
    );
}

export default StepOne
