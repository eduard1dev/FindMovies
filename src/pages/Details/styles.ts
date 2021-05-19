import styled from 'styled-components/native'

import { colors, fonts } from '../../styles'

interface WatchLaterButtonProps {
    active: boolean,
}

export const Container = styled.View`
    flex: 1;
    background-color: ${colors.gray_dark};
    align-items: center;
`
export const IconContainer = styled.TouchableOpacity`
    position: absolute;
    left: 20px;
    top: 20px;
`
export const ImageContainer = styled.Image`
    width: 100%;
    height: 60%;
`
export const DetailsContainer = styled.View`
    flex: 1;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
    elevation: 10;
    padding: 0 20px;
    padding-top: 10px;
`
export const HeaderDetails = styled.View`
    flex-direction: row;
    width: 100%;
    align-items: flex-end;
`
export const Title = styled.Text`
    font-size: 18px;
    color: ${colors.white};
    font-family: ${fonts.Text1};
    margin-top: 10px;
`
export const Subtitle = styled.Text`
    font-size: 14px;
    color: ${colors.white};
    font-family: ${fonts.Text2};
    margin-top: 10px;
    text-align: justify;
`
export const DetailPseudoButton = styled.View`
    height: 30px;
    padding: 0 5px;
    background-color: ${colors.gray};
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    margin-right: 10px;
`
export const TextDetail = styled.Text`
    font-size: 18px;
    color: ${colors.white};
    font-family: ${fonts.Text1};
`
export const WatchLaterButton = styled.TouchableOpacity<WatchLaterButtonProps>`
    height: 30px;
    padding: 0 10px;
    background-color: ${({ active }) => active ? colors.red : colors.gray};
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    margin-left: auto;
`