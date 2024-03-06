import * as React from 'react'
import {
    Row,
    Button,
    ScrollViewContainer
} from '../../../components';
import { Routes } from '../../routes';
import { useForm } from 'react-hook-form';
import SelectLevelInput from '../components/SelectLevelInput';
import SelectThemeInput from '../components/SelectThemeInput';
import SelectTriviaInput from '../components/SelectTriviaInput';
import SelectParticipantsInput from '../components/SelectParticipantsInput';

const StepTwo = ({ navigation, route }) => {
    const { control, handleSubmit, formState, watch } = useForm();
    const triviaID = watch('trivia_id')

    const onSubmit = async (values) => {
        await navigation.navigate(Routes.CreateEventStepThree, {
            data: {
                ...values,
                ...route.params.data
            }
        })
    }

    return (
        <ScrollViewContainer>
            <SelectParticipantsInput control={control} />
            <SelectTriviaInput control={control} />
            <SelectLevelInput control={control} />
            <SelectThemeInput control={control} trivia_id={triviaID} />
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
