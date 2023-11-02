import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'

import styles from './screenheader.style'

const ScreenHeaderBtn = ({iconUrl,dimensions}) => {
  return (
    <TouchableOpacity style={styles.btnContainer}>
      <Image 
      source={iconUrl}
        resizeMode='cover'
        style={styles.btnImg(dimensions)}
      />
    </TouchableOpacity>
    
  )
}

export default ScreenHeaderBtn