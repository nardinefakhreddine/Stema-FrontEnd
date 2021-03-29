import React, { useEffect, useState } from "react";
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { Navbar } from "../NavBar";
import axios from "axios";

function UpdateAllergy() { 
    const [name, setName] = useState(); 
    const [description, setDesc] = useState();
    let history = useHistory();
    const match = useRouteMatch('/allergy/update/:id');
    const productID = match.params.id;
    const Token = window.localStorage.adminsToken;
    useEffect(
        () => {
           
            axios.get("http://localhost:8000/api/allergy/edit/" + productID,
                 {
                     headers: {
                         Accept: 'application/json',
                         'Content-Type': 'application/json',
                      //  Authorization: 'Bearer ' + Token,
                 
                     }
             }
             
             ).then(
                 (response) => {
                    
                     setName(response.data.name);
                     setDesc(response.data.desciption);
                 }
                 
             ).catch(
                 (error) => {
                     console.log(error)
                 }
             )

        }
        , [])



    
    

    function handleName(e) {
        setName(e.target.value);
    }

   
    function handleDesc(e) {
        setDesc(e.target.value);
    }

   
    /**update  */
    function onUpdate(event) {
        event.preventDefault();
        axios.put("http://localhost:8000/api/allergy/update/" + productID, {
           
            name: name,
        
            desciption: description,
         


        },

            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  //  Authorization: `Bearer ${localStorage.adminsToken}`
                }
            }


        ).then(
            (response) => {
                console.log(response.data)
                history.push('/allergy')
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )

    }



    return (<div>
        <Navbar />
        <div className="container" >
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-title" style={{ textAlign: 'center',fontWeight:'bold',justifyContent:'center', alignItems:'center' ,color:' rgba(233, 72, 28, 1)',fontSize:'50px' ,padding:'10px',borderRadius:'2px'}}>Edit Allergy </div>
                        <div className="card-body">

                            <form onSubmit={onUpdate} >
                          
                                <div className="form-group">

                                    <input type="text"
                                        required
                                        name="name"
                                        value={name}
                                        onChange={handleName}
                                        className="form-control"
                                        placeholder="name" />
                                </div>
                              
                                <div className="form-group">

                                    <input type="text"
                                        required
                                        name="description"
                                        value={description}
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
export default UpdateAllergy;