import {StyleSheet} from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height';


export default StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    headerContainer:{
        width:'100%',
        height:60 + getStatusBarHeight(false),
        marginBottom:5
    },
    header:{
        marginTop:10 + getStatusBarHeight(false),
        marginHorizontal:10,
        flexDirection:'row',
       alignItems:'center',
       justifyContent:'space-between'
       
    },
    headerLeft:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    avatar:{
        width:40,
        height:40,
        borderRadius:20,
        marginLeft:5
    },
    name:{
        fontSize:16,
        color:'#fff',
        marginLeft:10,
        fontWeight:'bold',
        width:'70%'
    },
})