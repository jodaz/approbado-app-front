import * as React from 'react'
import {
    Row,
    Button,
    SelectInput,
    MultiSelectInput,
    Text,
    Image,
    ScrollViewContainer
} from '../../../components';
import { REQUIRED_FIELD } from '@approbado/lib/utils/validations'
import { listTrivias } from '@approbado/lib/services/trivias.services'
import { listUsers } from '@approbado/lib/services/users.services'
import { listLevels } from '@approbado/lib/services/levels.services'
import { listSubthemes } from '@approbado/lib/services/subthemes.services'
import { Routes } from '../../routes';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { Layers, Lightbulb, Scale } from 'lucide-react-native';
import SelectLevelInput from '../components/SelectLevelInput';
import SelectThemeInput from '../components/SelectThemeInput';
import SelectTriviaInput from '../components/SelectTriviaInput';
import SelectParticipantsInput from '../components/SelectParticipantsInput';

const StepTwo = ({ navigation, route }) => {
    const [trivias, setTrivias] = React.useState(null)
    const [users, setUsers] = React.useState(null)
    const [levels, setLevels] = React.useState(null)
    const [subthemes, setSubthemes] = React.useState(null)
    const { control, handleSubmit, formState } = useForm();

    const onSubmit = async (values) => {
        await navigation.navigate(Routes.CreateEventStepThree, {
            data: {
                ...values,
                ...route.params.data
            }
        })
    }

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
        <ScrollViewContainer>
            <SelectParticipantsInput control={control} />
            <SelectTriviaInput control={control} />
            <SelectLevelInput control={control} />
            <SelectThemeInput control={control} />
            <Row>
                <Button
                    disabled={!formState?.isValid}
                    onPress={handleSubmit(onSubmit)}
                >
                    Agendar una reunión
                </Button>
            </Row>
            <Row>
                <Button variant='outlined' onPress={() => navigation.goBack()}>
                    Regresar
                </Button>
            </Row>
        </ScrollViewContainer>
    );
}

export default StepTwo
