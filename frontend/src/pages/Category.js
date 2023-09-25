import CategoryCard from "../components/CategoryCard"
// import Settingsrolling from "../components/Settingsrolling"
import { useContext } from "react";
import { PostContext } from "../components/Auth/PostContext";
import {useNavigate} from "react-router-dom";

function generateSlug(str) {
  // Replace spaces and special characters (excluding &) with hyphens
  let slug = str
  .replace(/ /g, '-');
  return slug;
}
 
const Category = () => {
  const { posts } = useContext(PostContext);

  const allCategories = posts.map(post => post.category)
  const uniQueCategories = [...new Set(allCategories)]
  const navigate = useNavigate()
    const handleClick =  (title) => {
      const catSlug = generateSlug(title)
      console.log(catSlug)
      navigate(`/category/${catSlug}`)
  }
   return (
    <div className="category" >
    <h1> All Category</h1>
    <div className="categories">

      {
        uniQueCategories.map((title,index)=>{
          return (

            <CategoryCard key={index} title={title} handleClick={handleClick}/>
          )
        })
      }

 
     </div>
  </div>
  )
}

export default Category
