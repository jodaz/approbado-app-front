import * as React from 'react'
import { Button, Row, ScrollViewContainer, Text } from '../../../components';
import { Award } from '@approbado/lib/types/models'
import { listAwardsWithSubthemes } from '@approbado/lib/services/awards.services'
import { Dimensions, FlatList } from 'react-native';
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

    const handleNavigate = () => {
        setTrivia(dispatch, trivia);
        navigation.navigate(Routes.SelectTrivia)
    }

    React.useEffect(() => { fetchAwards() }, [isFocused])

    if (!awards.length) {
        return (
            <ScrollViewContainer>
                <Row>
                    <Text>
                        Sin temas
                    </Text>
                </Row>
            </ScrollViewContainer>
        )
    }

    return (
        <FlatList
            data={awards}
            renderItem={({ item }) => <AwardListItem award={item} />}
            ListFooterComponent={() => (
                <Row>
                    <Button
                        onPress={handleNavigate}
                        disabled={!state.themes.length}
                    >
                        Iniciar trivia
                    </Button>
                </Row>
            )}
        />
    );
}

export default Syllabus
