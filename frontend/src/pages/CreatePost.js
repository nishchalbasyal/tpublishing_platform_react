import { Link, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import ImageResize from "quill-image-resize-module";
import "react-quill/dist/quill.snow.css";
import { ImageDrop } from "quill-image-drop-module";
import axios from "axios";
import Settingsrolling from "../components/Settingsrolling";
import { AuthContext } from "../components/Auth/AuthContext";
import { PostContext } from "../components/Auth/PostContext";
import Quill from "quill";

Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/imageDrop", ImageDrop);

function generateSlug(str) {
  // Replace spaces and special characters with hyphens
  let slug = str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .replace(/--+/g, '-') // Replace consecutive hyphens with a single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

  // Ensure the slug does not exceed 75 characters
  if (slug.length > 20) {
    slug = slug.substring(0, 75); // Truncate to 75 characters
    slug = slug.replace(/-+$/g, ''); // Remove any trailing hyphens after truncation
  }

  return slug;
}

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [text, setText] = useState("");
  const [featureImage, setFeatureImage] = useState("");
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");
  const [sval, setSval] = useState("");
  const [slug, setSlug] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { posts } = useContext(PostContext);
  const { postID } = useParams();



  useEffect(() => {
    if (postID) {
      const singleData = posts.find((post) => post._id === postID);
      if (singleData) {
        const { title, summary, featureImg, content, category, slug } = singleData;
        setTitle(title);
        setSummary(summary);
        setText(content);
        setFeatureImage(featureImg);
        setCategory(category);
        setSlug(slug);
        setSval(slug);
       }
    }
  }, [postID, posts]);

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    setSlug(generateSlug(newTitle)); // Update slug when title changes
    setSval(slug)
  };

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

  const handleSval = (event) => {
    const newTitle = event.target.value;
    setSval(newTitle)
    setSlug(generateSlug(newTitle))
    
  }
  
  const displayError = (errorMessage) => {
    setError(errorMessage);
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (currentUser) {
        const data = {
          title,
          summary,
          content: text,
          featureImg: featureImage,
          author: currentUser.displayName,
          authorEmail: currentUser.email,
          category,
          slug
          

        };

        if (postID) {
          await axios.put(`https://tpp-7ygf.onrender.com/api/articles/${postID}`, data);
          displayError("Post Updated Successfully");
        } else {
          await axios.post("https://tpp-7ygf.onrender.com/api/articles", data);
          displayError("Post Created Successfully");
          setTitle("");
          setSummary("");
          setText("");
          setFeatureImage("");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      displayError("Error creating/updating post. Please try again later.");
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
          <h1>{
          
          postID? "Edit Post" : "Create Post"
          
          }
          </h1>
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
                type="slug"
                placeholder="slug"
                value={sval}
                onChange={handleSval}
              />
              <div style={{fontSize:'13px',margin:'5px',fontWeight:'bold'}}>Permalink:<span style={{color:'blue',textDecoration:'underline'}}> {slug}</span></div>
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
