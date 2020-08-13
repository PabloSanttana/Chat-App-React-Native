import React, { useState } from 'react'
import { View, Text,TextInput, Image, TouchableOpacity, ScrollView,Keyboard,StatusBar, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Add from 'react-native-vector-icons/MaterialIcons'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage'
import ImagePicker from 'react-native-image-picker'

import styles from './styles'
import { theme01, theme02 } from '../../constants/Theme'
import ButtonTheme from '../../components/ButtonTheme'
import api from '../../services/api'
import localhost from '../../services/localhost'
import {userData,userImage} from '../../store/modules/User/action'
import InfoCardUser from '../../components/InfoCardUser'




export default function Profile() {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const theme = useSelector(state => state.globalState.theme)
    const UserData = useSelector(state => state.userData)
    const color = theme ? theme01.color : theme02.color
    const ImageBackground = theme ? theme01.profileBackground : theme02.profileBackground
    const [isModalVisible, setModalVisible] = useState(false)
    const [isModalValue, setModalValue] = useState('')
    const [iconName, setIconName] = useState('account')
    const [name, setName] = useState(UserData.name)
    const [email, setEmail] = useState(UserData.email)
    const [phone, setPhone] = useState(UserData.phone)
    const [passwordPrevious, setPasswordPrevious] = useState('')
    const [passwordNew, setPasswordNew] = useState('')
    const [confPasswordNew, setConfPasswordNew] = useState('')
    const [uploadImage, setUploadImage] = useState(false)
    const [file, setFile] = useState()
    const [requestImage, setRequestImage] = useState()
    var image;
    
   
    if(UserData.image === ''){
        image = theme ? theme01.avatar: theme02.avatar
    }

    function toggleModalImage(){
        if(UserData.image === 'ok'){
            dispatch(userImage(requestImage))
        }
        setFile()

        if(uploadImage){
            var temp
            temp = setInterval(() => {
                setUploadImage(!uploadImage)
                clearInterval(temp)
            }, 600);
        }else{
            setUploadImage(!uploadImage)
        }
       
        
        setModalVisible(!isModalVisible);
    }
    function toggleModal(text,icon) {
        Keyboard.dismiss()
     
        setModalVisible(!isModalVisible);
        setIconName(icon)
        setModalValue(text)
    }
    async function handleUpdateUser(value){
        const token = await AsyncStorage.getItem('token')
        var user ={}
        if(value === 'name'){
            user={
                 name
            }
        }else if(value === 'email'){
            user={
                email
            }
        }else if(value === 'phone'){
            user ={
                phone
            }
        }else if(value === 'password'){

            if(passwordNew !== confPasswordNew) return alert('Senhas diferentes')

            user={
                passwordPrevious,
                passwordNew
            }

        }
        try {
            const response = await api.put('user',{...user},{
                headers: {
                    Authorization:`Bearer ${token}`
                }
            })
            setModalVisible(!isModalVisible);
            alert(response.data.status) 
            dispatch(userData(user))

        } catch (error) {
           if(user.passwordPrevious !== ''){
                return alert('Senha atual incorrenta') 
           } else{
            alert('Erro tente novamente')
           }    
          
        }
        setConfPasswordNew('')
        setPasswordNew('')
        setPasswordPrevious('')
    }

    function inputModal(value){
        if(value === 'name') return <TextInput value={name} onChangeText={setName} style={{...styles.textInputModal, borderBottomColor: color}}/>
        if(value === 'email') return <TextInput value={email} onChangeText={setEmail} style={{...styles.textInputModal, borderBottomColor: color}}/>
        if(value === 'phone') return <TextInput value={phone} keyboardType='name-phone-pad' onChangeText={setPhone} style={{...styles.textInputModal, borderBottomColor: color}}/>
        if(value === 'password'){
            return(
                <>
                 <TextInput placeholder='Senha atual' secureTextEntry={true} value={passwordPrevious} onChangeText={setPasswordPrevious} style={{...styles.textInputModal, borderBottomColor: color}}/>
                 <TextInput placeholder='Nova senha' secureTextEntry={true} value={passwordNew} onChangeText={setPasswordNew} style={{...styles.textInputModal, borderBottomColor: color}}/>
                 <TextInput placeholder='Confirmação da nova senha' secureTextEntry={true} value={confPasswordNew} onChangeText={setConfPasswordNew} style={{...styles.textInputModal, borderBottomColor: color}}/>
                 </>
            )
        } 
    }

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
        setRequestImage(UserData.image)
        dispatch(userImage('ok'))
    }

    async function uploadsImageProfile(){
        if(!file) return
        const token = await AsyncStorage.getItem('token')
        const formData = new FormData()
        formData.append('file',{
            uri :  file.uri,
            type:  file.type,
            name:  file.fileName,
            size: file.fileSize
        }
       )
       const config = {
        method: 'POST',
        headers: {
         'Accept': 'application/json',
         'Content-Type': `multipart/form-data`,
          Authorization:`Bearer ${token}`,
        },
        body: formData,
       }
    
      await fetch(localhost.url + "/user/image", config)
                .then(response => response.json())
                .then(data => {
                    alert(data.image)
                    dispatch(userImage(data.urlImage))
                    setModalVisible(!isModalVisible)
                    var temp
                    temp = setInterval(() => {
                        setUploadImage(!uploadImage)
                        clearInterval(temp)
                    }, 600);
                    
                })
                .catch(error => {
                    alert('Erro tente novamente')
                })
    }
    function navigateSin_out(){

        Alert.alert(
            "Opa!",
            "Deseja Sair?",
            [
              {
                text: "Cancel",
                onPress: () => {},
                style: "cancel"
              },
              { text: "OK", onPress: () => logoff() }
            ],
            { cancelable: false }
          );
         async function logoff(){
            await AsyncStorage.removeItem('token')
            const data ={
                name: '',
                email: '',
                phone: '',
                image: ''
            }
            dispatch(userData(data))
            navigation.navigate('Login')
          }

    }


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent barStyle="dark-content"  />
            <View style={styles.header}>
                <Image source={ImageBackground} style={styles.imageBackground} />
                <View style={styles.avatarContainer}>
                    <View style={styles.back}>
                        <TouchableOpacity style={styles.touchableOpacity} onPress={() => navigation.goBack()} >
                            <Icon name='keyboard-backspace' size={25} color={color} />
                        </TouchableOpacity>
                    </View>

                    <Image source={UserData.image === ''? image:{uri: UserData.image}} style={styles.avatar} />
                    <View style={styles.editAvatar}>
                        <TouchableOpacity onPress={toggleModalImage} style={styles.touchableOpacity}>
                            <Add name='add' size={30} color={color} />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

            <View style={styles.footer}>
                <ScrollView >

                    <InfoCardUser name='account' text={UserData.name} edit={true} active={()=>toggleModal('name','account')}/>
                    <InfoCardUser name='email' text={UserData.email} edit={true} active={()=>toggleModal('email','email')}/>
                    <InfoCardUser name='lock' text='Password' edit={true} active={()=>toggleModal('password','lock')}/>
                    <InfoCardUser name='phone' text={UserData.phone} edit={true} active={()=>toggleModal('phone','phone')}/>

                    <View style={styles.settingContainer}>
                        <View style={styles.setting}>
                            <Text style={styles.settingTitle}>Settings</Text>
                            <Icon name='settings' size={23} color={color} />
                        </View>
                        <View style={styles.buttontheme}>
                            <Text style={styles.themeText}>Theme</Text>
                            <View>
                                <ButtonTheme />
                            </View>

                        </View>
                        <TouchableOpacity onPress={navigateSin_out} style={styles.touchButton}  >
                            <LinearGradient style={styles.button} colors={theme ? theme01.colors : theme02.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} >
                                <Text style={styles.buttonText}>Sair</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
            <View >
                <Modal 
                animationInTiming={500} 
                animationOutTiming={900}
                isVisible={isModalVisible}
                
                >
                    {
                        uploadImage? 
                        
                        <View style={styles.modalImage}>
                            <View style={styles.avatarModal}>
                                <Image source={UserData.image === ''? image : {uri: file? file.uri : UserData.image}} style={styles.avatar} />
                            </View>
                           
                           <TouchableOpacity onPress={() => ImagePicker.showImagePicker({},imagePickerCallback)} style={{width:200,marginBottom:40}}>
                                <LinearGradient style={{...styles.button,borderRadius:10}} colors={theme ? theme01.colors : theme02.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} >
                                    <Text style={styles.buttonText}>Escolher imagem</Text>
                                </LinearGradient>
                           </TouchableOpacity>

                            <View style={styles.grupButtomModal}>
                                    <TouchableOpacity onPress={toggleModalImage} style={styles.modalButton}  >
                                        <LinearGradient style={styles.button} colors={theme ? theme01.colors : theme02.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} >
                                            <Text style={styles.buttonText}>Voltar</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={uploadsImageProfile} style={styles.modalButton}  >
                                        <LinearGradient style={styles.button} colors={theme ? theme01.colors : theme02.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} >
                                            <Text style={styles.buttonText}>Salvar</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>

                                </View>
                        </View> 
                        :
                        <View style={styles.modal}>
                           
                            <Icon style={{...styles.iconleft, alignSelf:'center'}} name={iconName} size={50} color={color} />
                            
                            {inputModal(isModalValue)}

                                <View style={styles.grupButtomModal}>
                                    <TouchableOpacity onPress={() => toggleModal('')} style={styles.modalButton}  >
                                        <LinearGradient style={styles.button} colors={theme ? theme01.colors : theme02.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} >
                                            <Text style={styles.buttonText}>Voltar</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleUpdateUser(isModalValue)} style={styles.modalButton}  >
                                        <LinearGradient style={styles.button} colors={theme ? theme01.colors : theme02.colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} >
                                            <Text style={styles.buttonText}>Salvar</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>

                                </View>
                        </View>
                    }
                    
                </Modal>
            </View>


        </View>
    )
}


