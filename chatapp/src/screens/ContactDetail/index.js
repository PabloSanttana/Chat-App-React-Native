import React,{useState} from 'react'
import { View, Image,TouchableOpacity,StatusBar, TextInput, Text,Keyboard, Alert, ImageBackground, StyleSheet  } from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native'
import {useSelector, useDispatch} from 'react-redux'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-community/async-storage'

import styles from './styles'

import Button from '../../components/Button'
import {theme01, theme02} from '../../constants/Theme'
import InfoCardUser from '../../components/InfoCardUser'
import ButtonText from '../../components/ButtonText'
import api from '../../services/api'
import {editContact} from '../../store/modules/User/action'
 

export default function ContactDetail(){
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const theme = useSelector(state => state.globalState.theme)
    const color = theme ? theme01.color : theme02.color
    const ImageBack = theme ? theme01.detailBackground : theme02.detailBackground
    const router = useRoute()
    const [isModalVisible, setModalVisible] = useState(false)
    const {dataContact} = router.params
    const [data, setData] = useState(dataContact)
    const [name, setName] = useState(data.name)


    function toggleModal() {
        Keyboard.dismiss()

        setModalVisible(!isModalVisible);
    }
   function handleDeleteContact(){
        Alert.alert(
            'Opa!',
            `Deseja delatar ${data.name} ?`,
            [
                {
                  text: "Cancel",
                  onPress: () => {},
                  style: "cancel"
                },
                { text: "Deletar", onPress: () => Delete() }
              ],
              { cancelable: false }
        )
        async function Delete(){
            const token = await AsyncStorage.getItem('token')
            const {id_edit} = data
           
               await api.delete(`contacts/${id_edit}`,{
                    headers: {
                        Authorization:`Bearer ${token}`
                    }
               }).then(response =>{
                    alert('Deletado com sucesso.')
                    dispatch(editContact(Math.round(Math.random() * 1000)))
                    navigation.goBack()
               }).catch(error =>{
                alert('Não autorizado')
               })
          
        }
    }
    async function handleEditContact(){
        const token = await AsyncStorage.getItem('token')
        const {id_edit} = data
        if(name === data.name) return alert('Nome ainda não foi alterado')

        try {
            const response = await api.put(`contacts/${id_edit}`,{
                name
            },
            {
                headers: {
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${token}`
                }
            })
            alert(response.data.status)
            setData({
                ...data,
                name
            })
            dispatch(editContact(Math.round(Math.random() * 1000)))
            toggleModal()
        } catch (error) {
            alert('Error tente novamente')
        }

    }

    return (
        <>
            <ImageBackground  source={ImageBack} style={styles.container}>
                <StatusBar backgroundColor="transparent" translucent barStyle="dark-content"  />
                <TouchableOpacity onPress={() =>navigation.goBack()} style={styles.back}>
                    <Button name='arrow-back' size={30} border={25} />
                </TouchableOpacity>
                <View style={styles.avatarContainer}>
                    <Image source={data.image} style={{...styles.avatar, borderColor: color,}}/>
                </View>
                <InfoCardUser name='account' text={data.name} edit={true} active={toggleModal}/>
                <InfoCardUser name='email' text={data.email} edit={false}/>
                <InfoCardUser name='phone' text={data.phone} edit={false}/>
                
                <TouchableOpacity onPress={handleDeleteContact} style={styles.buttonDelete}>
                    <Icon name='account-remove' size={40} color='#fff'/>
                </TouchableOpacity>
              
            </ImageBackground>

            <Modal  animationInTiming={500}   animationOutTiming={900} isVisible={isModalVisible} >
                <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity  onPress={toggleModal} style={styles.buttonCancelModal} />

                    <View style={styles.modal}>
                    <Icon style={{...styles.iconleft, alignSelf:'center'}} name='account' size={50} color={color} />
                        <TextInput value={name} autoCorrect={false} onChangeText={setName} style={{...styles.textInputModal, borderBottomColor: color}}/>

                        <View style={styles.grupButtom}>
                            <TouchableOpacity style={styles.button} onPress={toggleModal}>
                                <ButtonText name='voltar' border={20} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleEditContact}>
                                <ButtonText name='Salvar' border={20} />
                            </TouchableOpacity>
                       
                        </View>
                    </View>

                    <TouchableOpacity  onPress={toggleModal} style={styles.buttonCancelModal} />
                </View>
            </Modal>
        </>
    )
}


