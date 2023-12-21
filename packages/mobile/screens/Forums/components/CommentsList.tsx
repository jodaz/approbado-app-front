import * as React from 'react'
import { Text } from "../../../components"
import { Post } from '@approbado/lib/types/models'
import { getComments } from '@approbado/lib/services/comments.services.ts';
import { useIsFocused } from "@react-navigation/native";
import { ScrollView } from 'react-native';
import { socket } from '@approbado/lib/utils/socket'
import CommentCard from './CommentCard';

interface ICommentListProps {
    post: Post;
}

const CommentList = ({ post } : ICommentListProps) => {
    const isFocused = useIsFocused()
    const [comments, setComments] = React.useState<any>([])
    const [totalComments, setTotalComments] = React.useState(parseInt(post?.commentsCount));

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

    React.useEffect(() => { fetchData() }, [isFocused, post.id])

    return (
        <>
            <Text>{totalComments} Respuestas</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                {comments.map((post: Post, index: number) => (
                    <CommentCard
                        comment={post}
                    />
                ))}
            </ScrollView>
        </>
    )
}

export default CommentList
