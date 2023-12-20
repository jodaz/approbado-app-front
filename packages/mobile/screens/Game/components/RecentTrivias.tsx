import * as React from 'react'
import { Container, Row, Text, TriviaCard } from '../../../components';
import { Trivia } from '@approbado/lib/types/models'
import { listTrivias } from '@approbado/lib/services/trivias.services'
import { FlatList, ScrollView } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import { useIsFocused } from '@react-navigation/native';

const RecentTrivias = () => {
    const ref = React.useRef()
    const isFocused = useIsFocused();
    const [trivias, setTrivias] = React.useState<[] | Trivia[]>([])

    const fetchTrivias = async () => {
        const { success, data } = await listTrivias();

        if (success) {
            setTrivias(data);
        } else {
            console.log("error", data)
        }
    }

    React.useEffect(() => { fetchTrivias() }, [isFocused])

    if (!trivias.length) {
        return (
            <Container>
                <Text>
                    Sin trivias
                </Text>
            </Container>
        )
    }

    return (
        <ScrollView>
            {trivias.map((trivia: Trivia) => (
                <TriviaCard trivia={trivia} />
            ))}
        </ScrollView>
    );
}

export default RecentTrivias
