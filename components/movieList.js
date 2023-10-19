import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native'
import React from 'react'
import {useNavigation} from '@react-navigation/native'
import { image185 } from '../api/moviedb';

var {width, height} = Dimensions.get('window');


export default function MovieList({title, data, hideSeeAll}) {

    let movieName = 'Iron Man the third Hokage';
    const navigation = useNavigation();
  return (
    <View style={styles.Container}>
        <View style={styles.items}>
            <Text style={{ color: 'white', fontSize: 20, lineHeight: 28,}}>{title}</Text>
           {    
            hideSeeAll ? <></> :
                <TouchableOpacity>
                    <Text style={{color: '#eab308', fontSize: 18, lineHeight: 28}}>See All</Text>
                </TouchableOpacity> 
            }

        </View>

        { /* Movie row */}
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 15,}}
        >
            {
                data.map((item, index) =>{
                    return(
                        <TouchableOpacity 
                            key={index}
                            onPress={() => navigation.navigate('Movie', item)}
                        >
                            <View style={{marginTop: 4, marginRight: 16}}>
                                <Image source={{uri: image185(item.poster_path) }} style={{width: width * 0.33, height: height * 0.22, borderRadius: 12, marginBottom: 4}}/>
                            </View>
                        </TouchableOpacity>
                    )
                }) 
            }
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    Container:{
        marginBottom: 8,
        marginTop: 4,
        marginHorizontal: 8,
    },
    items:{
        marginHorizontal: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    }
})