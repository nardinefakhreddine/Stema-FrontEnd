import React, { useEffect, useState } from "react";
import{Link,useHistory} from "react-router-dom";
import axios from "axios";
import  { Navbar } from "../NavBar";
import Pagination from "react-js-pagination";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as GiIcons from 'react-icons/gi';
import ReactPaginate from 'react-paginate';
import { Confirm } from 'react-st-modal';
import { BiAddToQueue } from 'react-icons/bi';
function Additive(props){
   
const [products, setProducts] = useState([]);
const Token = window.localStorage.adminsToken;
const url = "http://localhost:8000/api/additive/getAll";
const[del,setDel]=useState(false);
  
useEffect(
    () => {
        axios.get(url, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              //  Authorization: 'Bearer ' + Token,

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
    , [del]);
    
    
    
    

/** start pagination  */
const [activePage, setActivePage] = useState();
const [itemsCountPerPage, setItemsCountPerPage] = useState();
const [totalItemsCount, setTotalItemsCount] = useState();
const [pageRangeDisplayed, setPageRangeDisplayed] = useState();
function handlePageChange (pageNumber) {;
    setActivePage(pageNumber);

    axios.get('http://localhost:8000/api/additive/getAll?page='+ pageNumber,{
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
        axios.get("http://localhost:8000/api/additive/searchByName/"+Sname,{
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              // Authorization: 'Bearer ' + Token,
        
            }
           }).then(
               (response)=>{
                   console.log(response.data);
                   setProducts(response.data)
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

        axios.delete(`http://localhost:8000/api/additive/delete/` + ID, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
               //Authorization: 'Bearer ' + Token,
        
            }
            }).then(response => {
               console.log(response)
               setDel(!del);
            }).catch(error => console.log(error));
           
        }
/**End Delete */

    return (
<div>
  <Navbar/>
  <div style={{ width: '900px', display: 'inline-flex',justifyContent:'space-between' }}>
                
                <Link to="additive/insert" style={{color:'green'}}><BiAddToQueue style={{ fontSize: '20px', fontWeight: 'bold' }}></BiAddToQueue>add new</Link>
               
              <div style={{display:'inline-flex'}}>
                <input type="search" class=" rounded" placeholder="Search..." aria-label="Search"
                            aria-describedby="search-addon" onChange={handleSearch} style={{borderStyle:'none', borderBottomStyle:'solid',borderBottomColor:'red'}}/>
                        <button class="input-group-text border-0" id="search-addon" style={{height:'10'}} onClick={search}>
                            <AiIcons.AiOutlineSearch />
                    </button>
                   </div>
                </div>

                   
                    <div  class="container" style={{marginTop:'5px'}}>
                           
                        <div className="card">
                            <div className="card-title" style={{ textAlign: 'center',fontWeight:'bold',justifyContent:'center', alignItems:'center' ,color:' rgba(233, 72, 28, 1)',fontSize:'50px' ,padding:'10px',borderRadius:'2px'}}
                            >All Additives</div>

                            <div class="card-body">
                                <table class="table ">
                                    <thead>
                                        <tr>

                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Description</th>
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

                                                        <td name="product_name"
                                                            > {product.name}</td>
                                                        <td name="product_description" 
                                                            > {product.desciption}</td>
                                                    
                                                      

                                                        <td>
                                                            <Link to={`additive/update/${product.id}`} className=" col-md-4 m-2 btn-sm mr-2"><AiIcons.AiFillEdit style={{color:'green'}}/></Link>
                                                            <Link  className="col-md-4 m-2 btn-sm mr-2" onClick={async () => {
                                                                const isConfirm = await Confirm('Are you sure you want to delete? ', 'You cannot undo this action');
                                                                if (isConfirm) {onDelete(product.id)}
                                                            }

                                                            } ><AiIcons.AiOutlineDelete  style={{color:' rgba(233, 72, 28, 1)'}}/></Link>
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

    )
}
export  default Additive;