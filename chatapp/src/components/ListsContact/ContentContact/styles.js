import {StyleSheet, Dimensions} from 'react-native'

const {width} = Dimensions.get('window')

export default StyleSheet.create({
    container:{
        flex:1,
        borderBottomWidth:0.6,
        borderColor:'#7c7c7c',
        marginVertical:1,
        flexDirection:'row',
        height:60,
        alignItems:'center',
        backgroundColor:'#ffff'
    },
    avatar:{
        width:50,
        height:50,
        borderRadius:30,
        marginLeft:8,
    },
    nameContainer:{
        marginLeft:10,
        marginTop:5
    },
    name:{
        fontSize: 15,
        fontWeight:'bold'
    },
    message:{
        width:180
    },
    tempMessage:{
        position:'absolute',
        right:5,
        justifyContent:'center',
        alignItems:'center'
    },
    time:{
        fontSize:11
    },
    NumMessages:{
       width:15,
       height:15,
       justifyContent:'center',
       alignItems:'center',
       borderRadius:8,
       marginTop:3
    },
    NumText:{
        fontSize:12,
        color:"#fff"
    },
    phone:{
        position:'absolute',
        right:10
    },
    buttonCancelModal:{
        flex:1,
        width,
        backgroundColor: 'transparent'
    },
    modalDetail:{
        backgroundColor:'#fff',
        width:'100%',
        height: '50%',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        padding:10
    },
    closeModal:{
        position:'absolute',
        top:10,
        left:10
    },
    avatarModal:{
        width: 150,
        height:150,
        borderRadius: 75,
        borderWidth:2,
    },
    textModal:{
        fontSize:18,
        marginTop:5
    },
    grupButtonModal:{
        width:"100%",
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:20
    }

})