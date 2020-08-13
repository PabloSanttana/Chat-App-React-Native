import React,{useState,useEffect,useRef} from 'react'
import { View, Text, TouchableOpacity, Image, FlatList, TextInput } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import LinearGradient from 'react-native-linear-gradient'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigation, useRoute} from '@react-navigation/native'
import io from 'socket.io-client'

import {theme01,theme02} from '../../constants/Theme'
import ChatMessage from '../../components/ChatMessge'
import api from '../../services/api'
import localhost from '../../services/localhost'
import InputChat from '../../components/InputChat'
import styles from './styles'

let socket
socket = io(localhost.url)
export default function Chat() {
    const {chatUser} = useRoute().params
    const flatlistRef = useRef(null)
    const navigation = useNavigation()
    const theme = useSelector(state => state.globalState.theme)
   
    const colors = theme ? theme01.colors : theme02.colors
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    console.log(`name:${chatUser.name} room:${chatUser.room}`)
   

    useEffect(()=>{
        async function SocketON(){
            setLoading(true)
            const token = await AsyncStorage.getItem('token')
           
            const on_socket ={
                token: `Bearer ${token}`,
                room:`${chatUser.room}`,
                from_user:chatUser.from_user,
                to_user:chatUser.to_user,
            }
           
            socket.emit('join', on_socket,()=>{alert('User not found')})
         
            setLoading(false)
            if(!loading){
                getMessages(chatUser.room)
            }
           
        }
        SocketON()

        async function getMessages(room){
            const token = await AsyncStorage.getItem('token')

            try {
                const response = await api.get(`contact/message/${room}`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
              
                setMessages(response.data)
                
            } catch (error) {
               alert('Erro no Chat')
            }
        }
        
    },[])

    
    useEffect(()=>{
            socket.on('message',(message)=>{
                console.log('oioi')
                if(message.room.toString() === chatUser.room.toString()){
                    setMessages( messages => [...messages, message])
                }
            })
            console.log('Socket.on')
    },[])
    
   

    function handleSendMessage(){
        const DATE = new Date();
        const id_temp = DATE.getTime()
        const year = DATE.getFullYear()
        const hours = DATE.getHours()
        const min = DATE.getMinutes()
        const BodyMesssage = {
            from_user:chatUser.from_user,
            to_user:chatUser.to_user,
            message,
            id: id_temp,
            room:chatUser.room,
            created_at: `${year}-00-00 ${hours}:${min}:00`
        }
        console.log('bodyMessage',BodyMesssage)
        if(message){
            socket.emit('sendMessage', BodyMesssage, messageCallback)
        }
    }
    function messageCallback(text){
       if(text){
        setMessage('')
       }else{
           alert('Chat Invalido')
           setMessage('')
       }
    }
    function navigateToContactDetail() {
        const dataContact ={
            ...chatUser
        }
        navigation.navigate('ContactDetail', { dataContact })
    }

    return (
        <View style={styles.container}>
            <LinearGradient style={styles.headerContainer}colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} >
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity onPress={()=> navigation.goBack()}>
                            <Icon name='arrow-left' size={30} color="#fff"/>
                        </TouchableOpacity>
                        <Image source={chatUser.image} style={styles.avatar} />
                        <Text numberOfLines={1} style={styles.name}>{chatUser.name}</Text>
                    </View>

                    <View style={styles.headeRight}>
                      {chatUser.id_edit&& 
                        <TouchableOpacity onPress={navigateToContactDetail}>
                            <Icon name='dots-vertical' size={30} color='#fff'/>
                        </TouchableOpacity>
                      } 
                    </View>

                </View>
            </LinearGradient>
          
            <FlatList
                    onContentSizeChange={() => flatlistRef.current.scrollToEnd({animated: true})}
                    onLayout={() => flatlistRef.current.scrollToEnd({animated: true})}
                    ref={flatlistRef}
                    style={{ flex:1}}
                    data={messages}
                    renderItem={({ item }) => <ChatMessage data={item} />}
                    keyExtractor={item => item.id.toString()}
                    />
            <InputChat message={message} setMessage={setMessage} sendMessage={handleSendMessage} />
        </View>
    )
}
