import {StyleSheet, Dimensions} from 'react-native'

const {width,height} = Dimensions.get('window')

export default StyleSheet.create({
    userData:{
        backgroundColor:'#fff',
        width: width -60,
        padding:10,
        borderRadius:5,
        flexDirection:'row',
        alignItems:'center',
        marginVertical:5,
        elevation:5,
        alignSelf:'center'
    },
    iconleft:{
        marginRight:10
    },
    iconright:{
        position:'absolute',
        right:10
    },
})