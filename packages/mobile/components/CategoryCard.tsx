import React from 'react';
import { Category } from '@approbado/lib/types/models'
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../screens/routes';
import { horizontalScale, scaleFontSize, verticalScale } from '../styles/scaling';
import styled from 'styled-components/native';
import Text from './Text';
import Row from './Row';

const Pressable = styled.Pressable`
    display: flex;
    justify-content: center;
    padding-vertical: ${props => verticalScale(props.theme.space[2])}px;
    padding-horizontal: ${props => horizontalScale(props.theme.space[4])}px;
    margin-vertical: ${props => verticalScale(props.theme.space[1])}px;
    width: 100%;
    height: ${verticalScale(100)}px;
    background-color: ${props => props.theme.palette.primary.light};
    border-radius: ${scaleFontSize(12)}px;
    position: relative;
`

const CategoryCard = ({ category }: { category: Category }) : JSX.Element => {
    const navigation = useNavigation();

    const handleNavigate = () => navigation.navigate(Routes.ShowCategory, {
        category: category
    })

    return (
        <Pressable key={category?.id} style={{
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.12,
            shadowRadius: 12,
            elevation: 6
        }}>
            <Row size={1}>
                <Text fontSize={24}>
                    {category?.name}
                </Text>
            </Row>
            <Row size={1}>
                <Text fontSize={20} fontWeight={400}>
                    {category?.triviasCount}

                    {category?.triviasCount > 1 ? ' trivias' : ' trivia'}
                </Text>
            </Row>
        </Pressable>
    )
}

export default CategoryCard;
