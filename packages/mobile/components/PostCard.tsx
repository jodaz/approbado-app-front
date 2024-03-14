import React from 'react';
import { Post, Category } from '@approbado/lib/types/models'
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../screens/routes';
import { MoreVertical } from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';
import { horizontalScale, verticalScale } from '../styles/scaling';
import { useBottomSheet } from '../contexts/BottomSheetContext';
import { useAuth } from '@approbado/lib/contexts/AuthContext';
import { AlertTriangle, Edit2, Trash2 } from 'lucide-react-native';
import CategoryPill from './CategoryPill';
import styled, { useTheme } from 'styled-components/native';
import Text from './Text';
import Row from './Row';
import Image from './Image';
import PostDescription from './PostDescription';
import DrawerButton from './DrawerButton';
import { deletePost } from '@approbado/lib/services/forums.services';
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext';
import { useForm } from 'react-hook-form';
import Button from './Button';

const Pressable = styled.Pressable`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding-vertical: ${props => verticalScale(props.theme.space[2])}px;
    margin-vertical: ${props => verticalScale(props.theme.space[1])}px;
`

interface IPostCardProps {
    post: Post;
    hideUserPhoto?: boolean;
    onDeletePost: () => void;
}

const PostCard = ({ post, hideUserPhoto, onDeletePost } : IPostCardProps ) : JSX.Element => {
    const navigation = useNavigation();
    const theme = useTheme()
    const bottomSheet = useBottomSheet()
    const { state: { user } } = useAuth()
    const { handleSubmit, formState } = useForm();
    const { dispatch: dispatchToast } = useToast()

    const onSubmit = async () => {
        const { success } = await deletePost(post.id);

        if (success) {
            onDeletePost(post.id)
            bottomSheet.collapse()
            await openToast(
                dispatchToast,
                'success',
                'Su post ha sido eliminado'
            )
        }
    };

    const handleNavigate = () => navigation.navigate(Routes.Posts, {
        screen: Routes.ShowPost, params: {
            post: post
        }
    })

    const handleEdit = () => {
        navigation.navigate(Routes.Posts, {
            screen: Routes.EditPost, params: {
                post: post
            }
        });
        bottomSheet.collapse()
    }

    const handleReport = () => {
        navigation.navigate(Routes.Posts, {
            screen: Routes.ReportPost, params: {
                post: post
            }
        })
        bottomSheet.collapse()
    }

    const bottomSheetOptions = () => (
        <View style={{
            paddingHorizontal: horizontalScale(theme.space[4])
        }}>
            {(post.owner.id == user.id) ? (
                <DrawerButton
                    icon={<Edit2 />}
                    onPress={handleEdit}
                >
                    Editar
                </DrawerButton>
            ) : null}
            {(post.owner.id == user.id) ? (
                <DrawerButton
                    icon={<Trash2 />}
                    onPress={showDeleteOptions}
                >
                    Eliminar
                </DrawerButton>
            ) : null}
            {(post.owner.id != user.id) ? (
                <DrawerButton
                    icon={<AlertTriangle />}
                    onPress={handleReport}
                >
                    Reportar
                </DrawerButton>
            ) : null}
        </View>
    )

    const deleteBottomSheetContentOptions = () => (
        <View style={{
            paddingHorizontal: horizontalScale(theme.space[4])
        }}>
            <Row size={2}>
                <Text fontSize={20} fontWeight={600}>
                    ¿Está seguro que desea eliminar este post?
                </Text>
            </Row>
            <Row size={1} direction="row" justify='space-between'>
                <Button
                    variant='contained'
                    onPress={handleSubmit(onSubmit)}
                    disabled={formState.isSubmitting}
                    isLoading={formState.isSubmitting}
                >
                    Eliminar
                </Button>
                <Button
                    variant='outlined'
                    onPress={() => bottomSheet.collapse()}
                    disabled={formState.isSubmitting}
                >
                    Cancelar
                </Button>
            </Row>
        </View>
    )

    const showOptions = () => bottomSheet.expand({
        renderContent: () => bottomSheetOptions
    });

    const showDeleteOptions = () => bottomSheet.expand({
        renderContent: () => deleteBottomSheetContentOptions
    });

    return (
        <Pressable onPress={handleNavigate} key={post.id}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                {!hideUserPhoto ? <Image source={post.owner.picture} /> : null}
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Text fontSize={18}>
                        {post.message}
                    </Text>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text fontSize={16} variant='secondary'>
                            Por{' '}
                        </Text>
                        <Text fontSize={16}>
                            {post.owner.user_name}
                        </Text>
                    </View>
                    <Row size={1} direction='row'>
                        {post.categories.map((item: Category, i: number) => (
                            <CategoryPill item={item} />
                        ))}
                    </Row>
                    <PostDescription post={post} />
                </View>
            </View>
            <TouchableOpacity onPress={showOptions}>
                <MoreVertical
                    color='#000'
                    size={24}
                />
            </TouchableOpacity>
        </Pressable>
    )
}

export default PostCard;
