import { Link, useNavigate } from "react-router-dom";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { useContext } from "react";
import Settingsrolling from "./Settingsrolling";
import { AuthContext } from "./Auth/AuthContext";
import { formatDate } from "./Auth/formatDate";
import axios from "axios";

const PostBox = ({post, setPosts}) => {
    const navigate = useNavigate();
 
  const { currentUser, isLoading } = useContext(AuthContext);

  const clickPost = (titleID, id) => {
    // const cleanText = titleID.toLowerCase();
    // const decodedText = cleanText.replace(/ /g, "-");
    // const url = decodedText.substring(0); // take first 24 characters
 
    navigate(`/${titleID}`);
  };

  const handleUpvoteClick = async (articleId) => {
    if (currentUser) {
      console.log(currentUser.displayName);
      await axios
        .put(
          `http://localhost:8000/api/articles/${currentUser.email}/vote/up`,
          {
            articleId: articleId,
          }
        )
        .then((e) => {
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post._id === articleId
                ? {
                    ...post,
                    upvotes: Math.max(post.upvotes + 1, 0),
                    downvotes: Math.max(post.downvotes - 1, 0),
                  }
                : post
            )
          );
        })
        .catch((e) => {
          alert(e.response.data.message);
        });
    } else {
      alert("Login to Vote");
    }
  };

  const handleDownVoteClick = async (articleId) => {
    if (currentUser) {
      await axios
        .put(
          `http://localhost:8000/api/articles/${currentUser.email}/vote/down`,
          {
            articleId: articleId,
          }
        )
        .then((e) => {
          setPosts((prevPosts) =>
            prevPosts.map((post) =>
              post._id === articleId
                ? {
                    ...post,
                    upvotes: Math.max(post.upvotes - 1, 0),
                    downvotes: Math.max(post.downvotes + 1, 0),
                  }
                : post
            )
          );
        })
        .catch((e) => {
          alert(e.response.data.message);
        });
    } else {
      alert("Login to Vote");
    }
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
                <div className="featuredImg">
                  <img
                    onClick={() => clickPost(post.title,post._id)}
                    src={post.featureImg}
                    alt="blog"
                  />
                </div>
                <span className="main-dec">
                  <p className="decription">{post.summary}</p>
                  <strong>
                    <Link to="/">See More</Link>
                  </strong>
                </span>
              </div>
              <div className="voting">
                {isLoading ? (
                  <Settingsrolling />
                ) : (
                  <span>
                    <span className="upvote">
                      <BiUpvote
                        className="upvote-icon"
                        onClick={() => handleUpvoteClick(post._id)}
                        style={{
                          color: "orange",
                          fontSize: "32",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => (e.target.style.color = "red")}
                        onMouseLeave={(e) => (e.target.style.color = "orange")}
                      />
                      <p>{post.upvotes}</p>
                    </span>
                    <span className="downvote">
                      <BiDownvote
                        className="downvote-icon"
                        onClick={() => handleDownVoteClick(post._id)}
                        id="downvoteID"
                        style={{
                          color: "Black",
                          fontSize: "32",
                          cursor: "pointer",
                          transition: "all 0.3s ease-in-out",
                        }}
                        onMouseEnter={(e) => (e.target.style.color = "gray")}
                        onMouseLeave={(e) => (e.target.style.color = "black")}
                      />
                      <p>{post.downvotes}</p>
                    </span>
                  </span>
                )}
              </div>
              <div className="hL"></div>
            </div>
     
     
    </div>
  );
};

export default PostBox;
