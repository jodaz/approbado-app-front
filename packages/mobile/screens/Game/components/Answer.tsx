import * as React from 'react'
import {
    Row,
    Text
} from '../../../components';
import styled, { useTheme } from 'styled-components';
import { horizontalScale, scaleFontSize, verticalScale } from '../../../styles/scaling';
import { CheckCircle2, XCircle } from 'lucide-react-native';

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
    const theme = useTheme()

    return (
        <Row align='left' direction='column'>
            <StyledAnswerContainer isError={!isRight}>
                {isRight ? (
                    <CheckCircle2
                        size={24}
                        color={theme.palette.info.success}
                        style={{
                            marginRight: 10
                        }}
                    />
                ) : (
                    <XCircle
                        size={24}
                        color={theme.palette.error.main}
                        style={{
                            marginRight: 10
                        }}
                    />
                )}
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
