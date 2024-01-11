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
import SelectTriviaInput from '../components/SelectTriviaInput';
import SelectLevelInput from '../components/SelectLevelInput';
import SelectThemeInput from '../components/SelectThemeInput';

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
            <SelectTriviaInput control={control} />
            <SelectLevelInput control={control} />
            <SelectThemeInput control={control} />
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
