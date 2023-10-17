import {
    Dimensions
} from 'react-native';
import styled from 'styled-components/native';

const { width, height } = Dimensions.get('window');

const InnerContainer = styled.View`
    flexDirection: column;
    alignItems: center;
    justifyContent: space-evenly;
    height: ${height * .75}px;
    margin-top: 20px;
    width: ${width * .9}px;
`

export default InnerContainer
