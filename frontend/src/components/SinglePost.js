import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "./Auth/AuthContext";
import { PostContext } from "./Auth/PostContext";
import { formatDate } from "./Auth/formatDate";
import Settingsrolling from "./Settingsrolling";
const Post = () => {
  const { title } = useParams();
  const { posts, setPosts, setPostLoading } = useContext(PostContext);

  const url = decodeURIComponent(title);
  console.log(url);

  const Mainpost = posts.filter((post) => 
    post.title === url
  );

 
  return (
    <div className="post">
      {setPostLoading?
      (      
      
      Mainpost && Mainpost.map(post=>{
        return(
        <>
          <div className="header">
            <h1>
              {post.title}
             </h1>
            <p>Posted On {formatDate(post.created)} by {post.author}</p>
            <p>
              <span>{post.upvotes}</span>&nbsp;
              <span>
                <strong>Upvotes</strong>
              </span>
            </p>
          </div>
          <div className="featuredImgContainer">
            <img
              src={post.featureImg}
              alt="blog"
              className="featuredImage"
            />
          </div>
             
          <div className="content" dangerouslySetInnerHTML={{ __html: post.content }} />

            
         </>)
      })
      
      
      ):<Settingsrolling />

      }

    </div>
  );
};

export default Post;
