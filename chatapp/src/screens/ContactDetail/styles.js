import { StyleSheet, Dimensions } from 'react-native'

const {width,height} = Dimensions.get('window')

export default StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    back:{
        width:50,
        height:50,
        elevation:5,
        borderRadius:25,
        position: 'absolute',
        top:40,
        left:20     
    },
    avatarContainer:{
        width:201,
        height:201,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
        elevation:7,
        marginBottom:20,
        borderRadius:103,
    },
    avatar:{
        width:200,
        height:200,
        borderRadius:100,
        borderWidth:3,
       
    },
    buttonCancelModal:{
        flex:1,
        width,
        backgroundColor: 'transparent'
    },
    modal:{
        width:'100%', 
        height:200, 
        backgroundColor:'#fff',
        padding:20,
        borderRadius:5
    },
    textInputModal:{
        // backgroundColor:'gray',
         marginVertical:5,
         borderBottomWidth: 2,
         paddingHorizontal:10
     },
    grupButtom:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:20
    },
    button:{
        width:100,
        height:35,
    },
    buttonDelete:{
        width: width -60,
        height:50,
        backgroundColor:'red',
        elevation:5,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
        borderRadius:4
    }
})
