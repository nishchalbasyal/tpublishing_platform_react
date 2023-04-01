import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/Auth/AuthContext";
import { PostContext } from "../components/Auth/PostContext";
import MyAccountEdit from "../components/MyAccountEdit";
import Settingsrolling from "../components/Settingsrolling";
// import SinglePost from "../components/SinglePost";
// import WidgetA from "../components/WidgetA";

const MyAccount = () => {
  const { currentUser, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const {posts} = useContext(PostContext);
  
   
 
  return (
    <div className="myaccount">
      <div className="main-container">
        {isLoading ? (
          <div
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            <div>
              <Settingsrolling />
              <h4>Loading...</h4>
            </div>
          </div>
        ) : (
          currentUser && (
            <>
              <div className="header">
                <div className="header-l">
                  <h1>Hello {currentUser.displayName} !</h1>
                  <p className="Bio">
                    Song Lover !! Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Odit, nesciunt? Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Deleniti, quidem!
                  </p>
                  <button onClick={()=>navigate("/post")}>Write New Post</button>
                </div>

                <div className="header-r">
                  <img src="/website-design.png" alt="" />
                </div>
              </div>

              <div className="my-post">
                <MyAccountEdit currentUser={currentUser} posts={posts}/>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default MyAccount;
