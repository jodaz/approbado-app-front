import React from 'react';
import { Post, Category } from '@approbado/lib/types/models'
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../screens/routes';
import CategoryPill from './CategoryPill';
import styled from 'styled-components/native';
import Text from './Text';
import Row from './Row';
import Image from './Image';
import PostDescription from './PostDescription';
import { MoreVertical } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';

const Pressable = styled.Pressable`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
`

interface IPostCardProps {
    post: Post;
    openDrawerMenu?: () => void;
}

const PostCard = ({ post, openDrawerMenu } : IPostCardProps ) : JSX.Element => {
    const navigation = useNavigation();

    const handleNavigate = () => navigation.navigate(Routes.ShowPost, {
        post: post
    })

    return (
        <Pressable onPress={handleNavigate} key={post.id}>
            <Row size={3} direction='row' align='start'>
                <Image source={post.owner.picture} />
                <Row size={2}>
                    <Row size={2} direction='row'>
                        <Text fontSize={18}>
                            {post.message}
                        </Text>
                        <TouchableOpacity onPress={() => openDrawerMenu(post)}>
                            <MoreVertical
                                color='#000'
                                size={24}
                            />
                        </TouchableOpacity>
                    </Row>
                    <Row size={1} direction='row'>
                        <Text fontSize={16} color='secondary'>
                            Por{' '}
                        </Text>
                        <Text fontSize={16}>
                            {post.owner.user_name}
                        </Text>
                    </Row>
                    <Row size={1} direction='row'>
                        {post.categories.map((item: Category, i: number) => (
                            <CategoryPill item={item} />
                        ))}
                    </Row>
                    <PostDescription post={post} />
                </Row>
            </Row>
        </Pressable>
    )
}

export default PostCard;
