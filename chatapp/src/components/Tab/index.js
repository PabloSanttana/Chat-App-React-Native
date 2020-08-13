import React from 'react'
import { View, Text } from 'react-native'

import styles from './styles'

export default function Tab({name,color, number}){
    let notification = '0'

    if(number >= 10){
        notification ='9+'
    }else{
        notification =`${number}`
    }

    return (
        <View style={styles.container}>
            <Text style={{...styles.name,color}} >{name}</Text>
            <View style={{...styles.notification,backgroundColor:color}}>
                <Text style={{color:'#fff',fontSize:10}}>{notification}</Text>
            </View>
        </View>
    )
}


