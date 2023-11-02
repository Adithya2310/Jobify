import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import styles from './nearbyjobs.style'
import {COLORS} from "../../../constants";
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import { useRouter } from 'expo-router';

const Nearbyjobs = () => {
  const router=useRouter();
  const isLoading=false;
  const isError=false;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearbyjobs</Text>
        <TouchableOpacity>
        <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
        />):
        isError?(<Text>Something went wrong</Text>):(
          <FlatList
          data={[1,2,3,4,5,6,7,8,9,10]}
          renderItem={({item})=>(
            <TouchableOpacity onPress={()=>router.push('/job')}>
              <NearbyJobCard/>
            </TouchableOpacity>
          )}
          keyExtractor={(item)=>item}
          contentContainerStyle={{columnGap:10}}
          horizontal
          showsHorizontalScrollIndicator={false}
          />
      )}
      </View>
    </View>
  )
}

export default Nearbyjobs