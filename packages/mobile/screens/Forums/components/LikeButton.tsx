import React from 'react';
import { Post } from '@approbado/lib/types/models'
import { horizontalScale, scaleFontSize, verticalScale } from '../../../styles/scaling';
import { Text } from '../../../components';
import { Heart } from 'lucide-react-native';
import { likePost } from '@approbado/lib/services/likes.services.ts'
import styled from 'styled-components/native';

interface ILikeButtonProps {
    comment: Post;
}

const IconButton = styled.Pressable`
    padding-vertical: ${props => verticalScale(props.theme.space[1])}px;
    padding-horizontal: ${props => horizontalScale(props.theme.space[1])}px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
`

const LikeButton = ({ comment } : ILikeButtonProps ) : JSX.Element => {
    const [likeStatus, setLikeStatus] = React.useState(parseInt(comment?.likeUser));
    const [likesCount, setLikesCount] = React.useState(parseInt(comment?.likesCount))
    console.log(JSON.stringify(comment, null, ' '))
    const handleLike = async () => {
        setLikeStatus(!likeStatus)

        const { success } = await likePost(comment.id)

        if (likeStatus) {
            setLikesCount(prevState => prevState - 1);
        } else {
            setLikesCount(prevState => prevState + 1);
        }
    }

    return (
        <IconButton onPress={handleLike}>
            <Heart color={likeStatus ? '#E02340' : '#6D6D6D'} size={scaleFontSize(24)} />
            <Text fontSize={18} variant='secondary' align='center'>
                {'  '}{likesCount} likes
            </Text>
        </IconButton>
    )
}

export default LikeButton;
