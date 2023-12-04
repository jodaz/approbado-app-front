import * as React from 'react'
import { getPosts } from '@approbado/lib/services/forums.services.ts';
import { Post } from '@approbado/lib/types/models'
import { BottomDrawer, DrawerButton, PostCard } from '../../../components';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../routes';
import { AlertTriangle, Edit2, Trash2 } from 'lucide-react-native';

const NewPosts = () => {
    const [posts, setPosts] = React.useState<Post[] | []>([]);
    const navigation = useNavigation();

    // This state would determine if the drawer sheet is visible or not
    const [isBottomSheetOpen, setIsBottomSheetOpen] = React.useState(false);
    const [selectedPost, setSelectedPost] = React.useState<null | Post>(null)

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
            sort: { field: 'created_at', order: 'DESC'}
        });

        if (success) {
            setPosts(data)
        }
    }

    React.useEffect(() => { fetchData() }, [])

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
        </ScrollView>
    );
}

export default NewPosts
