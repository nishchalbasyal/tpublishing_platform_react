
  <section class="vh-100">
    <div class="container-fluid h-custom">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-9 col-lg-6 col-xl-5">
          <img src="img/log.svg"
            class="img-fluid" alt="Sample image" ></img>
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <form>

            <div>
              <p class="small fw-bold mt-2 pt-4 mb-4 text-end">Already have account ? <a href="login.html"
                class="link-primary">SignIn</a></p>
            </div>

            <p class="medium fw-bold mt-2 pt-4 mb-4 text-center h1">Register</p>

            {/* <!-- First Name --> */}
            <div class="form-outline mb-4">
              <input type="text" id="form3Example3" class="form-control form-control-lg"
                placeholder="Enter First Name" />
            </div>
             

             <div class="form-outline mb-4">
              <input type="text" id="form3Example3" class="form-control form-control-lg"
                placeholder="Enter Last Name" />
            </div>

            {/* <!-- Email --> */}
            <div class="form-outline mb-4">
              <input type="email" id="form3Example3" class="form-control form-control-lg"
                placeholder="Enter email address" />
            </div>
  
            {/* <!-- Password input --> */}
            <div class="form-outline mb-3">
              <input type="password" id="form3Example4" class="form-control form-control-lg"
                placeholder="Enter password" />
            </div>

            <div class="form-outline mb-3">
              <input type="password" id="form3Example4" class="form-control form-control-lg"
                placeholder="Confirm password" />
            </div>
  
            <div class="d-flex justify-content-between align-items-center">

              {/* <!-- login btn --> */}
              <button type="button" class="btn btn-primary btn-lg"
                style="padding-left: 2.5rem; padding-right: 2.5rem;">Login</button>
              
             {/* <!-- Forget Password --> */}
              <a href="#!" class="text-body">Forgot password?</a>
            </div>
  
            <div class="text-center text-lg-start mt-4 pt-2">
              
            
                  <div class="divider d-flex align-items-center my-4">
                    <p class="text-center fw-bold mx-3 mb-0">Or</p>
                  </div>


                  <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    <p class="lead fw-normal mb-0 me-3">Login in with</p>
                    <button type="button" class="btn  btn-floating mx-1">
                      <i class="fab fa-google fa-2x" style="color: #dd4b39;"></i>
                    </button>
        
                    <button type="button" class="btn  btn-floating mx-1">
                      <i class="fab fa-facebook-f fa-2x" style="color: #3b5998;"></i>
                    </button>
        
                    <button type="button" class="btn  btn-floating mx-1">
                      <i class="fab fa-twitter fa-2x" style="color: #55acee;"></i>
                    </button>


                  </div>
        
                  
            </div>
  
          </form>
        </div>
      </div>
    </div>
    
  </section>
 

  import React from 'react';

function Register() {
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
                <p className="small fw-bold mt-2 pt-4 mb-4 text-end">Already have account ? <a href="login.html" className="link-primary">SignIn</a></p>
              </div>

              <p className="medium fw-bold mt-2 pt-4 mb-4 text-center h1">Register</p>

              {/* First Name */}
              <div className="form-outline mb-4">
                <input type="text" id="form3Example3" className="form-control form-control-lg" placeholder="Enter First Name" />
              </div>
              {/* Last Name */}

              {/* Email input */}
              <div className="form-outline mb-4">
                <input type="text" id="form3Example3" className="form-control form-control-lg" placeholder="Enter Last Name" />
              </div>

              {/* Email */}
              <div className="form-outline mb-4">
                <input type="email" id="form3Example3" className="form-control form-control-lg" placeholder="Enter email address" />
              </div>

              {/* Password input */}
              <div className="form-outline mb-3">
                <input type="password" id="form3Example4" className="form-control form-control-lg" placeholder="Enter password" />
              </div>

              <div className="form-outline mb-3">
                <input type="password" id="form3Example4" className="form-control form-control-lg" placeholder="Confirm password" />
              </div>

              <div className="d-flex justify-content-between align-items-center">

                {/* login btn */}
                <button type="button" className="btn btn-primary btn-lg" style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>Login</button>

                {/* Forget Password */}
                <a href="#!" className="text-body">Forgot password?</a>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">


                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0">Or</p>
                </div>


                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Login in with</p>
                  <button type="button" className="btn btn-floating mx-1">
                    <i className="fab fa-google fa-2x" style={{ color: "#dd4b39" }}></i>
                  </button>

                  <button type="button" className="btn btn-floating mx-1">
                    <i className="fab fa-facebook-f fa-2x" style={{ color: "#3b5998" }}></i>
                  </button>

                  <button type="button" className="btn btn-floating mx-1">
                    <i className="fab fa-twitter fa-2x" style={{ color: "#55acee" }}></i>
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

export default LogOUT;
