import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Components/login';
import Home from './Components/home';
import { ProtectedRoute } from './Components/ProtectedRoutes/ProtectedRoute'
import  InsertProduct from './Components/Products/Insert';
import Update from './Components/Products/Update';
function App() {
  const token=localStorage.adminsToken;
  return (
   
    <div className="App">
      
<Router>
  <Switch>  
  <Route  exact path="/" component={Login}/>
  <ProtectedRoute exact path="/home" render={(props) => <Home {...props} />} />
          <ProtectedRoute exact path="/product/insert" render={(props) => <InsertProduct {...props} />} />
          <ProtectedRoute exact path="/product/update/:id" render={(props) => <Update {...props}/>} />
  
  </Switch>
</Router>
    </div>
  );
}

export default App;
