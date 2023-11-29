import * as React from 'react'
import { Plus } from 'lucide-react-native';
import { Routes } from '../routes';
import { getPosts } from '@approbado/lib/services/forums.services.ts';
import { Post } from '@approbado/lib/types/models'
import Container from '../../components/Container';
import FloatingButton from '../../components/FloatingButton';
import PostCard from '../../components/PostCard';

const ListPosts = ({ navigation }) => {
    const [posts, setPosts] = React.useState<Post[] | []>([]);

    const fetchData = async () => {
        const { success, data } = await getPosts();

        if (success) {
            setPosts(previousState => [...previousState, ...data])
        }
    }

    React.useEffect(() => { fetchData() }, [])
    console.log(posts)
    return (
        <Container>
            {posts.map((post: Post, index: number) => <PostCard post={post} />)}
            <FloatingButton
                icon={<Plus />}
                onPress={() => navigation.navigate(Routes.CreateForum)}
            />
        </Container>
    );
}

export default ListPosts
