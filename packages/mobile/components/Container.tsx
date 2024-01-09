import {
    Dimensions
} from 'react-native';
import { IComp } from '../types';
import { verticalScale, horizontalScale } from '../styles/scaling';
import styled from 'styled-components/native';

const { width, height } = Dimensions.get('window');

const StyledView = styled.View`
    padding-vertical: ${(props) => verticalScale(props.theme.space[4])}px;
    padding-horizontal: ${(props) => horizontalScale(props.theme.space[4])}px;
    width: ${width}px;
    height: ${height}px;
    position: relative;
    flex: 1;
`

const Container = ({ children } : IComp) : JSX.Element => (
    <StyledView>
        {children}
    </StyledView>
)


export default Container
