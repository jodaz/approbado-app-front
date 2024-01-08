import * as React from 'react'
import {
    Row,
    Button,
    TextInput,
    SelectInput
} from '../../../components';
import { listTrivias } from '@approbado/lib/services/trivias.services'
import { listLevels } from '@approbado/lib/services/levels.services'
import { listSubthemes } from '@approbado/lib/services/subthemes.services'
import { Routes } from '../../routes';
import { ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';

const StepTwo = ({ navigation }) => {
    const [trivias, setTrivias] = React.useState(null)
    const [levels, setLevels] = React.useState(null)
    const [subthemes, setSubthemes] = React.useState(null)
    const { control, handleSubmit, formState } = useForm();

    const fetchTrivias = React.useCallback(async () => {
        const { success, data } = await listTrivias()

        if (success) {
            setTrivias(data);
        }
    }, []);

    const fetchSubthemes = React.useCallback(async () => {
        const { success, data } = await listSubthemes()

        if (success) {
            setSubthemes(data);
        }
    }, []);

    const fetchLevels = React.useCallback(async () => {
        const { success, data } = await listLevels()

        if (success) {
            setLevels(data);
        }
    }, []);

    React.useEffect(() => {
        fetchLevels()
        fetchSubthemes()
        fetchTrivias()
    }, [])

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
                {trivias ? (
                    <SelectInput
                        label='Trivia'
                        name='trivias_ids'
                        control={control}
                        placeholder='Seleccione un tema'
                        options={trivias}
                        labelField='name'
                        valueField='id'
                    />
                ) : null}
            </Row>
            <Row>
                {levels ? (
                    <SelectInput
                        label='Trivia'
                        name='levels_ids'
                        control={control}
                        placeholder='Seleccione un nivel'
                        options={levels}
                        labelField='name'
                        valueField='id'
                    />
                ) : null}
            </Row>
            <Row>
                {subthemes ? (
                    <SelectInput
                        label='Tema'
                        name='subthemes_ids'
                        control={control}
                        placeholder='Seleccione un tema'
                        options={subthemes}
                        labelField='name'
                        valueField='id'
                    />
                ) : null}
            </Row>
            <Row>
                <Button onPress={() => navigation.navigate(Routes.CreateEventStepThree)}>
                    Agendar una reunión
                </Button>
            </Row>
            <Row>
                <Button variant='outlined' onPress={() => navigation.goBack()}>
                    Regresar
                </Button>
            </Row>
        </ScrollView>
    );
}

export default StepTwo
