import "./scss/App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/login";
import Registration from "./pages/Registration";
import SearchPage from "./pages/SearchPage";
import CreatePost from "./pages/CreatePost";
import MainPage from "./pages/MainPage";
import Category from "./pages/Category";
import MyAccount from "./pages/MyAccount";
import { AuthContext } from "./components/Auth/AuthContext";
import { useState, useEffect, useMemo } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Settingsrolling from "./components/Settingsrolling";
import WidgetA from "./components/WidgetA";
import SinglePost from "./components/SinglePost";
import axios from "axios";
import { PostContext } from "./components/Auth/PostContext";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isPostLoading, setPostLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const getPost = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/articles");
      setPosts(response.data);
      setPostLoading(isPostLoading)
      console.log("Data fetched successfully");
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    try {
      getPost();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }

    return unsubscribe;
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ currentUser, isLoading, setCurrentUser }}>
        <PostContext.Provider value={{ posts, setPostLoading,setPosts }}>
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
                  currentUser ? <CreatePost /> : <Navigate to="/login" />
                }
              />

              <Route path=":title" element={<SinglePost />} />
              <Route path="category" element={<Category />} />
              </Route>
          </Routes>
        </PostContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
