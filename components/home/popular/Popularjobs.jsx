import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'
import { COLORS, SIZES} from '../../../constants'
import styles from './popularjobs.style'
import { useFetch } from '../../../hooks/useFetch'

import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import { useState } from 'react'

const Popularjobs = () => {
  const router=useRouter();
  const {error,loading,data}=useFetch("search",{
    query: 'India',
    page: '1',
    num_pages: '1'
  });
  
  // a function to handle job select
  const [selectedJob, setSelectedJob] = useState();
  const handleCardPress=(item)=>{
    console.log("navigating to",item.job_id);
    router.push(`job-detail/${item.job_id}`);
    // router.push(`test/23`);
    setSelectedJob(item.job_id);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
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
              <PopularJobCard
                job={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
          )}
          keyExtractor={(item)=>item.job_id}
          contentContainerStyle={{columnGap:10}}
          showsHorizontalScrollIndicator={false}
          horizontal
          />
      )}
      </View>
    </View>
  )
}

export default Popularjobs