import * as React from 'react'
import { getPosts } from '@approbado/lib/services/forums.services.ts';
import { Post } from '@approbado/lib/types/models'
import { Container, PostCard, Text } from '../../../components';
import { ScrollView } from 'react-native';

const PopularPosts = () => {
    const [posts, setPosts] = React.useState<Post[] | []>([]);

    const fetchData = async () => {
        const { success, data } = await getPosts({
            sort: { field: 'comments', order: 'DESC'}
        });

        if (success) {
            setPosts(data)
        }
    }

    React.useEffect(() => { fetchData() }, [])

    if (!posts.length) {
        return (
            <Container>
                <Text>
                    Sin publicaciones
                </Text>
            </Container>
        )
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {posts.map((post: Post, index: number) => <PostCard post={post} />)}
        </ScrollView>
    );
}

export default PopularPosts
