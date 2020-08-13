import {StyleSheet, Dimensions} from 'react-native'

const {width, height} = Dimensions.get('window')

export default StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff'
    },
    headerContainer:{
        flex:1.5,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonBack:{
        position:'absolute',
        right:20,
        top:50,
        zIndex:1
    },
    logo:{
        width: (height * 0.5) * 0.5,
        height:'100%'
    },
    footer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    textInput:{
        width:'70%',
        backgroundColor:'#dedede',
        height:40,
        marginBottom:10,
        borderRadius:30,
        paddingLeft: 15
    },
    touchButton:{
        width:'70%',
        alignSelf:'center',
        marginTop:10,
        backgroundColor:'#fff',
        elevation:1,
        borderRadius:30,
        marginBottom:20
    },
    button:{
        width:'100%',
        height:40,
        borderRadius:30,
        paddingLeft: 15,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonText:{
        fontSize:18,
        color:'#fff',
        fontWeight:'bold'
    },
    creater:{
        color:'gray',
    },
    iconSecure:{
        position:'absolute',
        right:10,
        top:12  
    }
})