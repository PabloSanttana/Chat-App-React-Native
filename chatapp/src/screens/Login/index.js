import React,{useState, useEffect} from 'react'
import { Text, ImageBackground, View, TouchableOpacity, TextInput, Image, } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import LinearGradient from 'react-native-linear-gradient'
import {useNavigation} from '@react-navigation/native'
import {useSelector, useDispatch} from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'

import styles from './styles'
import {theme01, theme02} from '../../constants/Theme'
import {Theme} from '../../store/modules/search_theme/action'
import {userData} from '../../store/modules/User/action'
import api from '../../services/api'



export default function Login() {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const theme = useSelector(state => state.globalState.theme)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [secureText, setSecureText] = useState(true)

    useEffect(()=>{
        async function autoAuth(){
            const token = await AsyncStorage.getItem('token')

            if(token){
                try {
                    const response = await api.get('authenticate/token',{
                        headers: {
                            Authorization:`Bearer ${token}`
                        }
                    })

                    handleUserData(response.data)
                    
                } catch (error) {
                    
                }
            }
        }
        autoAuth()
    },[])
   
    function toggleTheme() {
        dispatch( Theme(!theme) )
    }

    function handleUserData(data){
        const {name, email, image, phone, id, room} = data
        const dt ={
            id,
            name,
            email,
            image,
            phone,
            room
        }
        dispatch(userData(dt) )
        setEmail('')
        setPassword('')
        navigateToHome()
    }

    function navigateToHome(){
        navigation.navigate('Home')
    }
    async function handleLogin(){
        if(!email || !password) return alert('Preencha todos os campos')

        try {
            const  response =  await api.post('authenticate',{
                        email,
                        password
                        })  
            await AsyncStorage.setItem('token',response.data.token)

            handleUserData(response.data)
        
        } catch (error) {
            alert('Email ou senha invalida')
        }


       
    }
   
    function navigateToRegisterUser(){
        navigation.navigate('RegisterUser')
    }
    return (
        <View style={styles.container}>
            <ImageBackground style={styles.headerContainer} resizeMode='stretch'
                source={theme ? theme01.backgound : theme02.backgound}>
                <TouchableOpacity onPress={toggleTheme} style={styles.buttonBack}>
                        <Icon name='sync' size={20} color='#FFF' />
                </TouchableOpacity>
                <Image resizeMode='center' source={theme ? theme01.logo : theme02.logo} style={styles.logo} />
            </ImageBackground>

            <View style={styles.footer}>
                <TextInput value={email} 
                        onChangeText={setEmail} 
                        autoCorrect={false} 
                        style={styles.textInput} 
                        placeholder='Email'
                        keyboardType='email-address'
                />
                <View style={{width:'70%'}}>
                    <TextInput 
                        value={password} 
                        onChangeText={setPassword} 
                        style={{...styles.textInput, width:'100%',paddingRight:33}}  
                        placeholder='Password' 
                        secureTextEntry={secureText}
                        keyboardType='default'
                    />
                    <TouchableOpacity style={styles.iconSecure} onPress={() =>setSecureText(!secureText)}>
                        <Icon name={secureText? 'low-vision': 'eye'} size={15} color={theme ? theme01.color : theme02.color}/>
                    </TouchableOpacity>
                   
                </View>
               

                <TouchableOpacity style={styles.touchButton} onPress={handleLogin} >
                    <LinearGradient style={styles.button} colors={ theme ? theme01.colors : theme02.colors} start={{x:0,y:0}} end={{x:1,y:1}} >
                            <Text style={styles.buttonText}>Login</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={navigateToRegisterUser}>
                    <Text style={styles.creater}>Cadastre-se</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
