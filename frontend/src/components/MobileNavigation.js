import { Link , useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const MobileNavigation = ({ setMobilemenu }) => {
  const navigate = useNavigate();
  return (
    <div className="mob-container">
      <CloseIcon
        style={{ cursor: "pointer" }}
        onClick={() => setMobilemenu(false)}
      />
      <div className="header-icon">
        <img
          className="profile-img"
          src="https://media.istockphoto.com/photos/smiling-indian-man-looking-at-camera-picture-id1270067126?b=1&k=20&m=1270067126&s=612x612&w=0&h=tcabRaVlA0bsZhWCDBXxC1IYuGnh7_VuramO-vJ5jRs="
          alt="rand"
        />
        <h3>Nishchal Basyal</h3>
        <div className="btn-group">
          <button className="btn-fill" onClick={()=>(navigate('/post'), setMobilemenu(false))}>Create Post</button>
          <button className="btn-outline" onClick={()=>(navigate('/myaccount'), setMobilemenu(false))}>My Account</button>
        </div>
      </div>
      <nav className="mobile-nav">
        <Link to="/" className="mnav-items">
          {" "}
          About{" "}
        </Link>
        <Link to="/" className="mnav-items">
          {" "}
          Blogs{" "}
        </Link>
        <Link to="/" className="mnav-items">
          {" "}
          Contact{" "}
        </Link>
        <Link to="/" className="mnav-items">
          {" "}
          Logout{" "}
        </Link>
      </nav>
    </div>
  );
};

export default MobileNavigation;
