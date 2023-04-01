 import { Link, useNavigate, useParams } from "react-router-dom";
import { useState,  useContext, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module";
import "react-quill/dist/quill.snow.css";
import { ImageDrop } from "quill-image-drop-module";
import axios from "axios";
import Settingsrolling from "../components/Settingsrolling";
import { AuthContext } from "../components/Auth/AuthContext";
import { PostContext } from "../components/Auth/PostContext";
  
Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/imageDrop", ImageDrop);

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [text, setText] = useState("");
  const [featureImage, setFeatureImage] = useState("");
  const [error,setError] = useState("");
  const [category,setCategory] = useState("");
  const navigate = useNavigate();
  const {currentUser} = useContext(AuthContext);
  const {posts} = useContext(PostContext);
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const { postID } = useParams();
  console.log(category)
  
  useEffect(() => {
    if (postID) {
      const singleData = posts.filter((post) => post._id === postID);
      const { title, summary, featureImg, content, category } = singleData[0];
      setTitle(title);
      setSummary(summary);
      setText(content);
      setFeatureImage(featureImg);
      setCategory(category);
    }
  }, [postID, posts]);

  const handleSummaryChange = (event) => {
    setSummary(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleChange = (value) => {
    setText(value);
  };

  const handleUrlChange = (event) => {
    setFeatureImage(event.target.value);
  };
  
  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   if(postID){
  //     currentUser && await axios.put(`http://localhost:8000/api/articles/${postID}`,{
  //       title: title,
  //       summary: summary,
  //       content: text,
  //       featureImg: featureImage,
  //       author: currentUser.displayName,
  //       authorEmail: currentUser.email
  
  //     }).then((result) => {
  //       setError("Post Updated Successfully");
  //        setTimeout(() => {
  //           navigate('/')
  //         }, 3000);
  //       })
  //       .catch((error) => {
  //          setError(error.message)
  //       });

  //   }else{
      
  //     currentUser && await axios.post(`http://localhost:8000/api/articles`,{
  //       title: title,
  //       summary: summary,
  //       content: text,
  //       featureImg: featureImage,
  //       author: currentUser.displayName,
  //       authorEmail: currentUser.email
  
  //     }).then((result) => {
  //       setError("Posted Successfully");
  //        setTimeout(() => {
  //           navigate('/')
  //         }, 3000);
  //       })
  //       .catch((error) => {
  //          setError(error.message)
  //       });
  //   }
     
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (postID) {
      currentUser &&
         (await axios
          .put(`http://localhost:8000/api/articles/${postID}`, {
            title: title,
            summary: summary,
            content: text,
            featureImg: featureImage,
            author: currentUser.displayName,
            authorEmail: currentUser.email,
            category: category,
          })
          .then((result) => {
            setError("Post Updated Successfully");
            setTimeout(() => {
              setError("");
            }, 3000);
          })
          .catch((error) => {
            console.error("Error updating post:", error);
            setError("Error updating post. Please try again later.");
            setTimeout(() => {
              setError("");
            }, 3000);
          }));
    } else {
      currentUser &&
        (await axios
          .post("http://localhost:8000/api/articles", {
            title: title,
            summary: summary,
            content: text,
            featureImg: featureImage,
            author: currentUser.displayName,
            authorEmail: currentUser.email,
            category: category,

          })
          .then((result) => {
            setError("Post Created Successfully");
            setTimeout(() => {
              setError("");
              setTitle("");
              setSummary("");
              setText("");
              setFeatureImage("");
            }, 3000);
          })
          .catch((error) => {
            console.error("Error creating post:", error);
            setError("Error creating post. Please try again later.");
            setTimeout(() => {
              setError("");
            }, 3000);
          }));
    }
  };
  
  
  const modules = {
    toolbar: [
      [{ header: ["1","2","3","4","5"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],

 

    imageResize: {
      displayStyles: {
        backgroundColor: "black",
        border: "none",
        color: "white",
      },
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
    imageDrop: true,
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <div className="form-container">
      <div className="form-main">
        {  error &&  <div  style={{display:"flex",justifyContent:"center"}}>
            <div style={{display:"flex",justifyContent:"center",backgroundColor:"rgb(204, 165, 165)",color:"black",fontSize:"20",padding:"10px",width:"30%",textAlign:"center"}}>
              {error}
               &nbsp;
             <Settingsrolling color="black"/>
              
              </div>
            </div>
            
            }


        <div className="form-header">
          <h1>Create Post</h1>
          <Link to="draft">Draft</Link>
        </div>

        <div className="form">
          <form action="">
            <div className="form-control">
              <input
                type="title"
                placeholder="Title"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div className="form-control">
              <input
                type="summary"
                placeholder="Summary"
                value={summary}
                onChange={handleSummaryChange}
              />
            </div>
            <div className="form-control">
              <input
                type="category"
                placeholder="Category"
                value={category}
                onChange={handleCategoryChange}
              />
            </div>
            <div className="form-control">
              <input type="text" id="image" placeholder="Feature Image Url...." value={featureImage} onChange={handleUrlChange} />
            </div>

            <div style={{ width: "100%", height: "800px", overflow: "auto" }} className="form-control">
              <ReactQuill
                value={text}
                onChange={handleChange}
                modules={modules}
                formats={formats}
                style={{width:"100%", height: "100%", overflow: "auto", fontSize: "33" }}
              />
            </div>

            <div className="form-control" id="editor-control">
              <button id="submit-btn" onClick={handleSubmit} style={{display:"flex",justifyContent:"center", alignContent:"center", width:"200px", fontSize:"18px"}}>
                {" "}
               {postID?<>Update</>:<>Post</>} &nbsp;
                { error && <Settingsrolling color="white"/>}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* <div className="sidebar">
        <div className="widget">
          <WidgetA />
        </div>
      </div> */}
    </div>
  );
};

export default CreatePost;
