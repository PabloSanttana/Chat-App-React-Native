import {StyleSheet,Dimensions} from 'react-native'

const {width,height} = Dimensions.get('window')

export default StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:'#fafafa'
    },
    image:{
        flex:1,
        height:300,
        paddingHorizontal:30,
        paddingTop:80
    },
    back:{
        position:'absolute',
        top:30,
        left:15
    },
    touchButton:{
        width:'80%',
        alignSelf:'center',
        marginTop:50,
        backgroundColor:'#fff',
        elevation:10,
        borderRadius:30,
    },
    button:{
        width:'100%',
        height:40,
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center',
    },
    buttonText:{
        fontSize:18,
        color:'#fff',
        fontWeight:'bold'
    },
})