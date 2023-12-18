import {
    Dimensions
} from 'react-native';
import { IComp } from '../types';
import styled from 'styled-components/native';
import { verticalScale } from '../styles/scaling';

const { width, height } = Dimensions.get('window');

const StyledView = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: ${height}px;
    padding-top: ${(props) => verticalScale(props.theme.space[6])}px;
    width: ${width}px;
`

const InnerContainer = styled.View`
    flexDirection: column;
    alignItems: center;
    width: ${width * .9}px;
    position: relative;
    flex: 1;
`

const Container = ({ children } : IComp) : JSX.Element => (
    <StyledView>
        <InnerContainer>
            {children}
        </InnerContainer>
    </StyledView>
)


export default Container
