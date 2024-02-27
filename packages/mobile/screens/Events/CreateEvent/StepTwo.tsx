import * as React from 'react'
import {
    Row,
    Button,
    SelectInput,
    MultiSelectInput,
    Text,
    Image
} from '../../../components';
import { listTrivias } from '@approbado/lib/services/trivias.services'
import { listUsers } from '@approbado/lib/services/users.services'
import { listLevels } from '@approbado/lib/services/levels.services'
import { listSubthemes } from '@approbado/lib/services/subthemes.services'
import { Routes } from '../../routes';
import { ScrollView, View } from 'react-native';
import { useForm } from 'react-hook-form';
import { Layers, Lightbulb, Scale } from 'lucide-react-native';

const StepTwo = ({ navigation }) => {
    const [trivias, setTrivias] = React.useState(null)
    const [users, setUsers] = React.useState(null)
    const [levels, setLevels] = React.useState(null)
    const [subthemes, setSubthemes] = React.useState(null)
    const { control, handleSubmit, formState } = useForm();

    const renderItem = item => {
        return (
            <View style={{
                flexDirection: 'row'
            }}>
                <Image source={item.picture} />
                <View style={{ flex: 1 }}>
                    <Text fontSize={18}>
                        {item.user_name}
                    </Text>
                    <Text fontSize={16} variant='secondary'>
                        {item.email}
                    </Text>
                </View>
            </View>
        );
    };

    const fetchTrivias = React.useCallback(async () => {
        const { success, data } = await listTrivias()

        if (success) {
            setTrivias(data);
        }
    }, []);

    const fetchUsers = React.useCallback(async () => {
        const { success, data } = await listUsers({
            filter: {
                rol: 'user',
                notCurrent: true
            }
        })

        if (success) {
            setUsers(data);
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
        fetchUsers()
        fetchLevels()
        fetchSubthemes()
        fetchTrivias()
    }, [])

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Row>
                {users ? (
                    <MultiSelectInput
                        label='Participantes'
                        name='users_ids'
                        control={control}
                        placeholder='Seleccione un usuario'
                        options={users}
                        labelField='user_name'
                        valueField='id'
                        renderItem={renderItem}
                    />
                ) : null}
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
