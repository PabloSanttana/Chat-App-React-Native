import React from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import styles from './styles'
import {theme01,theme02} from '../../constants/Theme'

export default function ChatMessage({data}){
    const userId = useSelector(state => state.userData.id)
    const theme = useSelector(state => state.globalState.theme)
    const color = theme ? theme01.colors[0] : theme02.colors[0]
    const I = data.from_user === userId? true : false

    const [date, hours] = data.created_at.split(' ')
    const [hour,min] = hours.split(':')

    return (
        <View style={styles.container}>
           {!I? 
                <View style={styles.left}>
                    <Icon style={styles.leftIcon} name='network-strength-4' color='gray' size={15}/>
                    <Text style={styles.leftText}>{data.message}</Text>
                    <Text style={styles.leftTemp}>{`${hour}:${min}`}</Text>
                </View>
            :
                <View style={{...styles.right,backgroundColor:color}}>
                    <Icon style={styles.rightIcon} name='network-strength-4' color={color} size={15}/>
                    <Text style={styles.rightText}>{data.message}</Text>
                    <Text style={styles.rightTemp}>{`${hour}:${min}`}</Text>
                </View>   
            }
       </View>
    )
}


