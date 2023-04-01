

  import React from "react";

function LoginPage() {
  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src="img/log.svg" className="img-fluid" alt="Sample image" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>
              <div>
                <p className="small fw-bold mt-2 pt-4 mb-4 text-end">
                  New User?{" "}
                  <a href="logout.html" className="link-primary">
                    SignUp
                  </a>
                </p>
              </div>
              <p className="medium fw-bold mt-2 pt-4 mb-4 text-center h1">
                Welcome Back
              </p>
              <p
                className="medium fw-bold mt-2 pt-1 mb-5 text-center h6"
                style={{ color: "rgba(53, 44, 44, 0.873)" }}
              >
                Login to continue
              </p>
              {/* Email input */}
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Enter email address"
                />
              </div>
              {/* Password input */}
              <div className="form-outline mb-3">
                <input
                  type="password"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                {/* Checkbox */}
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                >
                  Login
                </button>
                {/* Forget Password */}
                <a href="#!" className="text-body">
                  Forgot password?
                </a>
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Or</p>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Login in with</p>
                  <button type="button" className="btn  btn-floating mx-1">
                    <i
                      className="fab fa-google fa-2x"
                      style={{ color: "#dd4b39" }}
                    ></i>
                  </button>
                  <button type="button" className="btn  btn-floating mx-1">
                    <i
                      className="fab fa-facebook-f fa-2x"
                      style={{ color: "#3b5998" }}
                    ></i>
                  </button>
                  <button type="button" className="btn  btn-floating mx-1">
                    <i
                      className="fab fa-twitter fa-2x"
                      style={{ color: "#55acee" }}
                    ></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;

