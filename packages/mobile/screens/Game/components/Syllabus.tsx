import * as React from 'react'
import { Text } from '../../../components';
import { Award } from '@approbado/lib/types/models'
import { listAwards } from '@approbado/lib/services/awards.services'
import { ScrollView, Dimensions } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import AwardListItem from './AwardListItem';
import styled from 'styled-components/native';
import { verticalScale } from '../../../styles/scaling';

const { width } = Dimensions.get('window');

const Container = styled.ScrollView`
    margin: 0 auto;
    padding-top: ${(props) => verticalScale(props.theme.space[6])}px;
    width: ${width * .9}px;
    height: 100%;
    flex: 1;
`


const Syllabus = ({ route }) => {
    const isFocused = useIsFocused();
    const trivia = route.params.trivia
    const [awards, setAwards] = React.useState<[] | File[]>([])

    const fetchAwards = async () => {
        const { success, data } = await listAwards({
            filter: {
                trivia_id: trivia.id,
                subthemes: true
            }
        });

        if (success) {
            setAwards(data);
        } else {
            console.log("error", data)
        }
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
            {awards.map((award: Award) => (
                <AwardListItem award={award} />
            ))}
        </Container>
    );
}

export default Syllabus
