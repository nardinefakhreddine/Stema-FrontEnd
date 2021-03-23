import React, { useEffect, useState } from "react";
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { Navbar } from "../NavBar";
import axios from "axios";

function UpdateAdditive() { 
    const [name, setName] = useState(); 
    const [description, setDesc] = useState();
    let history = useHistory();
    const match = useRouteMatch('/additive/update/:id');
    const productID = match.params.id;
    const Token = window.localStorage.adminsToken;
    useEffect(
        () => {
           
            axios.get("http://localhost:8000/api/additive/edit/" + productID,
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
        axios.put("http://localhost:8000/api/additive/update/" + productID, {
           
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
                history.push('/additive')
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
                        <div className="card-header">Edit Additive </div>
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
export default UpdateAdditive;