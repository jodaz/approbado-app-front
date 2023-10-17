import {
    Dimensions
} from 'react-native';
import styled from 'styled-components/native';

const { height } = Dimensions.get('window');

const Container = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: ${height};
`

export default Container
