import * as React from 'react'
import {
    Row,
    Text
} from '../../../components';
import styled from 'styled-components';
import { horizontalScale, scaleFontSize, verticalScale } from '../../../styles/scaling';

const StyledAnswerContainer = styled.View`
    flex: 1;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    border-radius: ${scaleFontSize(6)}px;
    border-width: ${scaleFontSize(2)}px;
    padding-vertical: ${verticalScale(12)}px;
    padding-horizontal: ${horizontalScale(12)}px;
    border-color: ${props => props.isError
       ? props.theme.palette.error.main
       : props.theme.palette.info.success};
`

const Answer = ({ isRight, children }) => {
    return (
        <Row align='left' direction='column'>
            <StyledAnswerContainer isError={!isRight}>
                <Text
                    fontSize={18}
                    fontWeight={500}
                    color={isRight ? 'info' : 'error'}
                    variant={isRight ? 'success' : 'main'}
                >
                    {children}
                </Text>
            </StyledAnswerContainer>
        </Row>
    )
}

Answer.defaultProps = {
    isRight: false
}

export default Answer
