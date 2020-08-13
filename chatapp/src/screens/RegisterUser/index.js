import React,{useState} from 'react'
import { View, Text, ImageBackground, TouchableOpacity, ScrollView, KeyboardAvoidingView  } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

import styles from './styles'
import { theme01, theme02 } from '../../constants/Theme'
import {userData} from '../../store/modules/User/action'
import Input from '../../components/Input'
import api from '../../services/api'


export default function RegisterUser() {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const theme = useSelector(state => state.globalState.theme)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')

    function handleUserData(data){
        const {name, email, image, phone,room,id} = data
        const dt ={
            name,
            email,
            image,
            phone,
            id,
            room
        }
        dispatch(userData(dt) )
        navigation.navigate('Home')
    }


    async function Register(){
        if(!name || !email || !phone || !password || !confPassword) return alert('Preencha todos os campos')

        if(!(IsEmail(email))) return  alert('Preencha o campo do email corretamente') 

        if(confPassword !== password) return  alert('Senhas diferentes')

        try {
            const response = await api.post('users',{
                name,
                email,
                phone,
                image: '',
                password
            })

            await AsyncStorage.setItem('token',response.data.token)
            await alert('Cadastro com sucesso!')
            handleUserData(response.data)

        } catch (error) {
            alert('Email já existente')
        }
    }
    function IsEmail(email){
        var er = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);
        if(!er.test(email) ) { 
            return false; 
        }else{
            return true
        }

    }

    return (

        <View style={styles.container}>
            <ImageBackground resizeMode='stretch' source={theme ? theme01.rgisterBackgound : theme02.rgisterBackgound} style={styles.image} >
                <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.back}>
                    <Icon name='keyboard-backspace' size={30} color='#fff'/>
                </TouchableOpacity>
                <ScrollView showsVerticalScrollIndicator={false} >
                <KeyboardAvoidingView style={{marginBottom:20}} behavior='padding'>
                        <Input value={name} setName={setName} color={theme ? theme01.color : theme02.color} keyboardType='default' secure={false} colorInput='gray' borderColor={theme ? theme01.color : theme02.color}  name='Name' placeholder='Your Name...' />
                        <Input value={email} setName={setEmail} color={theme ? theme01.color : theme02.color} keyboardType='email-address' secure={false} colorInput='gray' borderColor={theme ? theme01.color : theme02.color}  name='Email' placeholder='Your Email...' />
                        <Input value={phone} setName={setPhone} color={theme ? theme01.color : theme02.color} keyboardType='phone-pad' secure={false} colorInput='gray' borderColor={theme ? theme01.color : theme02.color} name='Phone' placeholder='Your Phone...' />
                        <Input value={password} setName={setPassword} color={theme ? theme01.color : theme02.color} keyboardType='default' secure={true} colorInput='gray' borderColor={theme ? theme01.color : theme02.color} name='Password' placeholder='Your Password...' />
                        <Input value={confPassword} setName={setConfPassword} color={theme ? theme01.color : theme02.color} keyboardType='default' secure={true} colorInput='gray' borderColor={theme ? theme01.color : theme02.color} name='Confirm Password' placeholder='Your confirm Password...' />
                        <TouchableOpacity onPress={Register} style={styles.touchButton}>
                            <LinearGradient style={styles.button} colors={theme ? theme01.colors : theme02.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} >
                                <Text style={styles.buttonText}>Cadastrar</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </ScrollView>
            </ImageBackground>

        </View>

    )
}


