import * as React from 'react'
import { Row, Text, CategoryCard } from '../../../components';
import { Category } from '@approbado/lib/types/models'
import { listCategories } from '@approbado/lib/services/categories.services'
import { FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const Categories = () => {
    const isFocused = useIsFocused();
    const [categories, setCategories] = React.useState<[] | Category[]>([])

    const fetchCategories = async () => {
        const { success, data } = await listCategories();

        if (success) {
            setCategories(data);
        } else {
            console.log("error", data)
        }
    }

    React.useEffect(() => { fetchCategories() }, [isFocused])

    if (!categories.length) {
        return (
            <Row>
                <Text>
                    Sin categorías
                </Text>
            </Row>
        )
    }

    return (
        <FlatList
            data={categories}
            renderItem={({ item }) => <CategoryCard category={item} />}
        />
    );
}

export default Categories
