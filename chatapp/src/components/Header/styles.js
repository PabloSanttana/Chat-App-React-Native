import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    container:{
            backgroundColor:'#fff'
    },
    imageBackground:{
        width:'100%',
        height:153,
        flexDirection:'row'
    },
    avatar:{
        width:100,
        height:100,
        borderRadius:50,
        marginLeft:20,
        marginTop: 30,
        borderWidth:2,
        borderColor:'#fff'
    },
    actionContainer:{
        width:'50%',
        marginTop:30,
        marginLeft:27,
    },
    name:{
        width:'100%',
        fontSize:17,
        color:'#fff',
        fontWeight:'bold'
    },
    action:{
        flexDirection:'row',
        justifyContent:'flex-end',
        marginTop:5
    },
    inputSerach:{
        backgroundColor:'#dedede',
        width:'64%',
        position:'absolute',
        bottom:6,
        right:10,
        borderRadius:100,
        height:40,
        flexDirection:'row',
        alignItems:'center'
    },
    input:{
        paddingHorizontal:15,
        width:'90%'
    }
})