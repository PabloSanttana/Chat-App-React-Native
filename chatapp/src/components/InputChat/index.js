import React from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


import styles from './styles'
import {theme01,theme02} from '../../constants/Theme'

export default function InputChat({message,setMessage,sendMessage}){
    const theme = useSelector(state => state.globalState.theme)
    const color = theme ? theme01.color : theme02.color
    const colors = theme ? theme01.colors[0] : theme02.colors[0]
    return (
        <View style={styles.container}>
            <TextInput value={message} onChangeText={setMessage} multiline={true} placeholderTextColor='#fff' placeholder='Digite uma mensagem' style={{...styles.input,backgroundColor:colors}} />
            <TouchableOpacity onPress={() =>sendMessage()}>
                <Icon style={styles.icon} name='send-circle' size={50} color={color}/>
            </TouchableOpacity>
            
        </View>
    )
}

