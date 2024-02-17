import * as React from 'react'
import { Dimensions } from 'react-native';
import { getPosts } from '@approbado/lib/services/forums.services.ts';
import { Post } from '@approbado/lib/types/models'
import { useAuth } from '@approbado/lib/contexts/AuthContext'
import { horizontalScale, verticalScale } from '../../../styles/scaling';
import { useIsFocused } from '@react-navigation/native';
import PostCard from '../../../components/PostCard';
import Text from '../../../components/Text';
import Row from '../../../components/Row';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');

const Container = styled.ScrollView`
    padding-top: ${(props) => verticalScale(props.theme.space[2])};
    width: ${width - horizontalScale(40)}px;
`

const Publications = () => {
    const isFocused = useIsFocused();
    const { state: { user } } = useAuth();
    const [posts, setPosts] = React.useState<Post[] | []>([]);

    const fetchData = async () => {
        const { success, data } = await getPosts({
            filter: {
                user_id: user.id
            }
        });

        if (success) {
            setPosts(data)
        }
    }

    React.useEffect(() => { fetchData() }, [isFocused])

    return (
        <Container>
            {posts.length ? (
                <>
                    {posts.map((item: Post) => <PostCard post={item} />)}
                </>
            ) : (
                <Row size={1} align='center'>
                    <Text fontWeight={400}>
                        No tiene publicaciones disponibles
                    </Text>
                </Row>
            )}
        </Container>
    );
}

export default Publications
