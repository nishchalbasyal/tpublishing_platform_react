import {  NavLink } from "react-router-dom";
import { useState } from "react";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const MyAccountEdit = ({posts, currentUser}) => {
  const [data, setData] = useState(
    posts.filter((post) => post.authorEmail === currentUser.email)
  );
  console.log(data);
  const navigate = useNavigate();

  const handleDelete = async (postID) => {
    alert("You Are Deleting The Post");
    await axios
      .delete(` ${process.env.Base_URL}/articles/${postID}`)
      .then(() => {
        setData(data.filter((post) => post._id !== postID));
        alert("Deleted Successfully");
      })
      .catch((e) => {
        alert(e.message);
      });
  };
  return (
    <div className="myaccountedit">
      {[...data].reverse().map((post, i) => {
        return (
             <div key={i} className="desc-container">
              <div className="sn-count">{i+1}</div>
              <div className="img">
              <img
                src={post.featureImg}
                alt={post.title}
              />

              </div>
              <div className="title">
                <NavLink>
               {post.title}

                </NavLink>
              </div>

              <div className="voting" >
                <span className="upvote outvote">
                  <BiUpvote
                    className="upvote-icon invote"
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
                <span className="downvote outvote">
                  <BiDownvote
                    className="downvote-icon invote"
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
              <div className="btn-group">
                <button className="btn-edit btn" onClick={()=>navigate(`/edit/${post._id}`)}>Edit</button>
                <button className="btn-delete btn" onClick={()=>handleDelete(post._id)}>Delete</button>
              </div>
            </div>
              </div>
         );
      })}
    </div>
  );
};

export default MyAccountEdit;
