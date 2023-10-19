import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView} from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import {Bars3Icon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import TrendingMovies from '../components/trendingMovies'
import MovieList from '../components/movieList'
import Navigation from '../navigation'
import Search from './Search'
import Loading from '../components/loading'
import { useNavigation } from '@react-navigation/native';
import { fetchTrendingMovies, fetchTopRatedMovies, fetchUpcomingMovies } from '../api/moviedb'


export default function Home() {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  
  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        if (data && data.results) {
          setTrending(data.results);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
        setLoading(false);
      }
    };
    const getUpcomingMovies = async () => {
      try {
        const data = await fetchUpcomingMovies();
        if (data && data.results) {
          setUpcoming(data.results);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
        setLoading(false);
      }
    };
    const getTopRatedMovies = async () => {
      try {
        const data = await fetchTopRatedMovies();
        if (data && data.results) {
          setTopRated(data.results);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
        setLoading(false);
      }
    };
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, []);
  
  return (
    <View style={styles.Container}>
        <SafeAreaView  style={styles.AreaView}>
            <StatusBar  style='light'/>
            <View style={styles.IconView}>
              <Bars3Icon size='30'  color='white'/>
              <Text style={styles.HeaderTitle}>
                <Text style={{color: '#eab308' }}>M</Text>
                ovies
              </Text>
              <TouchableOpacity  onPress={()=> navigation.navigate('Search')}>
                <MagnifyingGlassIcon size="30" strokeWidth={2} color="white"/>
              </TouchableOpacity>
            </View>
        </SafeAreaView>

      {  loading ? (<Loading />) :
        (
          <ScrollView
            ShowsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 10}}
          >
            { /*trending movies carousel*/ }
            {trending.length > 0 &&  <TrendingMovies data={trending}/>  }

            { /* upcoming movies row*/ }
            <MovieList title="Upcoming" data={upcoming} /> 

            { /* upcoming movies row*/ }
            <MovieList title="Top Rated" data={topRated} />

          </ScrollView> 
        ) 
      }
    </View>
  )
}

const styles = StyleSheet.create({
    Container:{
        backgroundColor: '#292929',
        flex: 1,
    },
    AreaView:{
        marginBottom: 12,
        marginTop: 50,
        
    },
    IconView:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15
    },
    HeaderTitle:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 22
    }
    /*test:{
        color: 'white'
    }*/
})