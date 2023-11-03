import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch=(endpoint, query)=>{
    const [data,setData]=useState([]);
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(true);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: {
            ...query
        },
        headers: {
          'X-RapidAPI-Key': 'dbfe60d026msh3490b8db1f164edp1807a2jsnc7c88539a956',
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
      };

    // a function to fetch the data from the rapid api
    const fetchData=async()=>{
        try{
            const response = await axios.request(options);
            setData(response.data.data);
            console.log(data);
            setLoading(false);
        }catch(err){
            setError(err);
            setLoading(false);
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchData();
    },[]);
    // a funciton to refetch the same data
    const refetch = () => {
        setLoading(true);
        fetchData();
      };
    return {data,error,loading, refetch};
}