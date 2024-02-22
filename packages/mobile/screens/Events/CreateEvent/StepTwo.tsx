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
import { Layers, Lightbulb, Scale } from 'lucide-react-native';

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
                {trivias ? (
                    <SelectInput
                        label='Trivia'
                        name='trivias_ids'
                        control={control}
                        placeholder='Seleccione un tema'
                        options={trivias}
                        labelField='name'
                        valueField='id'
                        icon={<Scale />}
                    />
                ) : null}
            </Row>
            <Row>
                {levels ? (
                    <SelectInput
                        label='Nivel'
                        name='levels_ids'
                        control={control}
                        placeholder='Seleccione un nivel'
                        options={levels}
                        labelField='name'
                        valueField='id'
                        icon={<Lightbulb />}
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
                        icon={<Layers />}
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
