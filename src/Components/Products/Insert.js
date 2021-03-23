import React, { useEffect, useState } from "react";
import { Link, NavLink,useHistory} from 'react-router-dom';
import { Navbar } from "../NavBar";
import axios from "axios";
function InsertProduct(){
    const [scores, setScores] = useState([]);
    let history = useHistory();
    const Token = window.localStorage.adminsToken;
    useEffect(
        () => {
            axios.get("http://localhost:8000/api/product/getScores", {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                   Authorization: 'Bearer ' + Token,
            
                }
            }).then(
                (response) => {
                    setScores(response.data)
                }
            ).catch(
                (error) => {
                    console.log(error)
                }
            )
    }
,[])
    console.log(scores)
    const [score, setScore] = useState();
    function handleScore(e) {
        setScore(e.target.value);
    }
    const [barecode, setBareCode] = useState();
    function handleBareCode(e) {
        setBareCode(e.target.value);
    }
    const [name, setName] = useState();
    function handleName(e) {
        setName(e.target.value);
    }
    const [brand, setBrand] = useState();
    function handleBrand(e) {
        setBrand(e.target.value);
    }
    const [description, setDesc] = useState();
    function handleDesc(e) {
        setDesc(e.target.value);
    }
    const [image, setImage] = useState();
    function handleImage(e) {
        setImage(e.target.value);
    }
    function handleFormSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8000/api/product/create',
            {
                barecode: barecode,
                name: name,
                brand: brand,
                description: description,
                score_id: score,
                image:image

            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.adminsToken}`
                }
            }
        ).then(response => {
           
            setBareCode();
            setName();
            setBrand();
            setDesc();
            setScore()
            setScores()
           
            history.push('/home');
        }
        ).catch(error => {
            console.log(error.response.data)
        });





    }

    
    console.log([barecode,name,brand,description,score])
    return (
        <div>
        <Navbar/>
        <div className="container" >
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Add New Product</div>
                        <div className="card-body">

                            <form  onSubmit={handleFormSubmit}>
                                <div className="form-group">

                                    <input type="text"
                                        required
                                        name="name"
                                        onChange={handleBareCode}
                                        className="form-control"
                                        placeholder="barecode" />
                                </div>
                                <div className="form-group">

                                    <input type="text"
                                        required
                                        name="email"
                                        onChange={handleName}
                                        className="form-control"
                                        placeholder="name" />
                                </div>
                                <div className="form-group">

                                    <input type="text"
                                        required
                                        name="password"
                                        onChange={handleBrand}
                                        className="form-control"
                                        placeholder="brand" />
                                </div>
                                <div className="form-group">
                             
                                <input type="text"
    required
    name="password"
    onChange={handleDesc}
    className="form-control"
    placeholder="description" />
                                    </div>
                                    <div className="form-group">

<input type="text"
    required
    name="image"
    onChange={handleImage}
    className="form-control"
    placeholder="image" />
</div>


                                  <div className="form-group">
                                       

                                           <select type="text"
  
                                           name="password"
  
                                            className="form-control"
                                            placeholder="score" style={{ width: '570px', margin: '0 auto' }}
                                            onChange={handleScore} >
                                            {scores ? scores.map(
                                                (score) => (
                                                    <option  name="score" value={score.id}  key={score.id}>{score.name}</option>
                                            )
                                              
                                            )
                                                
                                            :null}
                                            </select>
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
export default InsertProduct;