import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector, useDispatch } from 'react-redux'

import styles from './styles'
import { theme01, theme02 } from '../../constants/Theme'


export default function InfoCardUser({name,text,edit = false, active}) {
    const dispatch = useDispatch()
    const theme = useSelector(state => state.globalState.theme)
    const color = theme ? theme01.color : theme02.color
    return (
        <View style={styles.userData}>
            <Icon style={styles.iconleft} name={name} size={30} color={color} />
            <Text>{text}</Text>
           {
            edit?   <TouchableOpacity style={styles.iconright} onPress={active}>
                        <Icon name='square-edit-outline' size={25} color={color} />
                    </TouchableOpacity>
                :null
           } 
        </View>
    )
}


