import {  useNavigate } from "react-router-dom";
import { formatDate } from "./Auth/formatDate";

const SearchItem = ({post}) => {
    const navigate = useNavigate();
console.log(post)
    const clickPost = (titleID, id) => {
      
        navigate(`/${titleID}`);
      };
  return (
    <div className="singlepost">
      
        
    <div   className="sp-container">
      <div className="meta-info">
        <span className="author-info">


          <p className="author-name">{post.author}</p>
        </span>
        <p className="time-span">{formatDate(post.created)}</p>
      </div>
      <div className="title">
        <h1 onClick={() => clickPost(post.title,post._id)}>{post.title}</h1>
      </div>
      <div className="dec-container">
   
        <span className="main-dec">
          <p className="decription">{post.summary}</p>
        </span>
      </div>
   
      <div className="hL"></div>
    </div>


</div>
  )
}

export default SearchItem
