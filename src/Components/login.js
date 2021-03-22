import {React,useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import{Link,useHistory} from "react-router-dom";
import axios from "axios";
import './login.css';

function Login(){
let history = useHistory();
const[username,setUsername]=useState('');
const[password,setPassword]=useState('');
 const url="http://localhost:8000/api/admin/login"

  const submitState = (e) => {
    e.preventDefault();
 axios.post(url ,
 {
  username: username,
  password: password
},
{
  headers: {
      "Accept": "application/json",
      "content-type": "application/json"
  }
}
 
 ).then(res => {
  localStorage.setItem("adminsToken", res.data.access_token);
  localStorage.setItem("adminID", res.data.adminID);
  console.log(localStorage.adminsToken);
  history.push('/home')
})
.catch(err => {
  console.log(err);
});
 }

  const handleUser=(e)=>{
setUsername(e.target.value);

}

 const handlePassword=(e)=>{
    setPassword(e.target.value);
  
}


    return (

<div className="wrapper fadeInDown">
  <div id="formContent">
    <div className="fadeIn first">
      <img src="/logo-stema.png" id="icon" alt="User Icon" />
    </div>
    <form>
      <input type="text"
       id="login"
        className="fadeIn second"
         name="userName"
          placeholder="userName" 
          value={username}
          onChange={handleUser}
          
          />
      <input type="text"
       id="password"
        className="fadeIn third"
         name="login"
          placeholder="password" 
          value={password}
          onChange={handlePassword}
          
          />
      <input type="submit" className="fadeIn fourth" value="Log In" onClick={submitState}/>
    </form>
    <div id="formFooter">
      <Link className="underlineHover" href="#">Forgot Password?</Link>
    </div>
</div>
</div>   )
}
export  default Login;