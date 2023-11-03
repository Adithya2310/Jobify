import React from 'react'
import { View, Text, TouchableOpacity,Image } from 'react-native'
import { checkImageURL } from '../../../../utils'
import styles from './popularjobcard.style'

const PopularJobCard = ({job,selectedJob,handleCardPress}) => {
  return (
    <TouchableOpacity
    style={styles.container(selectedJob,job)}
    onPress={()=>handleCardPress(job)}
    >
    <TouchableOpacity style={styles.logoContainer(selectedJob,job)}>
    <Image 
          source={{
            uri:checkImageURL(job.employer_logo)
            ? job.employer_logo
            : "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg"
          }}
          resizeMode='contain'
          style={styles.logoImage} 
        />
    </TouchableOpacity>
    <Text style={styles.companyName} numberOfLines={1}>
      {job.employer_name}
    </Text>
    <View style={styles.infoContainer}>
      <Text style={styles.jobName(selectedJob, job)}>
        {job.job_title}
      </Text>
      <View style={styles.infoWrapper}>
        <Text style={styles.publisher(selectedJob, job)}>
          {job.job_publisher}
        </Text>
        <Text style={styles.location}>{job.job_country}</Text>
      </View>
    </View>
    </TouchableOpacity>
  )
}

export default PopularJobCard