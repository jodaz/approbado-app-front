import React from 'react';
import { ILinkProps } from '../types';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

const StyledLink = styled.TouchableOpacity`
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f0f0f0;
    width: 100%;
`;

const StyledText = styled.Text`
    color: ${props => props.theme.palette.info.main};
    font-size: 16px;
    text-align: ${props => props.align};
`

const Link = ({ to, children, ...restTextProps } : ILinkProps) : JSX.Element => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate(to);
    };

    return (
        <StyledLink onPress={handlePress}>
            <StyledText {...restTextProps}>{children}</StyledText>
        </StyledLink>
    );
};

Link.defaultProps = {
    fontSize: 20,
    align: 'left'
}

export default Link;
