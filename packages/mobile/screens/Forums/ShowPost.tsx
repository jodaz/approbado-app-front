import * as React from 'react'
import {
    Text,
    Row,
    Image,
    CategoryPill,
    TitleBar
} from './../../components';
import { Post } from '@approbado/lib/types/models'
import { horizontalScale } from './../../styles/scaling';
import { useForm } from 'react-hook-form';
import { Category } from '@approbado/lib/types/models'
import { createComment, getComments } from '@approbado/lib/services/comments.services'
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext';
import { FlatList, View } from 'react-native';
import { socket } from '@approbado/lib/utils/socket'
import CommentCard from './components/CommentCard';
import styled, { useTheme } from 'styled-components/native';
import PostDescription from './../../components/PostDescription';
import CommentInput from './components/CommentInput';
import { useIsFocused } from '@react-navigation/native';

const StyledContainer = styled.View`
    width: 100%;
    height: fit-content;
    padding-horizontal: ${props => horizontalScale(props.theme.space[1])}px;
`

const ShowPost = ({ route }) => {
    const post = route.params.post;
    const theme = useTheme()
    const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm()
    const { dispatch } = useToast();
    const [comments, setComments] = React.useState<any>([])
    const [totalComments, setTotalComments] = React.useState(parseInt(post?.commentsCount));
    const isFocused = useIsFocused()

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

    const fetchData = async () => {
        const { success, data } = await getComments({
            sort: { field: 'created_at', order: 'DESC'},
            filter: {
                id: post.id
            }
        });

        if (success) {
            setComments(data)
        }
    }

    React.useEffect(() => {
        socket.on("new_comment", (comment: Post) => {
            if (comment.parent_id == post.id) {
                setComments((state: Post[]) => [comment, ...state])
                setTotalComments(prev => prev + 1);
            }
        });

        return () => {
            socket.off('new_comment')
        }
    }, [])

    React.useEffect(() => {
        socket.on("delete_comment", (comment: Post) => {
            if (comment.parent_id == post.id) {
                const newComments = comments.filter((item: Post) => item.id != comment.id)
                setComments(newComments)
                setTotalComments(prev => prev - 1);
            }
        });

        return () => {
            socket.off('delete_comment')
        }
    }, [])

    const PostHeader = () => (
        <View>
            <StyledContainer>
                <Row size={1} direction='row'>
                    <Image source={post.owner.picture} />
                    {post?.type == 'Comentario' ? (
                        <Row size={1} direction='column'>
                            <Text>
                                {post?.owner?.names}
                            </Text>
                            <Row size={1} direction='row'>
                                <Text fontSize={18} variant="secondary">
                                    @{post?.owner?.user_name}
                                </Text>
                            </Row>
                        </Row>
                    ) : (
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
                    )}
                </Row>
                <Text fontSize={18} fontWeight={400}>
                    {post.summary}
                </Text>
                {post?.type != 'Comentario' ? (
                    <Row size={1} direction='row'>
                        {post.categories.map((item: Category, i: number) => (
                            <CategoryPill item={item} />
                        ))}
                    </Row>
                ) : null}
                <PostDescription post={post} />
            </StyledContainer>
            <CommentInput
                control={control}
                name='message'
                onHandleSubmit={handleSubmit(onSubmit)}
                disabled={isSubmitting}
            />
            <Text>{totalComments} respuestas</Text>
        </View>
    )

    React.useEffect(() => { fetchData() }, [isFocused, post.id])

    return (
        <FlatList
            ListHeaderComponent={PostHeader}
            renderItem={({ item }) => <CommentCard comment={item} />}
            data={comments}
            refreshing={false}
            onRefresh={fetchData}
            style={{
                paddingHorizontal: horizontalScale(theme.space[2])
            }}
        />
    );
}

export default ShowPost
