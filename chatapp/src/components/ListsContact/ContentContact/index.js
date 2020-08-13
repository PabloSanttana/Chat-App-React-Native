import React,{useState, useEffect} from 'react'
import { View, Text, Image, TouchableOpacity,  } from 'react-native'
import {useSelector} from 'react-redux'
import Icon from 'react-native-vector-icons/Feather'
import Modal from 'react-native-modal'
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

import styles from './styles'
import {theme01,theme02} from '../../../constants/Theme'
import api from '../../../services/api'

export default function ContentContact({item}){
        const navigation = useNavigation()
        const theme = useSelector(state => state.globalState.theme)
        const [data, setData] = useState()
        const [isModalVisible, setModalVisible] = useState(false)
        const userId = useSelector(state => state.userData.id)
        const room = useSelector(state => state.userData.room)
       
        let avatar = theme? theme01.avatar: theme02.avatar
        useEffect(()=>{
            async function getUser(){
                const token = await AsyncStorage.getItem('token')
                try {
                    const response = await api.get(`user/${item.contact_id}`,{
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    })
                    setData(response.data)
                } catch (error) {
                   
                }
            }
            getUser()
        },[item.contact_id])


    data? data.image ===''? null :   avatar = {uri: data.image } :null
       
    function toggleModal(){
        setModalVisible(!isModalVisible)
    }
    function navigateToContactDetail(){
        const dataContact ={
            ...data,
            name: item.name,
            image:avatar,
            id_edit: item.id
        }
        navigation.navigate('ContactDetail',{dataContact})
        setModalVisible(false)
    }
    function navigeToChat(){
        const chatUser ={
            to_user:data.id,
            from_user:userId,
            room: `${(room)+(data.room)}`,
            name: item.name,
            image:avatar,
            id_edit: item.id
        }
        setModalVisible(false)
        navigation.navigate('Chat',{chatUser})
    }

    return (
        <>
        <TouchableOpacity onPress={navigeToChat}>
            <View style={styles.container}>
                <TouchableOpacity onPress={toggleModal}>
                    <Image source={avatar} style={styles.avatar} />
                </TouchableOpacity>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text numberOfLines={1} style={styles.message}>{data? data.phone: null }</Text> 
                </View>

                 <TouchableOpacity style={styles.phone}>
                     <Icon name='phone' color={ theme? theme01.color: theme02.color } size={25}/>
                 </TouchableOpacity>
            
            </View>
        </TouchableOpacity>


        <Modal useNativeDriver={true}   animationInTiming={500} animationOutTiming={900} isVisible={isModalVisible}>
            <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity onPress={toggleModal} style={styles.buttonCancelModal} />
                    <View style={styles.modalDetail}>
                        <TouchableOpacity onPress={toggleModal} style={styles.closeModal}>
                            <Icon name='arrow-left' size={35} color={theme? theme01.color: theme02.color}/>
                        </TouchableOpacity>
                        <Image source={avatar} style={{...styles.avatarModal, borderColor:theme? theme01.color: theme02.color }} />
                        <Text numberOfLines={1} style={{...styles.textModal,fontWeight:'bold',marginTop:10}}>{item.name}</Text>
                        <Text numberOfLines={1} style={styles.textModal} >{data? data.email:  null}</Text>
                        <View style={styles.grupButtonModal}>
                            <TouchableOpacity onPress={navigeToChat}>
                                <Icon name='message-square' size={30} color={theme? theme01.color: theme02.color}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={navigateToContactDetail}>
                                <Icon name='alert-circle' size={30} color={theme? theme01.color: theme02.color}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                <TouchableOpacity  onPress={toggleModal} style={styles.buttonCancelModal} />
            </View>
          
        </Modal>
    </>
    )
}

