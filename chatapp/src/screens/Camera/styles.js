import { StyleSheet, Dimensions } from 'react-native'

const {width,height} = Dimensions.get('window')

export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#000',
        alignItems:'center'
    },
    image:{
        marginTop:50,
        width,
        height: width * 3/4,
    },
    grupButton:{
        width,
        flexDirection:'row',
        marginTop:20,
        justifyContent:'space-around',
    },
    button:{
        width:100,
        height:50,
        borderRadius:20
    }
})
