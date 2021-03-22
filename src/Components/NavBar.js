import React, { useState } from 'react';
import { Link, NavLink,useHistory} from 'react-router-dom';
import axios from "axios";
import { Data } from './SideBarData';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from "react-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css';

export function Navbar(props) {
    const [sidebar, setSideBar] = useState(false);
    let history = useHistory();

    const  handleLogout = async (e) => {
 
         e.preventDefault();
         const url = "http://localhost:8000/api/admin/logout";
         const Token = window.localStorage.adminsToken;
         const body = {
 
         }
         const respond = await fetch(url, {
             method: 'GET',
             headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json',
                 Authorization: 'Bearer ' + Token,
 
             }
            
         });
         console.log(respond);
         const res = await respond.json();
         console.log(res.message);
         localStorage.removeItem("adminToken");
 
         history.push(`/`);
         console.log(localStorage.adminsToken);
 
     }





    const showSideBar = () => setSideBar(!sidebar);

    return (<>
        <div className="navbar">
            <Link className="menu-bars" ><FaIcons.FaBars onClick={showSideBar} value={{ color: 'black' }}
            ></FaIcons.FaBars></Link>
            <div className="logo"><img src="/Stema-in-header.png" alt="logo" style={{ width: '50px', height: '50px' }} /></div>
            <div style={{ cursor: 'pointer' }} onClick={(e) => handleLogout(e)}  > <AiIcons.AiOutlineLogout />Logout</div>
        </div>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'} id="nav-menu">
            <IconContext.Provider value={{ color: "white", size: "2em" }} >
                <ul className="nav-menu-items">
                    <li className="navbar-toggle">
                        <img src="/logo-stema.png" style={{borderRadius:'50%',width:'50px',height:'50px'}}/>
                        <Link className="menu-bars">
                        <FaIcons.FaBars onClick={showSideBar} style={{ marginLeft: '90px', fontSize: '15px' }} />
                        </Link>
                    </li>
                    {sidebar? Data.map((item, index) => {
                        return (<li key={index} className={item.cname} >
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                        )
                    }):null}
                   
                </ul>
            </IconContext.Provider>
        </nav>

    </>
    )
}
