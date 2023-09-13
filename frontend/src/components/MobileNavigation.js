import { Link , useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "./Auth/AuthContext";
import { useContext } from "react";

const MobileNavigation = ({ setMobilemenu }) => {
  const { currentUser, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="mob-container">
      <CloseIcon
        style={{ cursor: "pointer" }}
        onClick={() => setMobilemenu(false)}
      />

      <div className="header-icon">
        {currentUser?(
          <>
        <img
          className="profile-img"
          src={currentUser.photoURL}
          alt={currentUser.displayName}
        />
        <h3>{currentUser.displayName}</h3>
        <div className="btn-group">
          <button className="btn-fill" onClick={()=>(navigate('/post'), setMobilemenu(false))}>Create Post</button>
          <button className="btn-outline" onClick={()=>(navigate('/myaccount'), setMobilemenu(false))}>My Account</button>
        </div>
        </>
        ):(
          <div className="btn-group">

          <button className="btn-fill" onClick={()=>(navigate('/login'), setMobilemenu(false))}>Login</button>
          </div>

        )

        }
      </div>


      <nav className="mobile-nav">
        <Link to="/category" className="mnav-items" onClick={() => setMobilemenu(false)}>
          {" "}
          Category{" "}
        </Link>
        <Link to="/myaccount" className="mnav-items" onClick={() => setMobilemenu(false)}>
          {" "}
          MyAccount{" "}
        </Link>
        <Link to="/" className="mnav-items" onClick={() => setMobilemenu(false)}>
          {" "}
          Home{" "}
        </Link>
        <Link to="/logout" className="mnav-items" onClick={() => setMobilemenu(false)}>
          {" "}
          Logout{" "}
        </Link>
      </nav>
    </div>
  );
};

export default MobileNavigation;
