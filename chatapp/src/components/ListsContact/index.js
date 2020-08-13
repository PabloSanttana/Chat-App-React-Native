import React from 'react'
import { View, Text, FlatList } from 'react-native'

import styles from './styles'
import ContentContact from './ContentContact'
import ContentMessages from './ContentMessages/index'


export default function ListsContact({data,pag,modalActiv,newroom}){

    if(pag){
        return (
            <View style={styles.container}>
                 <FlatList
                    data={data}
                    renderItem={({ item }) => <ContentMessages newroom={newroom} modalActiv={modalActiv} item={item} />}
                    keyExtractor={item => item.id.toString()}
                    />
                   
            </View>
        )
    }else{
        return (
            <View style={styles.container}>
               <FlatList style={{paddingBottom:100}}
                    data={data}
                    renderItem={({ item }) => <ContentContact item={item} />}
                    keyExtractor={item => item.id.toString()}
                />
                
            </View>
        )
    }

   
}


