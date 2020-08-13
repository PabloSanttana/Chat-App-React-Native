import React from 'react'
import { View, Text,ImageBackground, TouchableOpacity, Image, TextInput,Keyboard, Alert  } from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Sign from 'react-native-vector-icons/Entypo'
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

import {Search} from '../../store/modules/search_theme/action'
import {userData} from '../../store/modules/User/action'
import styles from './styles'
import {theme01,theme02} from '../../constants/Theme'

export default function Header(){
    const navigation = useNavigation()
    const search = useSelector(state => state.globalState.search)
    const theme = useSelector(state => state.globalState.theme )
    const UserData = useSelector(state => state.userData )
    const dispatch = useDispatch()
    var image;
   
    if(UserData.image === ''){
        image = theme ? theme01.avatar: theme02.avatar
    }

    async function onchangeSearch(e){
        dispatch(Search(e))
    }
    function navigateSin_out(){

        Alert.alert(
            "Alert",
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
            <ImageBackground  resizeMode='stretch' source={theme ? theme01.header: theme02.header} style={styles.imageBackground}  >
                <TouchableOpacity  onPress={() => navigation.navigate('Profile')}>
                    <Image source={UserData.image === ''? image:{uri: UserData.image}} style={styles.avatar} />
                </TouchableOpacity>
                <View style={styles.actionContainer}>
                    <Text numberOfLines={1} style={styles.name}>{UserData.name}</Text>
                    <View style={styles.action}>
                        <TouchableOpacity onPress={navigateSin_out} >
                            <Sign name='log-out' size={23} color='#fff'/>
                        </TouchableOpacity>
                    </View>
                </View> 
            </ImageBackground>
            <View style={styles.inputSerach}>
                   <TextInput value={search} onChangeText={onchangeSearch} style={styles.input} placeholder='Search' />
                   {search? <TouchableOpacity  onPress={()=>[onchangeSearch(''),Keyboard.dismiss()]}>
                       <Icon name='close' color='gray' size={20}/> 
                    </TouchableOpacity>
                   :null}
               </View>
        </View>
    )
}
