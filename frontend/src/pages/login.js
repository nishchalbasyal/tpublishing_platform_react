import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../components/Auth/AuthContext";
import Settingsrolling from "../components/Settingsrolling";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { currentUser, isLoading } = useContext(AuthContext);
  const [loginWait, setLoginWaiter] = useState(false);

 
  const handlebtnClick = async () => {
    try {

      setLoginWaiter(true);
      await signInWithEmailAndPassword(getAuth(), email, password)
      
      .then(()=>navigate("/"));


    } catch (e) {
      setError(e.message);
    }
  };

  if (isLoading) {
    return(
    <Settingsrolling />

    )
  } else {
    if (!currentUser) {
      return (
          <>
        <div className="login-container">

        {loginWait && <Settingsrolling />   }
          {error && <p className="error">{error}</p>}
          <div className="login-main">
            <div className="header">Login To Awesome Community</div>
            <form className="form">
              <div className="form-control">
                <input
                  type="text"
                  name=""
                  id="email"
                  placeholder="abc@mail.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="form-control">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div className="forget-password">
                Forget &nbsp;
                <strong>
                  <Link> Password ?</Link>
                </strong>
              </div>
            </form>
            <button className="btn" onClick={handlebtnClick}>
              Login
            </button>
            <div className="register-account">
              <span>Don't Have An Account?</span>
              <span id="signup-link">
                <Link to="/Register">Sign Up Now</Link>
              </span>
            </div>
          </div>
        </div>
        </>

      );
    } else {
      navigate("/");
    }
  }
};

export default Login;
