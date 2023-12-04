import * as React from 'react'
import { getPosts } from '@approbado/lib/services/forums.services.ts';
import { Post } from '@approbado/lib/types/models'
import {
    BottomDrawer,
    DrawerButton,
    PostCard,
    Container,
    Text
} from '../../../components';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../routes';
import { AlertTriangle, Edit2, Trash2 } from 'lucide-react-native';
import DeletePost from './DeletePost';

const UnansweredPosts = () => {
    const [posts, setPosts] = React.useState<Post[] | []>([]);
    const navigation = useNavigation();

    // This state would determine if the drawer sheet is visible or not
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
            filter: { unanswered: true }
        });

        if (success) {
            setPosts(data)
        }
    }

    React.useEffect(() => { fetchData() }, [])

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
        <ScrollView showsVerticalScrollIndicator={false}>
            {posts.map((post: Post, index: number) => (
                <PostCard
                    openDrawerMenu={handleOpenBottomSheet}
                    post={post}
                />
            ))}
            <BottomDrawer
                isOpen={isBottomSheetOpen}
                handleClose={handleCloseBottomSheet}
            >
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
                <DrawerButton
                    icon={<Trash2 />}
                    onPress={() => {
                        toggleDelete(selectedPost.id)
                        handleCloseBottomSheet()
                    }}
                >
                    Eliminar
                </DrawerButton>
                <DrawerButton
                    icon={<AlertTriangle />}
                    onPress={() => {
                        handleCloseBottomSheet()
                    }}
                >
                    Reportar
                </DrawerButton>
            </BottomDrawer>
            <DeletePost
                isOpen={openDelete}
                toggleModal={toggleDelete}
                onDeletePost={onDeletePost}
            />
        </ScrollView>
    );
}

export default UnansweredPosts
