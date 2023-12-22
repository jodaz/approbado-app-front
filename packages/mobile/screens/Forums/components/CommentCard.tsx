import React from 'react';
import { Post } from '@approbado/lib/types/models'
import { useAuth } from '@approbado/lib/contexts/AuthContext'
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../routes';
import { horizontalScale, scaleFontSize, verticalScale } from '../../../styles/scaling';
import { View } from 'react-native';
import { Text, Image } from '../../../components';
import { InfoIcon, MessageSquare } from 'lucide-react-native';
import styled from 'styled-components/native';
import LikeButton from './LikeButton';

const Pressable = styled.Pressable`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding-vertical: ${props => verticalScale(props.theme.space[1])}px;
    width: 100%;
`

interface ICommentCardProps {
    comment: Post;
    openDrawerMenu?: () => void;
}

const IconButton = styled.Pressable`
    padding-horizontal: ${props => horizontalScale(props.theme.space[1])}px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
`

const CommentCard = ({ comment } : ICommentCardProps ) : JSX.Element => {
    const { state: { user } } = useAuth()
    const navigation = useNavigation();

    const handleNavigate = () => navigation.navigate(Routes.ShowComment, {
        comment: comment
    })

    const handleReport = () => navigation.navigate(Routes.ReportPost, {
        post: comment
    })

    return (
        <Pressable onPress={handleNavigate} key={comment.id}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Image source={comment?.owner?.picture} />
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Text fontSize={18}>
                        {comment?.owner?.user_name}
                    </Text>
                    <Text fontSize={18} fontWeight={400}>
                        {comment?.summary}
                    </Text>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'start',
                        flexWrap: 'wrap'
                    }}>
                        <MessageSquare
                            color='#6D6D6D'
                            size={24}
                            style={{ marginRight: 5 }}
                        />
                        <Text fontSize={18} variant='secondary'>
                            {comment?.commentsCount}
                        </Text>
                        <LikeButton comment={comment} />
                        {(comment?.owner?.id != user?.id) ? (
                            <IconButton onPress={handleReport}>
                                <InfoIcon
                                    color='#6D6D6D'
                                    size={scaleFontSize(24)}
                                    style={{ marginRight: 5 }}
                                />
                            </IconButton>
                        ) : null}
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default CommentCard;
