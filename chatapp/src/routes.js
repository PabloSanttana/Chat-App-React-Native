import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {useSelector} from 'react-redux'

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator()


import Login from './screens/Login'
import Message from './screens/Message'
import Header from './components/Header'
import Contact from './screens/Contact'
import Camera from './screens/Camera'
import {theme02,theme01} from './constants/Theme'
import TabNofication from './components/Tab'
import RegisterUser from './screens/RegisterUser'
import Profile from './screens/Profile'
import ContactDetail from './screens/ContactDetail'
import Chat from './screens/Chat'



export function TabRoutes(){
const theme = useSelector(state => state.globalState.theme)
const notification ={
    active : useSelector(state => state.globalState.notification),
    value : useSelector(state => state.globalState.notificationValue)
} 

const tabBarOptionsStyles ={
    showIcon:true,
    showLabel : true,
    activeTintColor: theme? theme01.color: theme02.color,
    inactiveTintColor:'gray',
    style: { backgroundColor: '#fff',},
    labelStyle:{fontWeight:'bold',fontSize:14},
    indicatorStyle:{backgroundColor: theme? theme01.color: theme02.color}  
}
    return(
            <>
            <Header/>
            <Tab.Navigator initialRouteName='Messages'  tabBarOptions={tabBarOptionsStyles}>
                
                <Tab.Screen name='Camera'  component={Camera}/>
                <Tab.Screen name='Messages' options={ notification.active ? { tabBarLabel:({color})=> <TabNofication name='MESSAGES' color={color} number={notification.value}/> }:{}}  component={Message}/>
                <Tab.Screen name="Contacts" component={Contact} />

            </Tab.Navigator>
            </>
    )
}

export default function Routes(){
    return(
        <NavigationContainer>
           <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Home' component={TabRoutes} />
            <Stack.Screen name='RegisterUser' component={RegisterUser} />
            <Stack.Screen name='Profile' component={Profile} />
            <Stack.Screen name='ContactDetail' component={ContactDetail} />
            <Stack.Screen name='Chat' component={Chat} />
        </Stack.Navigator>
        </NavigationContainer>
    )
}


