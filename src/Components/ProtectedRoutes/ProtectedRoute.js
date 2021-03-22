import React from "react";
import { Redirect } from 'react-router-dom';

export const ProtectedRoute = (props) =>{

    return localStorage.getItem('adminsToken')? <props.render/>:<Redirect to = '/'/>
    // console.log(props)
    //     if(props.verified){
    //         if(localStorage.getItem('role')=='teacher'){
    //             return <props.render/>
    //         }else{
    //             return <Redirect to = {`/${localStorage.getItem('role')}/home`}/>
    //         }
    //     }else{
    //         return <Redirect to = '/'/>
    //     }
}
// export const SchoolAdminProtectedRoute = (props) =>{

//     if(props.verified){
//         if(localStorage.getItem('role')=='schooladmin'){
//             return <props.render/>
//         }else{
//             return <Redirect to = {`/${localStorage.getItem('role')}/home`}/>
//         }
//     }else{
//         return <Redirect to = '/'/>
//     }
// }