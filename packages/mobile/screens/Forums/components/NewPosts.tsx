import * as React from 'react'
import { getPosts } from '@approbado/lib/services/forums.services.ts';
import { Post } from '@approbado/lib/types/models'
import { PostCard } from '../../../components';
import { ScrollView } from 'react-native';

const NewPosts = () => {
    const [posts, setPosts] = React.useState<Post[] | []>([]);

    const fetchData = async () => {
        const { success, data } = await getPosts({
            sort: { field: 'created_at', order: 'DESC'}
        });

        if (success) {
            setPosts(data)
        }
    }

    React.useEffect(() => { fetchData() }, [])

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {posts.map((post: Post, index: number) => <PostCard post={post} />)}
        </ScrollView>
    );
}

export default NewPosts
