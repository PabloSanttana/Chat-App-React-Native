import React from 'react'
import { View, Text, TextInput } from 'react-native'

import styles from './styles'

export default function Input({name,color,placeholder,borderColor,colorInput,secure,keyboardType, value,setName }){
    return (
        <View style={{...styles.container,borderColor}}>
            <Text style={{...styles.name,color}}>{name}</Text>
            <TextInput value={value} onChangeText={setName} placeholder={placeholder} secureTextEntry={secure} keyboardType={keyboardType} style={{...styles.input,color:colorInput,borderColor}} />
        </View>
    )
}

