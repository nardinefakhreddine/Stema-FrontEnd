import React, { Component, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from '../NavBar';
import { BiAddToQueue } from 'react-icons/bi';
function Profile() {
    const adminID = window.localStorage.adminID;
    const [username, setUsername] = useState('');
    const [Name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [ID, setID] = useState();
    const Token = window.localStorage.adminsToken;
   
    useEffect(() => {
        axios.get(`http://localhost:8000/api/admin/getById/${adminID}`,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + Token,
    
                }
        }).then((response) => {
            console.log(response.data);
            setID(response.data.id)
            setUsername(response.data.username);
            setName(response.data.name);
            setEmail(response.data.email);
          
        }

        ).catch((error) => {
            console.log(error);

        })

    }

        , []);
    return (<div>
        <Navbar />
         
        <div className="row justify-content-center">
            <div className="col-md-4">
                <div className="card"   >
                    <div className="card" style={{ textAlign: 'center',fontWeight:'bold',justifyContent:'center', alignItems:'center' ,color:' rgba(233, 72, 28, 1)',fontSize:'50px' ,padding:'10px',borderRadius:'2px'}} >Admin Profile</div>
                    <div className="card-body">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">ID:&nbsp;&nbsp;<b>{ID}</b></li>
                            <li className="list-group-item">Name:&nbsp;&nbsp;<b>{Name}</b></li>
                            <li className="list-group-item">Username:&nbsp;&nbsp;<b>{username}</b></li>
                            <li className="list-group-item">Email:&nbsp;&nbsp;<b>{email}</b></li>

                            <li className="list-group-item"><Link to={`/admin/editAccount/${ID}`}><button type="submit" className="btn btn-success" >Edit User Account</button></Link></li>
                            <li className="list-group-item"><Link to="admin/insert"><BiAddToQueue style={{ fontSize: '20px', fontWeight: 'bold',color:'green' }}></BiAddToQueue><b style={{color:'green'}}>add new</b></Link></li>
                        </ul>

                    </div>
                </div></div>

        </div>
    </div>);
}
export default Profile;