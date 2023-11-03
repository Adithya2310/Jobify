import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch=(query)=>{
    const [data,setData]=useState([]);
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(true);

    const options = {
        method: 'GET',
        url: 'https://jsearch.p.rapidapi.com/search',
        params: {
          query: 'Python developer in Texas, USA',
          page: '1',
          num_pages: '1'
        },
        headers: {
          'X-RapidAPI-Key': 'df948f9694msh0283bbb38c85b9cp1b02c1jsna9cdf03b1915',
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

    return {data,error,loading};
}