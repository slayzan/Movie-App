import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import {useRoute} from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import {HeartIcon } from 'react-native-heroicons/solid';
import {useNavigation} from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fetchMovieCredits, fetchSimilarMovies, fetchMovieDetails, image500 } from '../api/moviedb';
import { TextColor } from '../theme';



var {width, height} = Dimensions.get('window');


export default function Movie() {
    
    const {params: item} = useRoute();
    const [isFavourite, setFavourite] = useState(false);
    const [cast, setCast] = useState([])
    const [similarMovies, setSimilarMovies] = useState([])
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState({})

    const navigation = useNavigation();
    let movieName = 'Iron Man the third Hokage';


    useEffect(() =>{        

        getMovieDetails(item.id);
        getMovieCredits(item.id);
        getSimilarMovies(item.id);
        
    }, [item])

    const getMovieDetails = async (id) => {
        try{
            const data = await fetchMovieDetails(id);
            if (data)
                setMovie(data)
        } catch (error) {
            console.log('Error fetching trending movies:', error);
            setLoading(false);
        }
    }

    const getMovieCredits = async (id) => {
        try {
            const data = await fetchMovieCredits(id);
            if (data && data.cast) 
                setCast(data.cast);
        } catch (error) {
            console.log('Error fetching cast movies: ', error);
            setLoading(false)
        }
    }

    const getSimilarMovies = async (id) => {
        try {
            const data = await fetchSimilarMovies(id);
            if (data && data.results)
                setSimilarMovies(data.results)
        } catch (error) {
            console.log('Error fetching cast movies: ', error);
            setLoading(false)
        }
    }
    
    return(
      <ScrollView
        contentContainerStyle={{paddingBottom: 20}}
        style={{flex: 1, backgroundColor: '#171717',}}
      > 

                       
        {/*back button and movie poster */}
        <View style={{width: '100%'}}>
            <SafeAreaView style={styles.posterBackground}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{borderRadius: 12, padding: 4, backgroundColor: '#eab308'}}>
                    <ChevronLeftIcon size='28' strokeWidth={2.5} color='white' />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFavourite(!isFavourite)}>
                    <HeartIcon size='35' color={isFavourite ? '#eab308' : 'white' } />
                </TouchableOpacity>
            </SafeAreaView>
        { loading ? (<Loading />) : (
            <View>
                <Image source={{uri: image500(movie.poster_path)}} style={{width, height: height*0.55}}/>
                <LinearGradient 
                        colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']} 
                        style={{width, height: height*0.40, position: 'absolute', bottom: 0}}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                    />
            </View> 
        )}
        </View>

        {/* Movie Details */}
        <View>
            <View style={{marginTop: -(height*0.09)}}>
                <Text style={styles.titleMovie}>
                    {
                        movie?.title
                    }
                </Text>
                <Text style={{color: '#a3a3a3', fontWeight:'600', fontSize: 16, lineHeight: 24, textAlign: 'center'}}>
                    {movie.status} • {movie.release_date?.split('-')[0] || 'NA'} •  {movie.runtime} min
                </Text>

                { /* genres */ }
                <View style={{flexDirection: 'row', justifyContent: 'center', marginHorizontal: 16}}>
                   {
                    movie?.genres?.map((genre, index) => {
                        let showDot =  index + 1 != movie?.genres?.length
                        return(
                            <Text key={index} style={{color: TextColor.colors.secondary, fontSize:'600', fontSize:16, lineHeight:28, textAlign:'center'}}>
                                    {genre?.name} {showDot ? "• ": null}
                            </Text>
                        )
                    })
                    }
                </View>

                {/* Description */}
                <Text style={{color: '#a3a3a3', marginHorizontal: 16, letterSpacing: 0.4, textAlign: 'center', marginTop: 4}}>
                    {
                        movie?.overview
                    }
                </Text>
            </View>

            {/*Cast*/}
            {
                movie?.id && cast.length>0 && <Cast navigation={navigation} cast={cast} />
            }
            {/*similar Movie */}
            {
                movie?.id && similarMovies.length>0 && <MovieList title={'Similar Movies'} hideSeeAll={true} data={similarMovies} />
            }
        </View>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    posterBackground:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 16,
        position: 'absolute',
        zIndex: 20
    },
    titleMovie:{
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        letterSpacing: 2,
        fontSize: 30,
        lineHeight: 36
    }
})