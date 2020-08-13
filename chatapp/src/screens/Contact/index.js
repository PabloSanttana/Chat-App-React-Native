import React,{useEffect,useState} from 'react'
import { View, Text,TouchableOpacity, } from 'react-native'
import {useSelector,useDispatch} from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Modal from 'react-native-modal'
import AsyncStorage from '@react-native-community/async-storage'

import styles from './styles'
import ListsContact from '../../components/ListsContact'
import {theme01, theme02} from '../../constants/Theme'
import api from '../../services/api'
import Input from '../../components/Input'
import Button from '../../components/Button'
import {editContact} from '../../store/modules/User/action'

export default function Contact(){
    const dispatch = useDispatch()
    const search = useSelector(state=>  state.globalState.search )
    const theme = useSelector(state => state.globalState.theme)
    const EDIT = useSelector(state => state.userData.edit)
    const color = theme ? theme01.color : theme02.color
    const [data, setData ] = useState([])
    const [data_temp, setData_temp] = useState([])
    const [isModalVisible, setModalVisible] = useState(false)
    const [contactName, setContactName]= useState('')
    const [contactEmail, setContactEmail]= useState('')

    useEffect(()=>{
        async function getContacts(){
            const token = await AsyncStorage.getItem('token')
            try {
                const response = await api.get('contacts',{
                    headers: {
                        Authorization:`Bearer ${token}`
                    }
                })
                setData(response.data)
                setData_temp(response.data)
            } catch (error) {
                alert('Erro inesperado tente novamente')
            }
        }
        getContacts()
    },[EDIT])

    useEffect(()=>{
        function Search(text){
           setData(data_temp.filter(e => e.name.toLowerCase().includes(text.toLowerCase())))
        }
        Search(search)

    },[search])

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
            dispatch(editContact(Math.round(Math.random() * 1000)))
           }
           setModalVisible(false)
        } catch (error) {
           return alert('Contato já existente ou email invalido')
        }
        setContactName('')
        setContactEmail('')

    }

    return (
        <>
        <View style={styles.container}>
          <ListsContact data={data}  pag={false} />

          <TouchableOpacity onPress={() =>setModalVisible(!isModalVisible)} style={[styles.add,styles.button]}>
                <Button size={20} name='add' border={25}/>
          </TouchableOpacity>
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
