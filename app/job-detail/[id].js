import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import {View, Text, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl} from "react-native";
import {COLORS,icons,images,SIZES} from "../../constants";
import { useFetch } from "../../hooks/useFetch";
import { Company, JobAbout, JobTabs, ScreenHeaderBtn, Specifics } from "../../components";

const tabs=["About","Qualification","Responsibilities"];

const JobDetail=()=>{
    const param=useSearchParams();
    const router=useRouter();
    
    const {data, error, loading, refetch}=useFetch("job-details",{
        job_id:param.id,
    });
    console.log("indivijual job details",param);
    // to set the active tab
    const [activeTab, setActiveTab] = useState(tabs[0]);
    // to handle the refereshing
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(
      () => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
      },
      [],
    )
    

    // a funciton that will return the display tabs
    const displayTabContent=()=>{
        switch (activeTab) {
            case "Qualification":
                return (
                    <Specifics
                        title='Qualification'
                        points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
                    />
                );
            case "Responsibilities":
                return (
                    <Specifics
                        title='Responsibilities'
                        points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
                    />
                )
            case "About":
                return (<JobAbout info={data[0].job_description??"No data provided"}/>)
            default:
                return <Text>Default value</Text>
        }
    }
    return (
        <SafeAreaView style={{flex:1, backgroundColor:COLORS.lightWhite}}>
            <Stack.Screen
                options={{
                    headerStyle:{backgroundColor: COLORS.lightWhite},
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft:()=>(
                        <ScreenHeaderBtn 
                        iconUrl={icons.left} 
                        dimensions='60%'
                        handlePress={()=>router.back()}
                        />
                    ),
                    headerRight:()=>(
                        <ScreenHeaderBtn iconUrl={icons.share} dimensions='60%'/>
                    ),
                    headerTitle:""
                }}
            />
            <>
                <ScrollView 
                    showsVerticalScrollIndicator={false} 
                    refreshControl={<RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}/>}
                        >
                        {
                            loading?(
                                <ActivityIndicator
                                    size="large"
                                    color={COLORS.primary}
                                />
                            ):error?(
                                <Text>Something went wrong</Text>
                            ):data.length===0?(
                                <Text>No data availaible</Text>
                            ):
                            (
                                <View style={{padding:SIZES.medium, paddingBottom: 100}}>
                                    <Company
                                        companyLogo={data[0].employer_logo}
                                        jobTitle={data[0].job_title}
                                        companyName={data[0].employer_name}
                                        location={data[0].job_country}
                                    />
                                    <JobTabs
                                        tabs={tabs}
                                        activeTab={activeTab}
                                        setActiveTab={setActiveTab}
                                    />
                                    {displayTabContent()}
                                </View>
                            )
                        }
                </ScrollView>
            </>
        </SafeAreaView>
    )
    
}

export default JobDetail;