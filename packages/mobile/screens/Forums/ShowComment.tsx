import * as React from 'react'
import {
    Container,
    Text,
    Row,
    Image,
    CategoryPill,
    TitleBar
} from './../../components';
import { horizontalScale } from './../../styles/scaling';
import { useForm } from 'react-hook-form';
import { Category } from '@approbado/lib/types/models'
import { createComment } from '@approbado/lib/services/comments.services'
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import PostDescription from './../../components/PostDescription';
import CommentList from './components/CommentsList';
import CommentInput from './components/CommentInput';

const StyledContainer = styled.View`
    width: 100%;
    height: fit-content;
    padding-horizontal: ${props => horizontalScale(props.theme.space[1])}px;
`

const ShowComment = ({ route }) => {
    const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm()
    const { dispatch } = useToast();
    const comment = route.params.comment;

    const onSubmit = async (values) => {
        const response = await createComment({
            summary: values.message,
            parent_id: comment.id
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

    console.log(JSON.stringify(comment, null, ' '))

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
                        <Image source={comment?.owner.picture} />
                        <Row size={1} direction='column'>
                            <Text>
                                {comment?.owner?.names}
                            </Text>
                            <Row size={1} direction='row'>
                                <Text fontSize={18} variant="secondary">
                                    @{comment?.owner?.user_name}
                                </Text>
                            </Row>
                        </Row>
                    </Row>
                    <Text fontSize={18} fontWeight={400}>
                        {comment?.summary}
                    </Text>
                </StyledContainer>
                <CommentInput
                    control={control}
                    name='message'
                    onHandleSubmit={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                />
                <CommentList post={comment} />
            </ScrollView>
        </Container>
    );
}

export default ShowComment
