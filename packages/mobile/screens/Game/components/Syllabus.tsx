import * as React from 'react'
import { Button, Text } from '../../../components';
import { Award } from '@approbado/lib/types/models'
import { listAwardsWithSubthemes } from '@approbado/lib/services/awards.services'
import { Dimensions } from 'react-native';
import { verticalScale } from '../../../styles/scaling';
import { useIsFocused } from '@react-navigation/native';
import { Routes } from '../../routes';
import { useGame, setTrivia } from '@approbado/lib/contexts/GameContext';
import AwardListItem from './AwardListItem';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');

const Container = styled.ScrollView`
    margin: 0 auto;
    padding-top: ${(props) => verticalScale(props.theme.space[6])}px;
    width: ${width * .9}px;
    height: 100%;
    flex: 1;
`

const Syllabus = ({ navigation, route }) => {
    const isFocused = useIsFocused();
    const trivia = route.params.trivia;
    const { dispatch, state } = useGame()
    const [awards, setAwards] = React.useState<[] | Award[]>([])

    const fetchAwards = async () => {
        const { success, data } = await listAwardsWithSubthemes(trivia.id);

        if (success) {
            setAwards(data);
        } else {
            console.log("error", data)
        }
    }
    console.log(JSON.stringify(awards, null, ' '))
    const handleNavigate = () => {
        setTrivia(dispatch, trivia);
        navigation.navigate(Routes.SelectTrivia)
    }

    React.useEffect(() => { fetchAwards() }, [isFocused])

    if (!awards.length) {
        return (
            <Container>
                <Text>
                    Sin recursos
                </Text>
            </Container>
        )
    }

    return (
        <Container
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                flex: 1
            }}
        >
            {awards.map((award: Award) => <AwardListItem award={award} />)}
            <Button
                onPress={handleNavigate}
                disabled={!state.themes.length}
            >
                Iniciar trivia
            </Button>
        </Container>
    );
}

export default Syllabus
