import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import  {initializeApp} from "firebase/app"

 

const firebaseConfig = {
  apiKey: "AIzaSyD7-KrO-EyNIviQpqgIr6qpWjrlhSFMhLU",
  authDomain: "travello-a4f85.firebaseapp.com",
  projectId: "travello-a4f85",
  storageBucket: "travello-a4f85.appspot.com",
  messagingSenderId: "233219523292",
  appId: "1:233219523292:web:236038cdbc556abcabaa19"
}

initializeApp(firebaseConfig);



const root = ReactDOM.createRoot(document.getElementById("root"));
 
root.render(
  <BrowserRouter>


    <React.StrictMode>
      <App />
    </React.StrictMode>
   </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
 