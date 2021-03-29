import React, { useEffect, useState } from "react";
import{Link,useHistory} from "react-router-dom";
import axios from "axios";
 import  { Navbar } from "./NavBar";
import Pagination from "react-js-pagination";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as GiIcons from 'react-icons/gi';
import ReactPaginate from 'react-paginate';
import { Confirm } from 'react-st-modal';
import { IconBase } from "react-icons/lib";
import {BiAddToQueue} from 'react-icons/bi'
function Home(props){
    const [p, setP] = useState(false);
const [products, setProducts] = useState([]);
const Token = window.localStorage.adminsToken;
const url = "http://localhost:8000/api/product/getAll";
const[del,setDel]=useState(false);
  
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
    , [del,p]);
    
    
    
    

/** start pagination  */
const [activePage, setActivePage] = useState();
const [itemsCountPerPage, setItemsCountPerPage] = useState();
const [totalItemsCount, setTotalItemsCount] = useState();
const [pageRangeDisplayed, setPageRangeDisplayed] = useState();
function handlePageChange (pageNumber) {;
    setActivePage(pageNumber);

    axios.get(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/product/getAll?page=`+ pageNumber,{
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
           Authorization: 'Bearer ' + Token,
    
        }
    }

    ).then(response => {
        console.log(response.data.current_page)
        console.log(response.data.per_page)
        setActivePage(response.data.current_page)
        setItemsCountPerPage(response.data.per_page)
       setTotalItemsCount(response.data.total)
       setProducts(response.data.data)
    }).catch(error => console.error());
}
    /**End pagination */

    
    /**start Search */
    const [searchName, setSearchName] = useState();
    function handleSearch(e) {
        setSearchName(e.target.value);

    }
    
 
    function search() {
        const Sname = searchName;
        axios.get("http://localhost:8000/api/product/searchByName/"+Sname,{
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
               Authorization: 'Bearer ' + Token,
        
            }
           }).then(
               (response)=>{
                   console.log(response.data.data);
                   setProducts(response.data.data)
               }
           ).catch(
               (error)=>{
                console.log(error)
               }
           )
    }
    /**End Search */

    /** Start Delete */
   
    function onDelete(ID) {

        axios.delete(`http://localhost:8000/api/product/delete/` + ID, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
               Authorization: 'Bearer ' + Token,
        
            }
            }).then(response => {
               console.log(response)
               setDel(!del);
            }).catch(error => console.log(error));
           
        }
/**End Delete */

    return (
<div >
            <Navbar />
          
            <div style={{ width: '900px', display: 'inline-flex',justifyContent:'space-between' }}>
                
                <Link to="product/insert"><BiAddToQueue style={{ fontSize: '20px', fontWeight: 'bold', color:'green' }}></BiAddToQueue><b style={{color:'green'}}>add new</b></Link>
               
              <div style={{display:'inline-flex'}}>
                <input type="search" class=" rounded" placeholder="Search..." aria-label="Search"
                            aria-describedby="search-addon" onChange={handleSearch} style={{borderStyle:'none', borderBottomStyle:'solid',borderBottomColor:'red'}} />
                        <button class="input-group-text border-0" id="search-addon" style={{height:'10'}} onClick={search}>
                            <AiIcons.AiOutlineSearch />
                    </button>
                   </div>
                </div>
              
                
            {/* <div> */}
            {/* <div style={{display:'flex' , justifyContent:'flex-start'}} > */}
                        {/*  */}
                {/* </div> 
                    <div class="input-group rounded" >
                       
                </div>
               */}
                {/* </div> */}


                        <div class="container" style={{marginTop:'5px'}}>

                <div className="row justify-content-center" style={{ marginLeft: '10px' }} >

                    <div class="col-md-20">
                           
                        <div className="card">
                           <div onClick={()=>setP(!p)} className="card-title" style={{ textAlign: 'center',fontWeight:'bold',justifyContent:'center', alignItems:'center' ,color:' rgba(233, 72, 28, 1)',fontSize:'50px' ,padding:'10px',borderRadius:'2px',cursor:'pointer'}}
                            >Products</div>

                            <div class="card-body">
                                <table class="table ">
                                    <thead>
                                        <tr style={{color:'rgba(233, 72, 28, 1)'}}>

                                            <th>#</th>
                                            <th>Image</th>
                                            <th>Bare Code</th>
                                            
                                            <th>Name</th>
                                            <th>Details</th>
                                            <th>Price</th>
                                            <th>Brand</th>
                                            <th>Score</th>
                                            <th>Nutri-Facts</th>
                                            <th>Allergies</th>
                                            <th>Additives</th>
                                            <th>Actions</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        {
                                           products !== null
                                                ? products.map(product => (
                                                    <tr key={product.id}>

                                                        <td name="product_id" >
                                                            {product.id}</td>
                                                        <td name="product_image">
                                                            <img src={`http://localhost:8000/storage/${product.image}`} style={{borderRadius:'50%', width:'50px',height:'50px'}}/>
                                                        </td>
                                                            <td name="product_id" >
                                                            {product.barecode}</td>

                                                        <td name="product_name"
                                                            > {product.name}</td>
                                                        <td name="product_description" 
                                                        > {product.description}</td>
                                                        <td name="product_description" 
                                                            > 4500 L.L</td>
                                                        <td name="product_brand" 
                                                            >{product.brand}</td>
                                                        <td name="product_score" 
                                                            > {product.scores.name}</td>
                                                        <td name="product_nutri" 
                                                             ><Link to={`product_nutri/${product.id}`}><b style={{color:'green',textDecoration:'underline'}}>nutri-facts</b></Link></td>
                                                               <td name="product_allergy"
                                                            ><Link  to={`product_allergy/${product.id}`}><b style={{color:'green',textDecoration:'underline'}}>Allergies</b></Link></td>
                                                              <td name="product_additives"
                                                            ><Link to={`product_additive/${product.id}`}><b style={{color:'green',textDecoration:'underline'}}>Additives</b></Link></td>
                                                      

                                                        <td>
                                                            <Link to={`product/update/${product.id}`} className=" col-md-4 m-2 btn-sm mr-2"><AiIcons.AiFillEdit style={{color:'green'}}/></Link>
                                                            <Link  className="col-md-4 m-2 btn-sm mr-2" onClick={async () => {
                                                                const isConfirm = await Confirm('Are you sure you want to delete? ', 'You cannot undo this action');
                                                                if (isConfirm) {onDelete(product.id)}
                                                            }

                                                            } ><AiIcons.AiOutlineDelete  style={{color:'rgba(233, 72, 28, 1)'}}/></Link>
                                                        </td>
                                                    </tr>
                                                )) :
                                                null

                                        }




                                    </tbody>
                                </table>
                                <div class="d-flex justify-content-center">
                                    <Pagination
                                        activePage={activePage}
                                        itemsCountPerPage={itemsCountPerPage}
                                        totalItemsCount={totalItemsCount}
                                        pageRangeDisplayed={pageRangeDisplayed}
                                        onChange={handlePageChange}
                                        itemClass='page-item'
                                        linkClass='page-link'
                                    />
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div >
            <div>
           


            </div>
</div>
    )
}
export  default Home;