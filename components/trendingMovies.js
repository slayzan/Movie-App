import { View, Text, StyleSheet, TouchableWithoutFeedback, Image, Dimensions } from 'react-native'
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';
import { image500 } from '../api/moviedb';

var {width, height} = Dimensions.get('window');


 function TrendingMovies({data}) {

    const navigation = useNavigation();
    
    const handleClick = (item) => {
        navigation.navigate('Movie', item)
    }
    
  return (
    <View style={styles.Container}>
      <Text style={styles.TiltleTrending}>Trending</Text>
      <Carousel 
        data={data}
        renderItem={({item}) => <MovieCard item={item} handleClick={handleClick}/>}
        firstItem={1}
        inactiveSlideOpacity={0.60}
        sliderWidth={width}
        itemWidth={width*0.62}
        slideStyle={{display: 'flex', alignItems: 'center'}}
    />
    </View>
  )
}

const MovieCard = ({item, handleClick})=>{
    return (
        <TouchableWithoutFeedback onPress={()=> handleClick(item)}>
            <Image 
                source={{uri: image500(item.poster_path)}} 
                style={{
                    width: width * 0.6,
                    height: height * 0.4,
                    borderRadius: 24
                }}
            />
        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    Container: {
        marginBottom: 15
    },
    TiltleTrending:{
        color: 'white',
        fontSize: 20,
        lineHeight: 28,
        marginBottom: 15,
        marginLeft: 15,
        marginRight: 8
    }
})

export default TrendingMovies;