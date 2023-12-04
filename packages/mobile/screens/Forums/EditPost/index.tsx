import * as React from 'react'
import {
    Container,
    Text,
    Row,
    Image,
    CategoryPill
} from '../../../components';
import { Category } from '@approbado/lib/types/models'
import styled from 'styled-components/native';
import PostDescription from '../../../components/PostDescription';

const StyledContainer = styled.View`
    width: 100%;
    height: fit-content;
    padding: ${props => props.theme.space[2]}
`

const EditPost = ({ route }) => {
    const post = route.params.post;

    return (
        <Container>
            <StyledContainer>
                <Row size={1} direction='row'>
                    <Image source={post.owner.picture} />
                    <Row size={1} direction='column'>
                        <Text fontSize={18}>
                            {post.message}
                        </Text>
                        <Row size={1} direction='row'>
                            <Text fontSize={16} color='secondary'>
                                Por{' '}
                            </Text>
                            <Text fontSize={16}>
                                {post.owner.user_name}
                            </Text>
                        </Row>
                    </Row>
                </Row>
                <Text fontSize={16}>
                    {post.summary}
                </Text>
                <Row size={1} direction='row'>
                    {post.categories.map((item: Category, i: number) => (
                        <CategoryPill item={item} />
                    ))}
                </Row>
                <PostDescription post={post} />
            </StyledContainer>
        </Container>
    );
}

export default EditPost
