const WidgetA = ({ currentUser,navigate }) => {
  console.log(currentUser)
  return (
    <div className="WidgetA">
      <div className="header"></div>
      {currentUser ? (
        <>
          <div className="profile">
            <img
              src={currentUser.photoURL}
              alt="adda"
            />
            <span className="info">
              <h3>{currentUser.displayName}</h3>
              <h4>{currentUser.email}</h4>
              {/* <div className="bar-container">
                <div className="fill-bar"></div>
              </div> */}
 
            </span>
          </div>
          <div className="divider-container">
            <div className="divider"></div>
          </div>
          <div className="btn-group">
            <button className="btn-fill"
             onClick={()=>navigate("/post")}>Create Post</button>
            <button className="btn-outline" onClick={()=>navigate("/myaccount")}>My Account</button>
          </div>
        </>
      ) : (
        <div className="btn-group">
          <button
            className="btn-fill"
            style={{ bordeRadius: "0", width: "100px" ,backgroundColor:"black"}}
            onClick={()=>navigate("/login")}
          >
            Login
          </button>
          <button
            className="btn-outline"
            style={{ borderRadius: "0", width: "100px"  }}
            onClick={()=>navigate("/register")}

          >
            Register
          </button>
        </div>
      )}
    </div>
  );
};

export default WidgetA;
