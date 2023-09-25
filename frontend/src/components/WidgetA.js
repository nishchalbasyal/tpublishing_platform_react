import React from 'react';

const ProfileInfo = ({ currentUser }) => (
  <div className="profile">
    <img src={currentUser.photoURL} alt="User Profile" />
    <span className="info">
      <h3>{currentUser.displayName}</h3>
      <h4>{currentUser.email}</h4>
    </span>
  </div>
);

const ActionButtons = ({ navigate }) => (
  <div className="btn-group">
    <button className="btn-fill" onClick={() => navigate("/post")}>Create Post</button>
    <button className="btn-outline" onClick={() => navigate("/myaccount")}>My Account</button>
  </div>
);

const AuthButtons = ({ navigate }) => (
  <div className="btn-group">
    <button className="btn-fill" onClick={() => navigate("/login")}>Login</button>
    <button className="btn-outline" onClick={() => navigate("/register")}>Register</button>
  </div>
);

const WidgetA = ({ currentUser, navigate }) => (
  <div className="WidgetA">
    <div className="header"></div>
    {currentUser ? (
      <>
        <ProfileInfo currentUser={currentUser} />
        <div className="divider-container">
          <div className="divider"></div>
        </div>
        <ActionButtons navigate={navigate} />
      </>
    ) : (
      <AuthButtons navigate={navigate} />
    )}
  </div>
);

export default WidgetA;
