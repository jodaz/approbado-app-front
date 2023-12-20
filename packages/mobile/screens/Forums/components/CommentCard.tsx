import React from 'react';
import { Post } from '@approbado/lib/types/models'
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../routes';
import { scaleFontSize, verticalScale } from '../../../styles/scaling';
import { View } from 'react-native';
import { Text, Image, Button } from '../../../components';
import styled from 'styled-components/native';
import { Heart, InfoIcon } from 'lucide-react-native';

const Pressable = styled.Pressable`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding-vertical: ${props => verticalScale(props.theme.space[2])}px;
    margin-vertical: ${props => verticalScale(props.theme.space[1])}px;
    width: 100%;
`

interface ICommentCardProps {
    comment: Post;
    openDrawerMenu?: () => void;
}

const CommentCard = ({ comment } : ICommentCardProps ) : JSX.Element => {
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
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Button variant='text'>
                            <Heart color='#6D6D6D' size={scaleFontSize(24)} />
                            {comment?.likesCount}
                        </Button>
                        <Button variant='text' onPress={handleReport}>
                            <InfoIcon color='#6D6D6D' size={scaleFontSize(24)} />
                        </Button>
                    </View>
                </View>
            </View>
        </Pressable>
    )
}

export default CommentCard;