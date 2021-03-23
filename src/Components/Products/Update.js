import React, { useEffect, useState } from "react";
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import { Navbar } from "../NavBar";
import axios from "axios";

function Update() {
    const [scores, setScores] = useState([]);
    const [barecode, setBareCode] = useState();
    const [name, setName] = useState();
    const [brand, setBrand] = useState();
    const [description, setDesc] = useState();
    const [image, setImage] = useState();
    const [score, setScore] = useState();
    const [scoreName, setScoreName] = useState();
    let history = useHistory();
    const [products, setProducts] = useState([]);
    const match = useRouteMatch('/product/update/:id');
    const productID = match.params.id;
    const Token = window.localStorage.adminsToken;
    useEffect(
        () => {
            axios.get("http://localhost:8000/api/product/getScores",
                {
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


            axios.get("http://localhost:8000/api/product/edit/" + productID,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                       Authorization: 'Bearer ' + Token,
                
                    }
            }
            
            ).then(
                (response) => {
                    setBareCode(response.data.barecode);
                    setName(response.data.name);
                    setBrand(response.data.brand);
                    setDesc(response.data.description);
                    setImage(response.data.image);
                    setScore(response.data.score_id);
                    setScoreName(response.data.scores.name)
                }
            ).catch(
                (error) => {
                    console.log(error)
                }
            )

        }
        , [])



    function handleScore(e) {
        setScore(e.target.value);
    }

    function handleBareCode(e) {
        setBareCode(e.target.value);
    }

    function handleName(e) {
        setName(e.target.value);
    }

    function handleBrand(e) {
        setBrand(e.target.value);
    }

    function handleDesc(e) {
        setDesc(e.target.value);
    }

    function handleImage(e) {
        setImage(e.target.value);
    }
    /**update  */
    function onUpdate(event) {
        event.preventDefault();
        axios.put("http://localhost:8000/api/product/update/" + productID, {
            barecode: barecode,
            name: name,
            brand: brand,
            description: description,
            score_id: score,
            image: image


        },

            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.adminsToken}`
                }
            }


        ).then(
            (response) => {
                console.log(response.data)
                history.push('/home')
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
                        <div className="card-header">Edit Product</div>
                        <div className="card-body">

                            <form onSubmit={onUpdate} >
                                <div className="form-group">

                                    <input type="text"
                                        required
                                        name="barecode"
                                        value={barecode}
                                        onChange={handleBareCode}
                                        className="form-control"
                                        placeholder="barecode" />
                                </div>
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
                                        name="brand"
                                        value={brand}
                                        onChange={handleBrand}
                                        className="form-control"
                                        placeholder="brand" />
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
                                <div className="form-group">

                                    <input type="text"
                                        required
                                        name="image"
                                        value={image}
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
                                        <option name="score" value={score}>{scoreName}</option>
                                        {scores ? scores.map(
                                            (s) => (
                                                <option name="score" value={s.id} key={s.id}  >{s.name} </option>
                                            )

                                        )

                                            : null}
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
export default Update;