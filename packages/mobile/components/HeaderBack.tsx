import { ArrowLeft } from 'lucide-react-native'
import { horizontalScale } from "../styles/scaling";
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

const NavButton = styled.TouchableOpacity`
    margin-right: ${props => horizontalScale(props.theme.space[5])}px;
`

const HeaderBack = () => {
    const navigation = useNavigation();

    return (
        <NavButton onPress={() => navigation.goBack()}>
            <ArrowLeft color='#000' size={24} />
        </NavButton>
    )
}

export default HeaderBack
