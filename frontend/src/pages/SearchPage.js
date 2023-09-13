import { useParams } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";
import SearchItem from "../components/SearchItem";



 
const SearchPage = () => {
 const  { searchText} = useParams();
 const [data , setSearchData] =  useState([]);
 console.log(searchText)

 const fetchData = async  (Text) =>{
  try {
    const response = await axios.get(` https://tpp-7ygf.onrender.com/api/search/?q=${Text}`);
    setSearchData(response.data);
     
  } catch (error) {
    console.log(error.message)
  }
 
}

 useEffect( ()=>{

    fetchData(searchText)
    
     
  },[searchText])

  console.log(data)
  


  
  return (
    <div className="SearchBox">
         <h1>Search Results:</h1>
       <div className="searchItem">

    {data.length > 0 ? (
      
      data.map((post,i) => <SearchItem key={i} post={post}/>)
    ) : (
      <h1> Oops!! Not Found </h1>
    )
    
    }

      </div>
  </div>
  )
}

export default SearchPage
