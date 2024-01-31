import * as React from 'react'
import {
    Button,
    Container,
    RadioButton,
    Row,
    Text
} from '../../components';
import {
    Timer
} from 'lucide-react-native';
import { ScrollView, View, Image } from 'react-native'
import { useForm } from 'react-hook-form';
import { sendAnswer } from '@approbado/lib/services/answers.services'
import { horizontalScale, verticalScale } from '../../styles/scaling';
import { useGame, setAnswer, nextQuestion } from '@approbado/lib/contexts/GameContext';
import { Routes } from '../routes';
import AnswerAlert from './components/AnswerAlert';
import CountdownFormat from '@approbado/lib/components/CountdownFormat'

const User = {
    image: require('../../assets/user.jpeg'),
    fullName: "Federico"
}

const UserImage = ({ user, size = 50, style }) => (
    <Image source={user.image} style={{
        borderRadius: 50,
        height: verticalScale(size),
        width: verticalScale(size),
        ...style
    }} />
)

const CountdownTimer = ({ seconds } : { seconds: number }) => {
    const [count, setCount] = React.useState(seconds * 60);

    React.useEffect(() => {
        const countdown = setInterval(() => {
            setCount((prevCount) => prevCount - 1);
        }, 1000);

        return () => clearInterval(countdown);
    }, []);

    React.useEffect(() => {
      if (count === 0) {
        // Perform any action or logic when countdown reaches 0
        console.log('Countdown reached 0!');
      }
    }, [count]);

    return <CountdownFormat seconds={count} />;
};

const Play = ({ navigation }) => {
    const { state: {
        questions,
        currQuestion: current,
        duration,
        type
    }, dispatch } = useGame()
    const currQuestion = questions[current]
    const [currAnswer, setCurrentAnswer] = React.useState<any>(null)
    const [correctAnswer, setCorrectAnswer] = React.useState<any>(null)
    const { control, formState, handleSubmit, watch, reset } = useForm();
    const [isRight, setIsRight] = React.useState<null | boolean>(null);
    const choice = watch('choice')

    const onSubmit = async () => {
        const { success } = await sendAnswer({
            is_right: currAnswer.is_right,
            option_id: currAnswer.id
        })

        if (success) {
            reset()
            setIsRight(null);
            setAnswer(dispatch, currAnswer);
            setCurrentAnswer(null)
            if (current + 1 == questions.length) {
                navigation.navigate(Routes.CheckAnswers)
            } else {
                passQuestion();
            }
        }
    };

    React.useEffect(() => {
        if (choice) {
            const answer = currQuestion.options.find(item => item.statement === choice)
            const correctAnswer = currQuestion.options.find(item => item.is_right)

            setIsRight(answer?.is_right)
            setCorrectAnswer(correctAnswer)
            setCurrentAnswer(answer)
        }
    }, [choice, currQuestion]);

    const passQuestion = () => {
        nextQuestion(dispatch);
    }

    return (
        <View style={{
            flex: 1
        }}>
            <Container>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* <Row size={3} align='center' direction='row' justify='space-between'>
                        <View style={{
                            flexDirection: 'column',
                            alignItems: 'start'
                        }}>
                            <Text fontSize={18}>
                                Tú
                            </Text>
                            <UserImage user={User} size={30} />
                        </View>
                        <View style={{
                            flexDirection: 'column',
                            alignItems: 'start'
                        }}>
                            <Text fontSize={18}>
                                Tus amigos
                            </Text>
                            <View style={{
                                flexDirection: 'row'
                            }}>
                                <UserImage user={User} size={30} style={{ marginLeft: -10 }}/>
                                <UserImage user={User} size={30} style={{ marginLeft: -10 }} />
                                <UserImage user={User} size={30} style={{ marginLeft: -10 }} />
                                <UserImage user={User} size={30} style={{ marginLeft: -10 }} />
                            </View>
                        </View>
                    </Row> */}
                    <Row size={3} align='center' direction='row' justify='space-between'>
                        <Text>
                            Pregunta {current + 1} / {questions.length}
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Timer size={24} color='#000' />
                            <Text align='center'>
                                {' '} <CountdownTimer seconds={duration} />
                            </Text>
                        </View>
                    </Row>
                    <Row size={1}>
                        <Text align='left' fontSize={22} fontWeight={400}>
                            1. {currQuestion.description}
                        </Text>
                    </Row>
                    <Row size={1}>
                        <RadioButton
                            control={control}
                            name='choice'
                            options={currQuestion.options.map(item => item.statement)}
                            disabled={currAnswer}
                        />
                    </Row>
                    <Row>
                        {(type == 'Práctica' && isRight == false) ? (
                            <Text fontWeight={600}>
                                Respuesta correcta: {correctAnswer.statement}
                            </Text>
                        ) : null}
                    </Row>
                    <Row>
                        {(currQuestion.explanation_type == isRight && currQuestion.explanation) ? (
                            <Text fontSize={18}>
                                Nota: {currQuestion.explanation}
                            </Text>
                        ) : null}
                    </Row>
                </ScrollView>
            </Container>
            <View style={{
                position: 'absolute',
                bottom: 0,
                backgroundColor: '#000',
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                paddingVertical: verticalScale(10),
                paddingHorizontal: horizontalScale(10)
            }}>
                <Button  variant='text'
                    textColor='primary'
                    textVariant='light'
                    onPress={passQuestion}
                    disabled={currAnswer || formState.isSubmitting}
                >
                    Saltar
                </Button>
                <Button
                    onPress={handleSubmit(onSubmit)}
                    disabled={!currAnswer || formState.isSubmitting}
                    isLoading={formState.isSubmitting}
                >
                    Siguiente
                </Button>
            </View>
            <AnswerAlert status={isRight} />
        </View>
    )
}

export default Play
