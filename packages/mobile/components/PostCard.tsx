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

const Pressable = styled.Pressable`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
`

const PostCard = ({ post } : Post ) : JSX.Element => {
    const navigation = useNavigation();

    const handleNavigate = () => navigation.navigate(Routes.ShowPost, {
        post: post
    })

    return (
        <Pressable onPress={handleNavigate}>
            <Row size={3} direction='row' align='start'>
                <Image source={post.owner.picture} />
                <Row size={2}>
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
