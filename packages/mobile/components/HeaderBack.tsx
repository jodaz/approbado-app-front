import { ArrowLeft } from 'lucide-react-native'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

const HeaderBack = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft color='#000' size={24} />
        </TouchableOpacity>
    )
}

export default HeaderBack
