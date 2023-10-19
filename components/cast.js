import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { TextColor } from '../theme';
import { image185 } from '../api/moviedb';

export default function Cast({cast, navigation}) {
 

  return (
    <View style={{marginVertical: 12}}>
      <Text style={{color: TextColor.colors.primary, fontSize: 18, lineHeight: 28, marginLeft: 12, marginBottom: 25}}>Top cast</Text>
      <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal: 15}}>
         {
          cast && cast.map((person, index) => {
            return (
              <TouchableOpacity
              key= {index}
              style={{marginRight: 12, alignItems: 'center'}}
              onPress={() => navigation.navigate('Person', person)}>

                <View style={{overflow: 'hidden', borderRadius: 999, height: 111, width: 102, alignItems: 'center', borderColor: '#737373', borderWidth: 1}}>
                    <Image style={{borderRadius: 16, height: 111, width: 102 ,borderColor: '#737373'}}
                      source={{uri: image185(person?.profile_path)}}/>
                </View>

                <Text style={{color: TextColor.colors.primary, fontSize: 12, lineHeight: 16, marginTop: 1}}>
                  {
                    person?.character.length>10? person.character.slice(0,10)+'...' : person?.character
                  }
                </Text>

                <Text style={{color: TextColor.colors.secondary , fontSize: 12, lineHeight: 16, marginTop: 1}}>
                  {
                    person?.original_name.length>10? person.original_name.slice(0,10)+'...' : person?.original_name

                  }
                </Text>
             </TouchableOpacity>
            )
          })
         }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
castView:{
  overflow: 'hidden', 
  borderRadius: 999, 
  height: 20, 
  width: 20, 
  alignItems: 'center',
  borderWidth: 1,
  
}
})