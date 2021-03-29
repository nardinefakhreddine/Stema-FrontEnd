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
    const [price, setPrice] = useState('');
    function handlePrice(e) {
        setPrice(e.target.value);
    }
    const [image, setImage] = useState();
    function handleImage(file) {
        setImage(file[0]);
    }
    function handleFormSubmit(event) {
        const fd = new FormData();
      
      fd.append('image', image);
        fd.append('barecode', barecode);
        fd.append('name', name);
        fd.append('brand', brand);
        fd.append('score_id', score);
        fd.append('description', description);
        fd.append('price',price);
        event.preventDefault();
        axios.post('http://localhost:8000/api/product/create', 
            fd
            
           
           ,

        
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  //  Authorization: `Bearer ${localStorage.adminsToken}`
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

    
  //  console.log([barecode,name,brand,description,score])
  
    return (
        <div>
        <Navbar/>
        <div className="container" >
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card" style={{ textAlign: 'center',fontWeight:'bold',justifyContent:'center', alignItems:'center' ,color:' rgba(233, 72, 28, 1)',fontSize:'50px' ,padding:'10px',borderRadius:'2px'}}>Add New Product</div>
                        <div className="card-body">

                            <form  onSubmit={handleFormSubmit} enctype="multipart/form-data" >
                                <div className="form-group">

                                    <input type="text"
                                     
                                        name="name"
                                        onChange={handleBareCode}
                                        className="form-control"
                                        placeholder="barecode" />
                                </div>
                                <div className="form-group">

                                    <input type="text"
                                       
                                        name="email"
                                        onChange={handleName}
                                        className="form-control"
                                        placeholder="name" />
                                    </div>
                                    <div className="form-group">

<input type="text"
   
    name="price"
    onChange={handlePrice}
    className="form-control"
    placeholder="price" />
</div>
                                <div className="form-group">

                                    <input type="text"
                                     
                                        name="brand"
                                        onChange={handleBrand}
                                        className="form-control"
                                        placeholder="brand" />
                                </div>
                                <div className="form-group">
                             
                                <input type="text"
   
    name="description"
    onChange={handleDesc}
    className="form-control"
    placeholder="description" />
                                    </div>
                                    <div className="form-group">

<input type="file"
    id='image'
    name="image"
    onChange={(e)=>handleImage(e.target.files)}
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
                                <button type="submit" className="btn btn-success" style={{width:'200px',marginTop:'20px'}}>Save</button>
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