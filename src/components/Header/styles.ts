import styled from 'styled-components/native'
import { colors, fonts } from '../../styles'

export const Container = styled.View`
    flex-direction: row;
    width: 100%;
    padding: 30px 40px;
    align-items: center;
    justify-content: space-between;
`
export const TextGreating = styled.Text`
    font-size: 22px;
    color: ${colors.white};
    padding-bottom: 5px;
    font-family: ${fonts.Text1};
`
export const TextUser = styled.Text`
    font-size: 22px;
    color: ${colors.white};
    font-family: ${fonts.Text2};
`
export const Subtitle = styled.Text`
    font-size: 14px;
    color: ${colors.gray_light};
    font-family: ${fonts.Text1};
`
export const ImageContainer = styled.Image`
    height: 60px;
    width: 60px;
    border-radius: 40px;
`


