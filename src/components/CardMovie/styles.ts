import styled from 'styled-components/native'

import { colors, fonts } from '../../styles'

export const Container = styled.View`
    width: 100%;
    height: 100%;
`
export const CardImage = styled.Image`
    width: 100%;
    height: 80%;
    border-radius: 20px;
`
export const Title = styled.Text`
    font-size: 18px;
    font-family: ${fonts.Text1};
    color: ${colors.white};
    padding-right: 20px;
    padding-left: 10px;
    margin-top: 10px;
`

