import { View, Text, ScrollView, Dimensions, StyleSheet, TouchableOpacity, Image} from 'react-native'
import React, {useState, useEffect} from 'react'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import {HeartIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { useNavigation, useRoute } from '@react-navigation/native';
import {fetchPersonMovies, fetchPersonDetails, image342} from '../api/moviedb'


var {width, height} = Dimensions.get('window');

export default function PersonScreen() {

    const {params: item} = useRoute()
    const [isFavourite, setIsFavourite] = useState(false)
    const [personMovies, setPersonMovies] = useState([]);
    const [person, setPerson] = useState({});
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    
    useEffect(() => {
        getPersonDetails(item.id);
        getPersonMovies(item.id)
    }, [item])

    const getPersonDetails = async id=>{
        const data = await fetchPersonDetails(id);
        console.log('got person details');
        setLoading(false);
        if(data) {
            setPerson(data);
        }
    }

    const getPersonMovies = async id=>{
        const data = await fetchPersonMovies(id);
        console.log('got person movies')
        if(data && data.cast){
            setPersonMovies(data.cast);
        }
    }

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#171717', width: '100%', height: '100%' }} contentContainerStyle={{paddingBottom: 20}}>
        { /*back button*/}
        <View style={{width: '100%'}}>
            <SafeAreaView style={styles.backButtonContainer}>
                <TouchableOpacity style={{ backgroundColor: '#eab308',borderRadius: 12, padding: 4}} onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon size={28} strokeWidth={2.5} color={'white'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
                    <HeartIcon size='35' color={isFavourite ? 'red' : 'white' } />
                </TouchableOpacity>
            </SafeAreaView>
        </View>
         {/* person details */}
        {  loading ? (<Loading />) : (
            <View>
                <View style={styles.profileShadow}>
                    <View style={styles.imgContainer}>
                        <Image   source={{uri: image342(person?.profile_path)}} style={{height: height*0.42, width: width*0.65,}}/>
                    </View>
                </View>
                <View style={{marginBottom: 5}}>
                    <Text style={{color: 'white', fontSize: 30, lineHeight: 36, textAlign: 'center'}}>
                        {person?.name}
                    </Text>
                    <Text style={{color: '#737373', fontSize: 16, lineHeight: 24, textAlign: 'center'}}>{person?.place_of_birth}</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <View style={{borderColor: '#a3a3a3', alignItems: 'center', paddingHorizontal: 8, borderRightWidth: 2, alignItems: 'center', paddingRight: 12}}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Gender</Text>
                        <Text style={{color: '#d4d4d4', fontSize: 14, lineHeight: 20}}>
                            {
                                person?.gender==1? 'Female': 'Male'
                            }
                            </Text>
                    </View>
                    <View style={{borderColor: '#a3a3a3', alignItems: 'center', paddingHorizontal: 8, borderRightWidth: 2, alignItems: 'center', paddingRight: 12}}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Birthday</Text>
                        <Text style={{color: '#d4d4d4', fontSize: 14, lineHeight: 20}}> {person?.birthday}</Text>
                    </View>
                    <View style={{borderColor: '#a3a3a3', alignItems: 'center', paddingHorizontal: 8, borderRightWidth: 2, paddingRight: 15}}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Known for</Text>
                        <Text style={{color: '#d4d4d4', fontSize: 14, lineHeight: 20}}>{person?.known_for_department}</Text>
                    </View>
                    <View style={{borderColor: '#a3a3a3', alignItems: 'center', paddingHorizontal: 8,  paddingRight: 12}}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Popularity</Text>
                        <Text style={{color: '#d4d4d4', fontSize: 14, lineHeight: 20}}>{person?.popularity?.toFixed(2)} %</Text>
                    </View>
                </View>
                <View style={{marginVertical: 12, marginHorizontal: 12}}>
                    <Text style={{color:'white', fontSize: 18, lineHeight: 28, marginBottom: 12, marginTop: 2}}>Biography</Text>
                    <Text style={{color: '#a3a3a3', letterSpacing: 0.45}}>
                    {
                                person?.biography? person.biography : 'N/A'
                    }
                    </Text>
                </View>
                    { person?.id && personMovies.length>0 && <MovieList title="Movies" hideSeeAll={true} data={personMovies} /> }
                </View>   
        )}            
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    backButtonContainer:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 16,
        zIndex: 20,
        
    },
    profileShadow:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'red',
        shadowRadius: 140,
        shadowOffset:{width: 10, height: 5},
        shadowOpacity: 1,
    },
    imgContainer: {
        alignItems: 'center',
        borderRadius: 999,
        height: '75%',
        width: '65%',
        borderWidth: 2,
        borderColor: '#737373',
        overflow: 'hidden'
    },
    detailsContainer: {
        marginHorizontal: 8,
        backgroundColor: '#404040',
        borderRadius: 999,
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop:8,
        paddingBottom: 8,
        marginTop: 4
    }
})