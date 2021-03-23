import React, { useEffect, useState } from "react";
import { Link, NavLink,useHistory} from 'react-router-dom';
import { Navbar } from "../NavBar";
import axios from "axios";
function InsertAdditive(){
    let history = useHistory();
    const Token = window.localStorage.adminsToken;
    
    const [name, setName] = useState();
    function handleName(e) {
        setName(e.target.value);
    }

    const [description, setDesc] = useState();
    function handleDesc(e) {
        setDesc(e.target.value);
    }
   
    function handleFormSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8000/api/additive/create',
            {
               
                name: name,
                desciption: description,

            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                   // Authorization: `Bearer ${localStorage.adminsToken}`
                }
            }
        ).then(response => {
            setName();
            setDesc();
          
           
            history.push('/additive');
        }
        ).catch(error => {
            console.log(error.response.data)
        });





    }

    
    console.log([name,description])
    return (
        <div>
        <Navbar/>
        <div className="container" >
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Add New Additive</div>
                        <div className="card-body">

                            <form  onSubmit={handleFormSubmit}>
                               
                                <div className="form-group">

                                    <input type="text"
                                        required
                                        name="name"
                                        onChange={handleName}
                                        className="form-control"
                                        placeholder="name" />
                                </div>
                             
                                <div className="form-group">
                             
                                <input type="text"
                                       required
                                    name="description"
                                    onChange={handleDesc}
                                    className="form-control"
                                    placeholder="description" />
                                    </div>
                                   







                                <div className="form-group form-check">

                                </div>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </div>
             
             
     </div>
    )
}
export default InsertAdditive;