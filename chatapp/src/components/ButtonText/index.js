import React from 'react'
import { Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useSelector} from 'react-redux'

import styles from './styles'
import { theme01, theme02 } from '../../constants/Theme'

export default function ButtonText({name,border}){
    const theme = useSelector(state => state.globalState.theme)
    return (
        <LinearGradient style={{...styles.container,borderRadius: border}}colors={theme ? theme01.colors : theme02.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} >
                <Text style={styles.buttonText}>{name}</Text>
        </LinearGradient>
    )
}


