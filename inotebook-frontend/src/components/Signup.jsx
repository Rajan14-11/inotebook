import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../axios"

function Signup(props) {
     const history = useNavigate();

     const [credentials, setCredentials] = useState({
        name:"",
       email: "",
       password: "",
       confirmpassword:""
     });

     const handleSubmit = async (e) => {
       e.preventDefault();
       const {name,email,password,confirmpassword} = credentials
       if(password===confirmpassword){

         const response = await axios.post(
           "/api/auth/createuser",
           { name,email, password},
           {
             headers: {
               "Content-Type": "application/json",
             },
           }
         );

         const json = await response.data;
         console.log(json);
         if (json.success) {
           localStorage.setItem("token", json.authToken);

           history("/");
           props.showAlert('Account Created successfully')
         } else {
           props.showAlert("Invalid Credentials")
         }
       }else{
        props.showAlert('Passwords dont match')
       }
     };

    const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

  return (
    <div className='mt-4'>
      <h2>SignUp to Continue...</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            value={credentials.name}
            onChange={onChange}
            id="name"
            name="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={credentials.email}
            onChange={onChange}
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={credentials.password}
            onChange={onChange}
            name="password"
            id="password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            value={credentials.confirmpassword}
            onChange={onChange}
            name="confirmpassword"
            id="confirmpassword"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup