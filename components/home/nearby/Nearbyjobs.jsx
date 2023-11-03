import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import styles from './nearbyjobs.style'
import {COLORS} from "../../../constants";
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import { useRouter } from 'expo-router';
import { useFetch } from '../../../hooks/useFetch';

const Nearbyjobs = () => {
  const router=useRouter();
  const {error,loading,data}=useFetch();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearbyjobs</Text>
        <TouchableOpacity>
        <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
        />):
        error?(<Text>Something went wrong</Text>):(
          <FlatList
          data={data}
          renderItem={({item})=>(
              <NearbyJobCard
                job={item}
                handleNavigate={(item)=>router.push(`/job-detail/${item.job_id}`)}
              />
          )}
          keyExtractor={(item)=>item.job_id}
          contentContainerStyle={{columnGap:10}}
          showsHorizontalScrollIndicator={false}
          />
      )}
      </View>
    </View>
  )
}

export default Nearbyjobs