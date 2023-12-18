import {
    Dimensions
} from 'react-native';
import { IComp } from '../types';
import { verticalScale, horizontalScale } from '../styles/scaling';
import styled from 'styled-components/native';

const { width, height } = Dimensions.get('window');

const StyledView = styled.ScrollView`
    height: ${height}px;
    padding-vertical: ${(props) => verticalScale(props.theme.space[4])}px;
    padding-horizontal: ${(props) => horizontalScale(props.theme.space[2])}px;
    width: ${width}px;
    position: relative;
`

const Container = ({ children } : IComp) : JSX.Element => (
    <StyledView contentContainerStyle={{
        flex: 1,
    }}>
        {children}
    </StyledView>
)


export default Container
