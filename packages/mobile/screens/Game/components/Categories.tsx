import * as React from 'react'
import { Container, Text, CategoryCard } from '../../../components';
import { Category } from '@approbado/lib/types/models'
import { listCategories } from '@approbado/lib/services/categories.services'
import { ScrollView } from 'react-native';
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
            <Container>
                <Text>
                    Sin categories
                </Text>
            </Container>
        )
    }

    return (
        <ScrollView>
            {categories.map((item: Category) => (
                <CategoryCard category={item} />
            ))}
        </ScrollView>
    );
}

export default Categories
