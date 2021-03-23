import React, { useEffect, useState } from "react";
import axios from "axios";
 import  { Navbar } from "../NavBar";

import Pdf from "react-to-pdf";
function PDF(props){
   
const [products, setProducts] = useState([]);
const Token = window.localStorage.adminsToken;
const url = "http://localhost:8000/api/product/getAll";

const ref = React.createRef();
const option = {
    orientation: 'landscape',
    unit: 'in',
    format: [4, 2]
}
useEffect(
    () => {
        axios.get(url, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + Token,

            }
        }).then(
            (response) => {
                console.log(response.data.data);
                setProducts(response.data.data)
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }
    , []);
    
    
    
  
 
   
   

    return (
<div>
  <Navbar/> 
  <div class="container" ref={ref}>

                <div style={{ textAlign: 'center', display: 'flex', justifyContent: 'start' }}><div></div>
                    <div style={{ width: '500px' }}>
                    </div>
                    
                    <Pdf targetRef={ref} filename="products.pdf" option={option} x={.5} y={.5} scale={0.8}>
                        {({ toPdf }) => <button onClick={toPdf} >Generate Pdf</button>}
                    </Pdf>
                    <div></div>
                </div>

                <div className="row justify-content-center" style={{ marginLeft: '10px' }} >

                    <div class="col-md-20">
                           
                        <div className="card">
                            <div className="card-title" style={{ textAlign: 'center',fontWeight:'bold' }}
                            >All Products</div>

                            <div class="card-body">
                                <table class="table ">
                                    <thead>
                                        <tr>

                                            <th>#</th>
                                            <th>Bare Code</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Brand</th>
                                            <th>Score</th>
                                            
                                        
                                        </tr>

                                    </thead>
                                    <tbody>
                                        {
                                           products !== null
                                                ? products.map(product => (
                                                    <tr key={product.id}>

                                                        <td name="product_id" >
                                                            {product.id}</td>
                                                            <td name="product_id" >
                                                            {product.barecode}</td>

                                                        <td name="product_name"
                                                            > {product.name}</td>
                                                        <td name="product_description" 
                                                            > {product.description}</td>
                                                        <td name="product_brand" 
                                                            >{product.brand}</td>
                                                        <td name="product_score" 
                                                            > {product.scores.name}</td>
                                                       
                                                      

                                                        
                                                    </tr>
                                                )) :
                                                null

                                        }




                                    </tbody>
                                </table>
                               
                            </div>

                        </div>
                    </div>
                </div>
            </div >
</div>
    )
}
export  default PDF;