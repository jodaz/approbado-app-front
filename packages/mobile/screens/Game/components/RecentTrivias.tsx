import * as React from 'react'
import { Row, Text, TriviaCard } from '../../../components';
import { Trivia } from '@approbado/lib/types/models'
import { listTrivias } from '@approbado/lib/services/trivias.services'
import { FlatList  } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const RecentTrivias = () => {
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
            <Row>
                <Text>
                    Sin trivias
                </Text>
            </Row>
        )
    }

    return (
        <FlatList
            data={trivias}
            renderItem={({ item }) => <TriviaCard trivia={item} />}
            showsVerticalScrollIndicator={false}
        />
    );
}

export default RecentTrivias
