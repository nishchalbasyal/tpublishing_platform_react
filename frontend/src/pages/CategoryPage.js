import { useNavigate, useParams } from "react-router-dom";
import { PostContext } from "../components/Auth/PostContext";
import Settingsrolling from "../components/Settingsrolling";
import { useContext } from "react";
import PostBox from "../components/PostBox";

function decodeSlug(slug) {
    // Replace hyphens with spaces
    let originalStr = slug.replace(/-/g, ' ');
  
    // Replace encoded '&' with '&'
    originalStr = originalStr.replace(/&amp;/g, '&');
  
    return originalStr;
  }

const CategoryPage = () => {
  const { category } = useParams();

  const navigate = useNavigate();
  const { posts, isPostLoading, setPosts } = useContext(PostContext);
  var searchText =  decodeSlug(category)
 
  const filterPrompts = (searchText) => {
     const regex = new RegExp(searchText, "i");

    return posts.filter((item) => regex.test(item.category));
  };
  const filterData = filterPrompts(searchText);
  return (
    <div className="category-archive">
        <h1>Category:{searchText}</h1>
        
      {!isPostLoading ? (
        filterData.length >0  ? (
          filterData.map((post, index) => {
            return <PostBox key={index} post={post} setPosts={setPosts} />;
          })
        ) : (
            
          <div className="not-found">
            <h1>Oops!! Not Found </h1>
 
            <p className="not-found-button" onClick={()=>navigate("/post")}>Create a New Post</p>
          </div>
        )
      ) : (
        <Settingsrolling />
      )}
    </div>
  );
};

export default CategoryPage;
