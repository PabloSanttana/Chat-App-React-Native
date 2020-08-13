import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container:{
        flex:1,
    },
    add:{
        width:45,
        height:45,
        borderRadius: 25
    },
    button:{
        position:'absolute',
        bottom:10,
        right:40,
        elevation:4
    },
    modal:{
        width:'100%',
        height:400,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        borderRadius:5
    },
    back:{
        position:'absolute',
        left:15,
        top:15,
        elevation:7
    },
    save:{
        position:'absolute',
        bottom:15,
        right:15,
        elevation:7
    },
    addIcon:{
        position:'absolute',
        top:15,
        left:'40%'
    }
   
})
