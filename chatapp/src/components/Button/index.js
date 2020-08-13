import React from 'react'
import { View, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {useSelector} from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'

import styles from './styles'
import {theme01, theme02} from '../../constants/Theme'

export default function Button({name,size, border}){
    const theme = useSelector(state => state.globalState.theme)
    return (
            <LinearGradient style={{...styles.container,borderRadius: border}} colors={ theme ? theme01.colors : theme02.colors} start={{x:0,y:0}} end={{x:1,y:1}} >
                 <Icon name={name} size={size} color='#fff'/>
            </LinearGradient>
    )
}


