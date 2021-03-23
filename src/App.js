import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Components/login';
import Home from './Components/home';
import { ProtectedRoute } from './Components/ProtectedRoutes/ProtectedRoute'
import  InsertProduct from './Components/Products/Insert';
import Update from './Components/Products/Update';
import Nutri from './Components/Nutri/nutri';
import Allergy from './Components/Allergies/allergy';
import Additive from './Components/Additives/additive';
import InsertNutri from './Components/Nutri/insert';
import UpdateNutri from './Components/Nutri/update';
import InsertAllergy from './Components/Allergies/insert';
import UpdateAllergy from './Components/Allergies/update';
import InsertAdditive from './Components/Additives/insert';
import UpdateAdditive from './Components/Additives/update';
import PDF from './Components/Products/pdf';
import Profile from './Components/Admins/profile';
import { EditAccount } from './Components/Admins/update';
import ProductNutri from './Components/Products/product_nutri';
import ProductAllergy from './Components/Products/product_allergy';
import ProductAdditive from './Components/Products/product_additive';
function App() {
  const token=localStorage.adminsToken;
  return (
   
    <div className="App">
      
<Router>
  <Switch>  
  <Route exact path="/" component={Login} />
            
   {/**Admins*/}
  <ProtectedRoute exact path="/profile" render={(props) => <Profile {...props} />} />
  <ProtectedRoute exact path="/admin/editAccount/:id" render={(props) => <EditAccount {...props} />} />

   {/**Products*/}
  <ProtectedRoute exact path="/home" render={(props) => <Home {...props} />} />
  <ProtectedRoute exact path="/product/insert" render={(props) => <InsertProduct {...props} />} />
  <ProtectedRoute exact path="/product/update/:id" render={(props) => <Update {...props} />} />
  <ProtectedRoute exact path="/product_nutri/:id" render={(props) => <ProductNutri {...props} />} />
  <ProtectedRoute exact path="/product_allergy/:id" render={(props) => <ProductAllergy {...props} />} />
  <ProtectedRoute exact path="/product_additive/:id" render={(props) => <ProductAdditive {...props} />} />
          {/**Nutri*/}
  <ProtectedRoute exact path="/nutri" render={(props) => <Nutri {...props} />} />
  <ProtectedRoute exact path="/nutri/insert" render={(props) => <InsertNutri {...props} />} />
  <ProtectedRoute exact path="/nutri/update/:id" render={(props) => <UpdateNutri {...props}/>} />

                 {/**Allergy*/}
  <ProtectedRoute exact path="/allergy" render={(props) => <Allergy {...props} />} />
  <ProtectedRoute exact path="/allergy/insert" render={(props) => <InsertAllergy {...props} />} />
  <ProtectedRoute exact path="/allergy/update/:id" render={(props) => <UpdateAllergy {...props}/>} />

  
  {/**Additive*/}
  <ProtectedRoute exact path="/additive" render={(props) => <Additive {...props} />} />
  <ProtectedRoute exact path="/additive/insert" render={(props) => <InsertAdditive {...props} />} />
  <ProtectedRoute exact path="/additive/update/:id" render={(props) => <UpdateAdditive {...props} />} />
          
  <ProtectedRoute exact path="/pdf" render={(props) => <PDF {...props}/>} />                
  </Switch>
</Router>
    </div>
  );
}

export default App;
