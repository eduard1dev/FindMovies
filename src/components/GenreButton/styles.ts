import styled from 'styled-components/native'

import { RectButton } from 'react-native-gesture-handler'

import { colors, fonts} from '../../styles'

interface ButtonContainerProps {
    active: boolean,
}

export const Container = styled(RectButton)<ButtonContainerProps>`
    height: 40px;
    padding: 0 10px;
    background-color: ${({active}) => active ? '#fff' : colors.gray};
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    border-radius: 10px;
`
export const Name = styled.Text<ButtonContainerProps>`
    color: ${colors.gray_light};
    font-family: ${fonts.Text1};
    font-size: 18px;
`
