import React,{useState} from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {useSelector, useDispatch} from 'react-redux'


import styles from './styles'
import {theme01, theme02} from '../../constants/Theme'
import ButtonText from '../../components/ButtonText'

export default function Camera(){
    const [file, setFile] = useState()
    const theme = useSelector(state => state.globalState.theme)
    const color = theme ? theme01.color : theme02.color

    function imagePickerCallback(data){
        if(data.didCancel){
            return
        }
        if(data.error){
            return
        }
        if(!data.uri){
            return
        }
        setFile(data)
    }
    function cancel(){
        setFile()
    }
    return (
        <View style={styles.container}>
             {file? <Image style={styles.image} source={{uri: file.uri}} />: <View  style={styles.image} />}
            <TouchableOpacity style={{marginTop:20}} onPress={() =>ImagePicker.showImagePicker({},imagePickerCallback)}>
                <Icon name='camera' size={100} color={color} />
            </TouchableOpacity>
           {file? 
                <View style={styles.grupButton}>
                    <TouchableOpacity onPress={cancel} style={styles.button}>
                        <ButtonText name="Cancelar" border={20} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <ButtonText name="Enviar" border={20} />
                    </TouchableOpacity>

                </View>

           :null}
        </View>
    )
}
