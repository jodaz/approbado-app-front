import * as React from 'react'
import { useForm } from 'react-hook-form';
import Container from '../../components/Container';
import { Text, Button, Row } from '../../components';
import { Routes } from '../routes';
import { Mail } from 'lucide-react-native';
import Logotipo from '@approbado/lib/illustrations/Logotipo.svg'
import BottomDrawer from '../../components/BottomDrawer';

const Home = ({ navigation }) => {
    const { control, handleSubmit } = useForm();

    // This state would determine if the drawer sheet is visible or not
    const [isBottomSheetOpen, setIsBottomSheetOpen] = React.useState(false);

    // Function to open the bottom sheet
    const handleOpenBottomSheet = () => {
      setIsBottomSheetOpen(true);
    };

    // Function to close the bottom sheet
    const handleCloseBottomSheet = () => {
      setIsBottomSheetOpen(false);
    };

    const onSubmit = async (values) => {
    };

    return (
        <Container>
            <Row size={2} align='center' direction='row' justify='space-between'>
                <Logotipo />
                <Button variant='text' onPress={() => navigation.navigate(Routes.Chat)}>
                    <Mail size={24} color='#000' />
                </Button>
                <Button variant="outlined" onPress={handleOpenBottomSheet}>
                    Abrir
                </Button>
            </Row>
            <BottomDrawer
                isOpen={isBottomSheetOpen}
                handleClose={handleCloseBottomSheet}
            >
                <Button variant='text' onPress={() => {
                    console.log("Hola")
                    handleCloseBottomSheet()
                }}>
                    Cerrar
                </Button>
            </BottomDrawer>
        </Container>
    );
}

export default Home
