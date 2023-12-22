import * as React from 'react'
import {
    Container,
    Text,
    Row,
    Image,
    CategoryPill,
    TitleBar
} from '../../../components';
import { horizontalScale } from '../../../styles/scaling';
import { useForm } from 'react-hook-form';
import { Category } from '@approbado/lib/types/models'
import { createComment } from '@approbado/lib/services/comments.services'
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext';
import styled from 'styled-components/native';
import PostDescription from '../../../components/PostDescription';
import CommentList from '../components/CommentsList';
import CommentInput from '../components/CommentInput';
import { ScrollView } from 'react-native';

const StyledContainer = styled.View`
    width: 100%;
    height: fit-content;
    padding-horizontal: ${props => horizontalScale(props.theme.space[1])}px;
`

const ShowPost = ({ route }) => {
    const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm()
    const { dispatch } = useToast();
    const post = route.params.post;

    const onSubmit = async (values) => {
        const response = await createComment({
            summary: values.message,
            parent_id: post.id
        })

        if (response.success) {
            reset();
            await openToast(
                dispatch,
                'success',
                'Comentario publicado.'
            )
        } else {
            await openToast(
                dispatch,
                'error',
                'Ha ocurrido un error.'
            )
        }
    }

    return (
        <Container>
            <ScrollView showsVerticalScrollIndicator={false}>
                <StyledContainer>
                    <Row size={1} direction='row'>
                        <TitleBar>
                            <Text fontSize={18}>
                                Ver post
                            </Text>
                        </TitleBar>
                    </Row>
                    <Row size={1} direction='row'>
                        <Image source={post.owner.picture} />
                        <Row size={1} direction='column'>
                            <Text fontSize={18}>
                                {post.message}
                            </Text>
                            <Row size={1} direction='row'>
                                <Text fontSize={16} variant='secondary'>
                                    Por{' '}
                                </Text>
                                <Text fontSize={16}>
                                    {post.owner.user_name}
                                </Text>
                            </Row>
                        </Row>
                    </Row>
                    <Text fontSize={18} fontWeight={400}>
                        {post.summary}
                    </Text>
                    <Row size={1} direction='row'>
                        {post.categories.map((item: Category, i: number) => (
                            <CategoryPill item={item} />
                        ))}
                    </Row>
                    <PostDescription post={post} />
                </StyledContainer>
                <CommentInput
                    control={control}
                    name='message'
                    onHandleSubmit={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                />
                <CommentList post={post} />
            </ScrollView>
        </Container>
    );
}

export default ShowPost
