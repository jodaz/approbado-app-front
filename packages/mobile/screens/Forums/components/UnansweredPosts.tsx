import * as React from 'react'
import { getPosts } from '@approbado/lib/services/forums.services.ts';
import { Post } from '@approbado/lib/types/models'
import {
    PostCard,
    Text,
    Row
} from '../../../components';
import { useIsFocused } from '@react-navigation/native';
import { FlatList } from 'react-native';

const UnansweredPosts = () => {
    const isFocused = useIsFocused();
    const [posts, setPosts] = React.useState<Post[] | []>([]);
    // This state would determine if the drawer sheet is visible or not

    const onDeletePost = postID => {
        const newPosts = posts.filter(({ id }) => id != postID)

        setPosts(newPosts);
    }

    const fetchData = async () => {
        const { success, data } = await getPosts({
            filter: { unanswered: true }
        });

        if (success) {
            setPosts(data)
        }
    }

    React.useEffect(() => { fetchData() }, [isFocused])

    if (!posts.length) {
        return (
            <Row size={2}>
                <Text>
                    Sin publicaciones
                </Text>
            </Row>
        )
    }

    return (
        <FlatList
            data={posts}
            renderItem={({ item }) => (
                <PostCard
                    post={item}
                    onDeletePost={onDeletePost}
                />
            )}
        />
    )
}

export default UnansweredPosts
