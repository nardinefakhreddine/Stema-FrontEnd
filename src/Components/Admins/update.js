import { React, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Navbar } from '../NavBar';
export function EditAccount(props) {
    const adminID = window.localStorage.adminID;
    const [username, setUsername] = useState('');
    const [Name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ID, setID] = useState();
    const match = useRouteMatch('/admin/editAccount/:id');
    const accountID = match.params.id;
    const Token = window.localStorage.adminsToken;
    let history = useHistory();
 

    useEffect(() => {
        axios.get(`http://localhost:8000/api/admin/getById/${accountID}`,
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


  function updateAccount(event) {
        event.preventDefault();
        axios.put(`http://localhost:8000/api/admin/update/${accountID}`,
            {
                name: Name,
                username: username,
                email:email,
                password: password

            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + Token,
                }
            }
        ).then(response => {

            setID('')
            setUsername('');
            setName('');
            setEmail('');
            setPassword('')

            history.push('/profile');
        }
        ).catch(error => {

            console.log(error.response.data)

        })


    }
    //handles
    function handleName(e) {
     setName(e.target.value)
       
    }

    function handleUserName(e) {
        setUsername(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }
    function handleEmail(e) {
        setEmail(e.target.value);
   }
   

    return <div>
        <Navbar />
        <div className="container" >

            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header" style={{ textAlign: 'center' }}>Edit Account</div>
                        <div className="card-body">

                            <form onSubmit={updateAccount}>
                                <div className="form-group">

                                    <input type="text"
                                        required

                                       value={Name}
                                        className="form-control"
                                        placeholder="First Name" onChange={handleName} />
                                </div>
                                <div className="form-group">

                                    <input type="text"
                                        required
                                        name="lastName"
                                        value={username}
                                        className="form-control"
                                        placeholder="Last Name" onChange={handleUserName} />
                                </div>
                                <div className="form-group">

<input type="text"
    required
    name="lastName"
    value={email}
    className="form-control"
    placeholder="Last Name" onChange={handleEmail} />
</div>

                                <div className="form-group">

                                    <input type="password"
                                       

                                        className="form-control"
                                        placeholder="Password" onChange={handlePassword} />
                                </div>


                                <div className="form-group form-check">

                                </div>
                                <button type="submit" className="btn btn-primary" >Update</button>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
}