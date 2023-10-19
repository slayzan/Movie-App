import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback, Dimensions, StyleSheet } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/loading'

const {height, width} = Dimensions.get('window')

export default function Search() { 

    const navigation = useNavigation();
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false);


    return (
    <SafeAreaView style={{backgroundColor: '#262626', flex: 1}}>
        <View style={styles.inputContainer}>
            <TextInput
                placeholder='Search Movie'
                placeholderTextColor={'lightgray'}
                style={styles.textInput}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{borderRadius: 999, padding: 3, margin: 1, backgroundColor: '#737373'}}>
                <XMarkIcon size={25} color={'white'} />
            </TouchableOpacity>
        </View>

        {/*Results*/}
        { loading ? (<Loading />) : (
            results.length > 0 ? (
            <ScrollView 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal:15}}
                style={{marginTop: 8}}
            >
                <Text style={{color: 'white', fontWeight: 400, marginLeft: 4}}>Results ({results.length})</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap'}}>
                    {
                        results.map((item, index) => {
                            return (
                                <TouchableWithoutFeedback
                                key={index}
                                onPress={() => navigation.push('Movie', item)}>
                                    <View style={{marginBottom: 6, marginTop: 10}}>
                                        <Image  style={{borderRadius: 24, width: width * 0.44, height: height * 0.3}} source={require('../assets/images/moviePoster2.png')}/>
                                    </View>

                                </TouchableWithoutFeedback>
                            )
                        })
                    }
                </View>
            </ScrollView>  ) : (
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <Image  source={require('../assets/images/movieTime.png')} style={{height: height * 0.90, width: width * 0.90 }}/>
                </View>
            )
    )}
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    inputContainer:{
        marginHorizontal: 16, 
        marginBottom: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        borderWidth: 1,
        borderColor: '#737373',
        borderRadius: 999,
        marginTop: 25,
        padding: 6
    },
    textInput:{
        paddingBottom: 2,
        paddingLeft: 6,
        flex: 1,
        fontSize: 16,
        lineHeight: 24,
        fontWeight: 'bold',
        color: 'white',
        letterSpacing: 0.8,

    }
})