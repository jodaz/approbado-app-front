import * as React from 'react'
import { Dimensions } from 'react-native';
import { getPosts } from '@approbado/lib/services/forums.services.ts';
import { Post } from '@approbado/lib/types/models'
import { useAuth } from '@approbado/lib/contexts/AuthContext'
import { horizontalScale, verticalScale } from '../../../styles/scaling';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import PostCard from '../../../components/PostCard';
import Text from '../../../components/Text';
import styled from 'styled-components/native';
import DeletePost from '../../Forums/components/DeletePost';
import { BottomDrawer, DrawerButton, ScrollViewContainer } from '../../../components';
import { Edit2, Trash2 } from 'lucide-react-native';
import { Routes } from '../../routes';

const { width } = Dimensions.get('window');

const Container = styled.ScrollView`
    padding-top: ${(props) => verticalScale(props.theme.space[2])};
    width: ${width - horizontalScale(40)}px;
`

const Publications = () => {
    const navigation = useNavigation()
    const isFocused = useIsFocused();
    const { state: { user } } = useAuth();
    const [posts, setPosts] = React.useState<Post[] | []>([]);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = React.useState(false);
    const [selectedPost, setSelectedPost] = React.useState<null | Post>(null)
    const [openDelete, setOpenDelete] = React.useState<boolean | number>(false);

    const onDeletePost = postID => {
        const newPosts = posts.filter(({ id }) => id != postID)

        setPosts(newPosts);
    }

    const toggleDelete = (value = false) => setOpenDelete(value);
    // Function to open the bottom sheet
    const handleOpenBottomSheet = (post: Post) => {
        setSelectedPost(post)
        setIsBottomSheetOpen(true);
    };

    // Function to close the bottom sheet
    const handleCloseBottomSheet = () => {
        setSelectedPost(null);
        setIsBottomSheetOpen(false);
    };

    const fetchData = async () => {
        const { success, data } = await getPosts({
            filter: {
                user_id: user.id
            }
        });

        if (success) {
            setPosts(data)
        }
    }

    React.useEffect(() => { fetchData() }, [isFocused])

    if (!posts.length) {
        return (
            <Container>
                <Text>
                    Sin publicaciones
                </Text>
            </Container>
        )
    }

    return (
        <ScrollViewContainer>
            {posts.map((post: Post, index: number) => (
                <PostCard
                    openDrawerMenu={handleOpenBottomSheet}
                    post={post}
                />
            ))}
            {selectedPost ? (
                <>
                    <BottomDrawer
                        isOpen={isBottomSheetOpen}
                        handleClose={handleCloseBottomSheet}
                    >
                        {(selectedPost.owner.id == user.id) ? (
                            <DrawerButton
                                icon={<Edit2 />}
                                onPress={() => {
                                    navigation.navigate(Routes.EditPost, {
                                        post: selectedPost
                                    });
                                    handleCloseBottomSheet()
                                }}
                            >
                                Editar
                            </DrawerButton>
                        ) : null}
                        {(selectedPost.owner.id == user.id) ? (
                            <DrawerButton
                                icon={<Trash2 />}
                                onPress={() => {
                                    toggleDelete(selectedPost.id)
                                    handleCloseBottomSheet()
                                }}
                            >
                                Eliminar
                            </DrawerButton>
                        ) : null}
                        {(selectedPost.owner.id != user.id) ? (
                            <DrawerButton
                                icon={<AlertTriangle />}
                                onPress={() => {
                                    navigation.navigate(Routes.ReportPost, {
                                        post: selectedPost
                                    })
                                    handleCloseBottomSheet()
                                }}
                            >
                                Reportar
                            </DrawerButton>
                        ) : null}
                    </BottomDrawer>
                </>
            ) : null}
            <DeletePost
                isOpen={openDelete}
                toggleModal={toggleDelete}
                onDeletePost={onDeletePost}
            />
        </ScrollViewContainer>
    );
}

export default Publications
