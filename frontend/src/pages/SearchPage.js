import { useParams } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";
import SearchItem from "../components/SearchItem";
import Settingsrolling from "../components/Settingsrolling";



 
const SearchPage = () => {
 const  { searchText} = useParams();
 const [data , setSearchData] =  useState([]);
 const [isLoading, setLoading] = useState(true);

 const fetchData = async  (Text) =>{
  try {
    await axios.get(`https://tpp-7ygf.onrender.com/api/search/?q=${Text}`)
    .then((e)=>{
      setSearchData(e.data);
      setLoading(false)
    })
      
  } catch (error) {
    console.log(error.message)
  }
 
}

 useEffect( ()=>{

    fetchData(searchText)
    
     
  },[searchText])

   


  
  return (
    <div className="SearchBox">
         <h1>Search Results:</h1>
       <div className="searchItem">



    {
    
    isLoading?(<Settingsrolling/>):
    data.length > 0 ? (
      
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
