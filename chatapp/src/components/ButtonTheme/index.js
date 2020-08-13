import React,{useState} from 'react'
import { View, Text, Animated, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {useSelector, useDispatch} from 'react-redux'


import {theme01, theme02} from '../../constants/Theme'
import {Theme} from '../../store/modules/search_theme/action'
import styles from './styles'

export default function ButtonTheme() {
    const dispatch = useDispatch()
    const theme = useSelector(state => state.globalState.theme)
    const [button, setButton] = theme? useState( new Animated.Value(8)) : useState( new Animated.Value(-8))
    function toggleTheme() {
        let teste;
       if(theme){
        Animated.timing(button,{
            toValue:-8,
            duration: 200,
            useNativeDriver: true
        }).start()
       }else{
        Animated.timing(button,{
            toValue:8,
            duration: 200,
            useNativeDriver: true
        }).start()
       } 
       teste = setInterval(()=>{
        dispatch( Theme(!theme) ) 
        clearInterval(teste)
       },50)
      
    }
    return (
        <LinearGradient style={styles.container} colors={ theme ? theme01.colors : theme02.colors} start={{x:0,y:0}} end={{x:1,y:1}} >
            <TouchableOpacity onPress={toggleTheme} style={{flex:1,justifyContent:'center'}} >
                    <Animated.View style={[
                        styles.circule,
                        {
                            transform:[
                                {translateX: button}
                            ]
                        }
                        ]}>
                
                        </Animated.View>
            </TouchableOpacity>
           
        </LinearGradient>
    )
}


