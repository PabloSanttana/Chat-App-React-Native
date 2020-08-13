import {StyleSheet,Dimensions} from 'react-native'

const {width} = Dimensions.get('window')
export default StyleSheet.create({
    container:{
        width,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:15,
        paddingVertical:5
    },
    input:{
        width: width - 80,
        maxHeight:80,
        borderRadius:40,
        paddingHorizontal:30,
        color:'#fff',
        fontSize:17,
    },
    icon:{
        alignSelf:'flex-end'
    }
})