import * as React from 'react'
import {
    Button,
    Row,
    SubthemePill,
    Text
} from '../../components';
import { Level } from '@approbado/lib/types/models'
import { useGame, setConfigs, setQuestions } from '@approbado/lib/contexts/GameContext';
import { getMaxTime } from '@approbado/lib/utils'
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import { Routes } from '../routes';
import { horizontalScale } from '../../styles/scaling';
import { useTheme } from 'styled-components';
import { listQuestions } from '@approbado/lib/services/questions.services';
import { listLevels } from '@approbado/lib/services/levels.services';
import { Scale } from 'lucide-react-native';
import SelectTypeButton from './components/SelectTypeButton';

const SelectTrivia = ({ navigation }) => {
    const theme = useTheme()
    const { state, dispatch } = useGame()
    const { formState, control, watch, handleSubmit } = useForm();
    const [levels, setLevels] = React.useState<[] | Level[]>([]);
    const triviaType = watch('type')

    const fetchLevels = React.useCallback(async () => {
        const { success, data } = await listLevels()

        if (success) {
            setLevels(data);
        }
    }, []);

    const onSubmit = async (values) => {
        const maxTime = getMaxTime(state.themes);
        const configs = {
            ...values,
            duration: maxTime
        }

        const { data: questions } = await listQuestions({
            filter: {
                options: true,
                level_id: levels.find((item: Level) => item.name === values.level).id,
                subthemes_ids: state.themes.map(({ id }) => id)
            }
        })

        setConfigs(dispatch, configs);
        setQuestions(dispatch, questions);
        navigation.navigate(Routes.TriviaRules)
    }

    React.useEffect(() => {
        fetchLevels()
    }, [])

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
            paddingHorizontal: horizontalScale(theme.space[3])
        }}>
            <Row size={1}>
                <Text fontSize={24}>
                    ¡Genial! Estas a punto de iniciar una trivia, elige el nivel de dificultad
                </Text>
            </Row>
            <Row size={1}>
                <Text fontSize={20}>
                    <Scale color='#000' size={24} />{' '}{state.trivia.name}
                </Text>
            </Row>
            <Row size={1}>
                <Text fontSize={20} fontWeight={400}>
                    Tema:
                </Text>
            </Row>
            <Row size={1} direction='row'>
                {state.themes.map(theme => <SubthemePill item={theme} />)}
            </Row>
            {levels ? (
                <Row size={1}>
                    <Text fontSize={20}>
                        Seleccione un nivel
                    </Text>
                    <SelectTypeButton
                        control={control}
                        name='level'
                        options={levels.map((item: Level) => item.name)}
                    />
                </Row>
            ) : null}
            <Row size={1}>
                <Text fontSize={20}>
                    Selecciona un tipo
                </Text>
                <SelectTypeButton
                    control={control}
                    name='type'
                    options={[
                        'Práctica', 'Reto'
                    ]}
                />
            </Row>
            <Row size={1}>
                {(triviaType == 'Reto') ? (
                    <Text fontSize={17} fontWeight={400}>
                        * Este tipo de trivia es calificatoria.
                        Responderás las preguntas y al finalizar podrás visualizar tu calificación y las respuestas
                    </Text>
                ) : null}
            </Row>
            <Row size={1}>
                <Button
                    disabled={!formState.isValid || formState.isSubmitting}
                    onPress={handleSubmit(onSubmit)}
                    isLoading={formState.isSubmitting}
                >
                    Comenzar
                </Button>
            </Row>
        </ScrollView>
    )
};

export default SelectTrivia
