import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity,  } from 'react-native'
import { useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/Feather'
import Modal from 'react-native-modal'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import io from 'socket.io-client'



import styles from './styles'
import { theme01, theme02 } from '../../../constants/Theme'
import api from '../../../services/api'
import localhost from '../../../services/localhost'
let socket
socket = io(localhost.url)
export default function ContentMessages({item,modalActiv,newroom}) {
    const navigation = useNavigation()
    const theme = useSelector(state => state.globalState.theme)
    const userId = useSelector(state => state.userData.id)
    const EDIT = useSelector(state => state.userData.edit)
    const room = useSelector(state => state.userData.room)
    const [data, setData] = useState()
    const [addContact, setAddContact] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false)
    const [messsagePreview, setMesssagePreview] = useState()
    const userRoom = item ? item.from_user === userId ? item.to_user : item.from_user : null
    
    let avatar = theme ? theme01.avatar : theme02.avatar
    const messageIcon = messsagePreview? messsagePreview.from_user===userId? false : true :null
    
    useEffect(() => {

        async function getContact(){
            const token = await AsyncStorage.getItem('token')

            try {
                const responseContact = await api.get(`contact/${userRoom}`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }) 
                const responseUser = await api.get(`user/${userRoom}`,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                })
                const {id, name} = responseContact.data
               setData({
                   ...responseUser.data,
                   name,
                   id_edit:id
               })
               SocketON(responseUser.data.room)
        
            } catch (error) {

                if(userRoom){

                    const response = await api.get(`user/${userRoom}`,{
                            headers:{
                                Authorization:`Bearer ${token}`
                            }
                    })
                    setData({
                        name: response.data.phone,
                        image: '',
                        room: response.data.room,
                        email: response.data.email,
                        id_edit: null
                    })
                    SocketON(response.data.room)
                    setAddContact(true)
                    

                }
            }
            
        }
        async function SocketON(data){
            const token = await AsyncStorage.getItem('token')
            const on_socket ={
                token: `Bearer ${token}`,
                room:`${(room)+(data)}`,
                from_user:item.from_user,
                to_user:item.to_user,
            }
            socket.emit('join', on_socket,()=>{alert('User not found')})
           
           
        }
        
        getContact()

    },[EDIT])

    useEffect(()=>{
        socket.on('message',(message)=>{
            console.log('messagem preview')
            if(message.room === `${item.room}` ){
                messsagePreviewGet()
            }
            if(message.from_user === userId || message.to_user === userId){
                // newroom()
             }
           
        })
        messsagePreviewGet()
    },[])

    async function messsagePreviewGet(){
        const token = await AsyncStorage.getItem('token')

        try {
            const response = await api.get(`contact/message/preview/${item.room}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }) 

            setMesssagePreview(response.data)
            
        } catch (error) {
            alert('Error inesperado')
        }
           
    }


    data? data.image ===''? null :   avatar = {uri: data.image } :null

    function toggleModal() {
        setModalVisible(!isModalVisible)
    }
    function navigateToContactDetail() {
        const dataContact ={
            ...data,
            image:avatar,
        }
        navigation.navigate('ContactDetail', { dataContact })
        setModalVisible(!isModalVisible)
    }

    function ContactAdd(){
        setModalVisible(!isModalVisible)
        modalActiv(data.email)
    }

    function timeMessage(date){
        const DATE = new Date()
        const year = DATE.getFullYear()	
        const month = (DATE.getMonth() + 1 )
        const day = DATE.getDate()
    
        const messageDate = date.split(' ')
        const [date_Message, hour_Messge] = messageDate
        
        const [yearMessage, monthMessage,dayMessage ] = date_Message.split('-')
        const [hourMessage,MinMessage, secMessage ] = hour_Messge.split(':')

       if((year-yearMessage) === 0 ){
           if((month - monthMessage) === 0){

            if(Math.abs(day - dayMessage) === 0){

                return `${hourMessage}:${MinMessage}`
            }else if(Math.abs(day - dayMessage) === 1){
                return 'Ontem'
            }else{
                return `${dayMessage}/${monthMessage}/${yearMessage}`
            }

           }else{
            return `${dayMessage}/${monthMessage}/${yearMessage}`
           }

       }else{
           return `${dayMessage}/${monthMessage}/${yearMessage}`
       }
        
        
        
    }

    function navigateToChat(){
        const chatUser = {
            ...data,
            ...item,
            room:`${(room)+(data.room)}`,
            image:  avatar,
        }
        setModalVisible(false)
        navigation.navigate('Chat',{chatUser})
    }
    

    return (
        <>
            <TouchableOpacity onPress={() =>navigateToChat()}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={toggleModal}>
                        <Image source={avatar} style={styles.avatar} />
                    </TouchableOpacity>
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>{ data ?data.name: null}</Text>
                        <Text numberOfLines={1} style={styles.message}>{messsagePreview? messsagePreview.message: null}</Text>
                    </View>

                    <View style={styles.tempMessage}>
                        <Text style={styles.time}>{messsagePreview? timeMessage(messsagePreview.date): null}</Text>
                    {messageIcon &&
                        <View style={{ ...styles.NumMessages, backgroundColor: theme ? theme01.color : theme02.color }} >
                            <Text style={styles.NumText} >!</Text>
                        </View>
                    }   
                    </View>

                </View>
            </TouchableOpacity>




            <Modal useNativeDriver={true} animationInTiming={500} animationOutTiming={900} isVisible={isModalVisible}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={toggleModal} style={styles.buttonCancelModal} />
                    <View style={styles.modalDetail}>
                        <TouchableOpacity onPress={toggleModal} style={styles.closeModal}>
                            <Icon name='arrow-left' size={35} color={theme ? theme01.color : theme02.color} />
                        </TouchableOpacity>
                        <Image source={avatar} style={{ ...styles.avatarModal, borderColor: theme ? theme01.color : theme02.color }} />
                        <Text numberOfLines={1} style={{ ...styles.textModal, fontWeight: 'bold', marginTop: 10 }}>{data ?data.name: null}</Text>
                        <Text numberOfLines={1} style={styles.textModal} >{data ?data.email: null}</Text>
                        <View style={styles.grupButtonModal}>
                            <TouchableOpacity onPress={navigateToChat} >
                                <Icon name='message-square' size={30} color={theme ? theme01.color : theme02.color} />
                            </TouchableOpacity>

                         {addContact?
                            <TouchableOpacity onPress={ContactAdd}>
                                <Icon name='plus-circle' size={30} color={theme ? theme01.color : theme02.color} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity onPress={navigateToContactDetail}>
                                <Icon name='alert-circle' size={30} color={theme ? theme01.color : theme02.color} />
                            </TouchableOpacity>
                        
                        }   

                        </View>
                    </View>
                    <TouchableOpacity onPress={toggleModal} style={styles.buttonCancelModal} />
                </View>

            </Modal>
        </>
    )
}


