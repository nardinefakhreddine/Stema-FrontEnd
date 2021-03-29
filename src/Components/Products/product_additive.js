
// import { Navbar } from "react-bootstrap";
import { Navbar } from "../NavBar";
import React, { useEffect, useState } from "react";
import { Link, NavLink,useHistory} from 'react-router-dom';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import { Confirm } from 'react-st-modal';
export default function ProductAdditive() {
  const [data, setData] = useState([]);
  const [nutriID, setNutriID] = useState();
  const [scale, setScale] = useState();
  const [save, setSave] = useState(false);
  const match = useRouteMatch('/product_additive/:id');
    const [nutri, setNutri] = useState([]);
    const [del, setDel] = useState(false);
  const productID = match.params.id;
  useEffect(
    () => {
        axios.get("http://localhost:8000/api/additive/getAllA", {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
             //  Authorization: 'Bearer ' + Token,
        
            }
        }).then(
            (response) => {
                setData(response.data)
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
      
        axios.get("http://localhost:8000/api/getAdditive/"+productID, {
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
           //  Authorization: 'Bearer ' + Token,
      
          }
      }).then(
          (response) => {
          setNutri(response.data)
          console.log(response.data)
          }
      ).catch(
          (error) => {
              console.log(error)
          }
      )
      
      
      
    }
    


    , [save,del])
  function handleNutri(e){
   setNutriID(e.target.value)
  }
  
  function SaveNutri(event) {
    event.preventDefault();
    axios.post('http://localhost:8000/api/AdditiveProd/create',
        {
           product_id:productID,
            additive_id:nutriID,
           
        },
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              //  Authorization: `Bearer ${localStorage.adminsToken}`
            }
        }
    ).then(response => {
      
       setSave(!save)
        
    }
    ).catch(error => {
        console.log(error.response.data)
    });
 }
 function onDelete(id) {
    axios.delete("http://localhost:8000/api/AdditiveProd/delete/" + id).then((response) => {
        alert(response.data)
        setDel(!del);
            
    }
        ).catch(error => console.log(error))
    
}
console.log(productID)
    return (
      <div>
        <Navbar />
        <div className="container" >
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div style={{ textAlign: 'center',fontWeight:'bold',justifyContent:'center', alignItems:'center' ,color:' rgba(233, 72, 28, 1)',fontSize:'50px' ,padding:'10px',borderRadius:'2px'}} >Add New Additive</div>
                        <div className="card-body">

                            <form  onSubmit={SaveNutri} > 
                              
                            
               


                                  <div className="form-group">
                                       

                                           <select type="text"
  
                                           name="nutri"
  
                                            className="form-control"
                                            placeholder="score" style={{ width: '570px', margin: '0 auto' }}
                                                 onChange={handleNutri}        >
                                            {data ? data.map(
                                                (nutri) => (
                                                    <option  name="nutri" value={nutri.id}  key={nutri.id} selected>{nutri.name}</option>
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
          
  
       
    <div className="card" style={{marginTop:'20px'}}>
        <div className="card-title" style={{ textAlign: 'center',fontWeight:'bold' }}
        >Nutri Facts</div>

        <div class="card-body">
            <table class="table ">
                <thead>
                    <tr>

                        <th>#</th>
                        <th>Name</th>
                                    <th>Description</th>
                                    <th>action</th>
                       
                    </tr>

                </thead>
                <tbody>
                  {nutri ? nutri.map(
                    (nut) => (
                      <tr key={nut.id}>
                        <td>{nut.id}</td>
                        <td>{nut.name}</td>
                        <td>{nut.desciption}</td>
                        <td>
                              <Link  className="col-md-4 m-2 btn-sm mr-2" onClick={async () => {
                                                                const isConfirm = await Confirm('Are you sure you want to delete? ', 'You cannot undo this action');
                                                                if (isConfirm) {onDelete(nut.id)}
                                                            }

                                                            } ><i style={{color:'red'}}>delete</i></Link>
                    </td>
                      </tr>
                    )
                  )
                    
                :null }



                </tbody>
            </table>
</div>

        </div>
             
         
        </div>
        </div>
    )
}
