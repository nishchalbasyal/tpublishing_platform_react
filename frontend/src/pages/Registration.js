import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth, updateProfile, sendEmailVerification } from "firebase/auth";

const Registration = () => {
  const [firstName, setfirstName] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegistration = async (event) => {
    event.preventDefault();
    try {
      var user = "";
      if (password === confirmPassword) {
 
         await createUserWithEmailAndPassword(getAuth(), email, password)
           .then(async (userCredential) => {
             user = userCredential.user;
             sendEmailVerification(user);
            setError("Check Your Email To Verify Account !!");
            await updateProfile(user,{
              displayName: firstName,
              photoURL: profileUrl,
            });

             

          })
          .then(() => {
            setError("User Register SuccessFully");
            navigate("/");
          })
          .catch((e) => {
            setError(e.message);
          });
      } else {
        setError("Password Not Matched");
      }
    } catch (error) {
      setError(error.message);
     }
  };
  return (
    <div className="login-container">
      {
        <p className="error" style={{ color: "red", margin: "5" }}>
          {error}
        </p>
      }
      <div className="login-main">
        <div className="header">Join Traveller Community</div>
        <form action="" className="form">
          <div className="form-control">
            <input
              type="text"
              id="firstName"
              placeholder="Display Name"
              onChange={(e) => setfirstName(e.target.value)}
              value={firstName}
            />
          </div>
 

          <div className="form-control">
            <input
              type="email"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="form-control">
            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="form-control">
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </div>
 

          <div className="form-control">
            <input
              type="url"
              name="profileimageurl"
              id="profileimageurl"
              placeholder="Profile Image Url"
              onChange={(e) => setProfileUrl(e.target.value)}
              value={profileUrl}
            />
          </div>
        </form>

        <button onClick={handleRegistration} className="btn">
          Register
        </button>
        <div className="register-account">
          <span>Already Have An Account?</span>
          <span id="signup-link">
            <Link to="/Login">Login Now</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Registration;
