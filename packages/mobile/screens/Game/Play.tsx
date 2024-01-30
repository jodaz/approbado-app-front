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
import { Question } from '@approbado/lib/types/models'
import CountdownFormat from '@approbado/lib/components/CountdownFormat'
import { horizontalScale, verticalScale } from '../../styles/scaling';
import AnswerAlert from './components/AnswerAlert';

const question = {
    "id": 1,
    "num": null,
    "description": "La respuesta a esta pregunta es la dos",
    "explanation": "La respuesta correcta es la dos",
    "explanation_type": false,
    "subtheme_id": null,
    "level_id": 1,
    "trivia_id": null,
    "file_id": 1,
    "created_at": "2023-12-29T19:43:13.655Z",
    "updated_at": null,
    "options": [
        {
            "id": 1,
            "statement": "Opcion 1",
            "is_right": false,
            "question_id": 1,
            "created_at": "2023-12-29T19:43:13.676Z",
            "updated_at": null
        },
        {
            "id": 2,
            "statement": "Opcion 2",
            "is_right": true,
            "question_id": 1,
            "created_at": "2023-12-29T19:43:13.676Z",
            "updated_at": null
        },
        {
            "id": 3,
            "statement": "Opcion 3",
            "is_right": false,
            "question_id": 1,
            "created_at": "2023-12-29T19:43:13.676Z",
            "updated_at": null
        }
    ]
}

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
    const [count, setCount] = React.useState(seconds);

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

const Play = props => {
    const { control, formState, handleSubmit } = useForm();
    const [isRight, setIsRight] = React.useState<null | boolean>(null);

    const onSubmit = async values => {
        const answer = question.options.find(item => item.statement === values.choice)
        const correctAnswer = question.options.find(item => item.is_right)

        setIsRight(answer.is_right)
    };

    return (
        <View style={{
            flex: 1
        }}>
            <Container>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Row size={3} align='center' direction='row' justify='space-between'>
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
                    </Row>
                    <Row size={3} align='center' direction='row' justify='space-between'>
                        <Text>
                            Pregunta 1 / 16
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Timer size={24} color='#000' />
                            <Text align='center'>
                                {' '} <CountdownTimer seconds={1800} />
                            </Text>
                        </View>
                    </Row>
                    <Row size={1}>
                        <Text align='left' fontSize={22} fontWeight={400}>
                            1. {question.description}
                        </Text>
                    </Row>
                    <Row size={1}>
                        <RadioButton
                            control={control}
                            name='choice'
                            options={question.options.map(item => item.statement)}
                        />
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
                    onPress={() => console.log("saltar")}
                >
                    Saltar
                </Button>
                <Button onPress={handleSubmit(onSubmit)} disabled={!formState?.isDirty}>
                    Siguiente
                </Button>
            </View>
            <AnswerAlert status={isRight} />
        </View>
    )
}

export default Play
