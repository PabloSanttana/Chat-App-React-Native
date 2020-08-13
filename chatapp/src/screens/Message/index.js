import React,{useState,useEffect} from 'react'
import { View,TouchableOpacity, Text  } from 'react-native'
import {useSelector,useDispatch} from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/MaterialIcons'


import styles from './styles'
import ListsContact from '../../components/ListsContact'
import {editContact} from '../../store/modules/User/action'
import {theme01, theme02} from '../../constants/Theme'
import Input from '../../components/Input'
import Button from '../../components/Button'
import api from '../../services/api'



export default function Message(){
    const search = useSelector(state=>  state.globalState.search )
    const theme = useSelector(state => state.globalState.theme)
    const userId = useSelector(state => state.userData.id)
    const dispatch = useDispatch()
    const [data, setData ] = useState()
    const [data_temp, setData_temp] = useState()
    const [contactName, setContactName]= useState('')
    const [contactEmail, setContactEmail]= useState('')
    const [isModalVisible, setModalVisible] = useState(false)

    const color = theme ? theme01.color : theme02.color

    useEffect(()=>{
       
        userRoom()
       
    },[]) 
    async function userRoom(){
        const token = await AsyncStorage.getItem('token')

        try {
            const response = await api.get('users/rooms',{
                headers:{
                   Authorization:`Bearer ${token}`
                }
            })
            setData(response.data)
            setData_temp(response.data)
        } catch (error) {
            alert('Nenhuma messagens')
        }
    }
    
    async function newRoomGet(room){
        console.log('validano Room')
        const valid = await data.find(e => e.room === room)
        console.log('vald',valid.room)
        if(valid.room === room) return
        console.log('get nova room')
        const token = await AsyncStorage.getItem('token')

        try {
            const response = await api.get(`users/new/rooms/${room}`,{
                headers:{
                   Authorization:`Bearer ${token}`
                }
            })
            console.log('cheguei')
            setData( data => [...data,response.data])
            setData_temp(data => [...data,response.data])
        } catch (error) {
            alert('Error na bucar por messagens')
        }

    }

    function modalActiv(text){
        setContactEmail(text)
        setModalVisible(!isModalVisible)
    }  

    async function handleAddContact(){
        const token = await AsyncStorage.getItem('token')

        if(contactName === '' ||contactEmail === '' ) return alert('Preencha todos os campos');

        try {
            const response = await api.post('contacts',{
                name:contactName,
                email:contactEmail
                },
                {
                    headers: {
                        Authorization:`Bearer ${token}`
                    }
                })
           const {id} = response.data
           alert('Adiconado com sucesso.')
           if(id){
            dispatch(editContact(Math.round(Math.random() * 10000)))
           }
           setModalVisible(false)
        } catch (error) {
           return alert('Contato já existente ou email invalido')
        }
        setContactName('')
        setContactEmail('')

    }


/*
    ajusta a logica
    useEffect(()=>{
        function Search(text){
           setData(data_temp.filter(e => e.name.toLowerCase().includes(text.toLowerCase())))
        }
        Search(search)

    },[search])
*/  
    return (
        <>
        <View style={styles.container}>
            <ListsContact data={data} newroom={userRoom} pag={true} modalActiv={modalActiv} />
        </View>
    
        <Modal  
            animationInTiming={500} 
            animationOutTiming={900}
            isVisible={isModalVisible}    
        >
            <View style={styles.modal}>
                <TouchableOpacity onPress={() =>setModalVisible(!isModalVisible)} style={[styles.add, styles.back]}>
                           <Button name='arrow-back' size={25} border={25}/>
                </TouchableOpacity>
        
                <Icon name='person-add' style={styles.addIcon} size={50} color={color}/>
 
                <View style={{width:'100%'}}>
                    <Input value={contactName} setName={setContactName} color={color} keyboardType='default' secure={false} colorInput='gray' borderColor={color}  name='Name' placeholder='Contact Name...' />
                    <Input value={contactEmail} setName={setContactEmail} color={color} keyboardType='email-address' secure={false} colorInput='gray' borderColor={color}  name='Email ' placeholder='Contact Email...' />
                </View>
                
                <TouchableOpacity onPress={handleAddContact} style={[styles.add,styles.save]}>
                    <Button name='add' size={25} border={25}/>
                </TouchableOpacity>
            </View>
            
        </Modal>
        </>
    )
    
}

