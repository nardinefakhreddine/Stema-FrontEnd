import React, { useEffect, useState } from "react";
import { Link, NavLink,useHistory} from 'react-router-dom';
import { Navbar } from "../NavBar";
import axios from "axios";
function InsertAllergy(){
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
        axios.post('http://localhost:8000/api/allergy/create',
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
          
           
            history.push('/allergy');
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
                        <div className="card-title" style={{ textAlign: 'center',fontWeight:'bold',justifyContent:'center', alignItems:'center' ,color:' rgba(233, 72, 28, 1)',fontSize:'50px' ,padding:'10px',borderRadius:'2px'}}>Add New Allergy</div>
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
                                <button type="submit" className="btn btn-success" style={{width:'200px'}}>Save</button>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </div>
             
             
     </div>
    )
}
export default InsertAllergy;