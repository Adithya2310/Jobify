import React from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import styles from './nearbyjobs.style'
import {COLORS} from "../../../constants";
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';
import { useRouter } from 'expo-router';
import { useFetch } from '../../../hooks/useFetch';

const Nearbyjobs = () => {
  // a javascript function return the current city,country of the client https://ipapi.co/json/
  const router=useRouter();
  const {error,loading,data}=useFetch("search",{
    query: 'Bangalore',
    page: '1',
    num_pages: '1'
  });
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
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby-job-${job.job_id}`}
              handleNavigate={() => router.push(`/job-detail/${job.job_id}`)}
            />
          ))
      )}
      </View>
    </View>
  )
}

export default Nearbyjobs