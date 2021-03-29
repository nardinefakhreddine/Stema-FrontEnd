import React,{useState} from 'react';
import { Navbar } from "../NavBar";
import { Link,useHistory } from 'react-router-dom';
import axios from 'axios';
function InsertAdmin() {
    const [username, setUsername] = useState('');
    const [Name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const Token = window.localStorage.adminsToken;
    let history = useHistory();
  function insert(event) {
        event.preventDefault();
        axios.post("http://localhost:8000/api/admin/create", {
            name: Name,
            username: username,
            email: email,
            password:password,
        },
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + Token,
    
                }
                
            }
            
            ).then(
                (response) => {
                    console.log(response.data)
                    alert("your User Name is " + username);
                    history.push('/')
                   
            }
        ).catch(error=>console.log(error))

}

 /* const insert = async (e) => {
 
         e.preventDefault();
         const url = "http://localhost:8000/api/admin/create";
         const Token = window.localStorage.adminsToken;
         const body = {
             name: Name,
            username: username,
            email: email,
            password:password,
         }
         const respond = await fetch(url, {
             method: 'POST',
             headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json',
                 Authorization: 'Bearer ' + Token,
 
             }
            
         });
         console.log(respond);
         const res = await respond.json();
         console.log(res.message);
       
 
         history.push(`/`);
         
 
     }
*/

    function handleName(e) {
        setName(e.target.value);
    }
    function handleUsername(e) {
        setUsername(e.target.value);
    }
    function handleEmail(e) {
        setEmail(e.target.value);
    }
    function handlePassword(e) {
        setPassword(e.target.value);
    }
    console.log([Name, email, username, password]);
    return (
        <div>
        <Navbar/>
        <div className="row justify-content-center">
            <div className="col-md-4">
                <div className="card">
                    <div className="card" style={{ textAlign: 'center',fontWeight:'bold',justifyContent:'center', alignItems:'center' ,color:' rgba(233, 72, 28, 1)',fontSize:'50px' ,padding:'10px',borderRadius:'2px'}}>New Account</div>
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <input type="text" placeholder="your Name" value={Name} onChange={handleName}/>
                                </li>
                                <li className="list-group-item"><input type="text" placeholder="User Name" value={username} onChange={handleUsername}/></li>
                                <li className="list-group-item"><input type="text" placeholder="Email" value={email} onChange={handleEmail}/></li>
                                <li className="list-group-item"><input type="password" placeholder="password" value={password} onChange={ handlePassword}/></li>

                            <li className="list-group-item"><Link onClick={insert}><button type="submit" className="btn btn-success" style={{width:'200px',marginTop:'20px'}} >Create</button></Link></li>
                            <li className="list-group-item"></li>
                        </ul>

                    </div>
                </div></div>

        </div>
    </div>
    )
}
export default InsertAdmin;