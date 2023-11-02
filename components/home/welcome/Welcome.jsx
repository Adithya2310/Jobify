import {useState} from 'react'
import { SIZES, icons } from '../../../constants'
import { View, Text,TextInput, TouchableOpacity, Image, FlatList } from 'react-native'
import styles from './welcome.style'
import { useRouter } from 'expo-router'

const Welcome = ({searchTerm,setSearchTerm}) => {
  // to handle the selectiong of routes
  const router=useRouter();
  const [activeJobType,setActiveJobType]=useState('FullTime')
  const jobTypes=['FullTime','PartTime','Contract']
  // a function to handle the click of search
  const handleClick=(e)=>{
    console.log("You are searching for ",searchTerm);
  }
  return (
    <View>
      <View style={styles.container}>
      <Text style={styles.userName}>Hello Adithya</Text>
      <Text style={styles.welcomeMessage}>Find your perfect Job</Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            placeholder='What are you lookiing for'
            onChangeText={(text) => setSearchTerm(text)}
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image
          style={styles.searchBtnImage}
          source={icons.search}
          alt='search'
          resizeMode='contain'
          />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({item})=>(
            <TouchableOpacity 
            // style={styles.tab(activeJobType,item)}
            onPress={()=>{
              setActiveJobType(item);
              router.push(`/search/${item}`);
            }}>
              <Text style={styles.tab(activeJobType,item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item)=>item}
          contentContainerStyle={{columnGap:SIZES.small}}
          horizontal
        />
      </View>
    </View>
  )
}

export default Welcome