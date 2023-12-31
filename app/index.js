import { ScrollView,SafeAreaView,View,Text } from "react-native";
import { Stack } from "expo-router";
import {COLORS,icons,images,SIZES} from "../constants";
import {Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome} from "../components";
import { useState } from "react";
import { useRouter } from "expo-router";

const Home=()=>{
    const router=useRouter();
    const [searchTerm, setSearchTerm] = useState('FullTime');
    const handleClick=()=>{
        router.push(`/search/${searchTerm}`)
    }
    return (
        <SafeAreaView style={{flex:1, backgroundColor: COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerStyle:{backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerLeft:()=>(
                        <ScreenHeaderBtn iconUrl={icons.menu} dimensions='60%'/>
                    ),
                    headerRight:()=>(
                        <ScreenHeaderBtn iconUrl={images.profile} dimensions='100%'/>
                    ),
                    headerTitle:""
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{
                flex:1,
                padding:SIZES.medium
            }}>
                <Welcome
                    search={searchTerm}
                    setSearchTerm={setSearchTerm}
                    handleClick={handleClick}
                />
                <Popularjobs/>      
                <Nearbyjobs/>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home;