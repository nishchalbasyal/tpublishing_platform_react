import "./scss/App.scss";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/login";
import Registration from "./pages/Registration";
import SearchPage from "./pages/SearchPage";
import CreatePost from "./pages/CreatePost";
import MainPage from "./pages/MainPage";
import Category from "./pages/Category";
import MyAccount from "./pages/MyAccount";
import { AuthContext } from "./components/Auth/AuthContext";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
 
import SinglePost from "./components/SinglePost";
import axios from "axios";
import { PostContext } from "./components/Auth/PostContext";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isPostLoading, setPostLoading] = useState(true);
  const [posts, setPosts] = useState([]);

 
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setCurrentUser(user);   
      setLoading(false);
    });

    const getPost = async () => {
      try {
        let response = '';
        
        if (currentUser) {
          const idToken = await currentUser.getIdToken(true);
          const headers = {
            Authorization: `Bearer ${idToken}`
          };
    
          response = await axios.get("https://tpp-7ygf.onrender.com/api/articles", { headers });
         } else {
          response = await axios.get("https://tpp-7ygf.onrender.com/api/articles");
         }
    
        setPosts(response.data);
        setPostLoading(false); 
      } catch (e) {
        setError(e.message);
      }
    };

    try {
      getPost();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }

    return unsubscribe;
  }, [currentUser]);

  return (
    <div className="App">
     <BrowserRouter>

      <AuthContext.Provider value={{ currentUser, isLoading, setCurrentUser,error }}>
        <PostContext.Provider value={{ posts,isPostLoading, setPostLoading,setPosts }}>
          <Routes>
            <Route path="/" element={<MainPage />}>
              <Route index element={<HomePage />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Registration />} />
              <Route path="search/:searchText" element={<SearchPage />} />

              <Route
                path="post"
                element={
                  currentUser ? <CreatePost /> : <Navigate to="/login" />
                }
              />
              <Route
                path="myaccount"
                element={currentUser ? <MyAccount /> : <Navigate to="/login" />}
              />
              <Route
                path="edit/:postID"
                element={
                  isLoading && currentUser ? <CreatePost /> : <Navigate to="/login" />
                }
              />

              <Route path=":title" element={<SinglePost />} />
              <Route path="category" element={<Category />} />
              </Route>
          </Routes>
        </PostContext.Provider>
      </AuthContext.Provider>

      </BrowserRouter>


      </div>

  );
}

export default App;
