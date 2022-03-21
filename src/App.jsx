import { BrowserRouter as Router,Switch,Route,Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";

import Appointment from "./components/auth/appointment";
import Admin from "./components/auth/admin";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useEffect,useState } from "react";



const App = () => {

    const history = useHistory();

     const [auth, setAuth] = useState(false)
     useEffect(async() => {
        
      let config = {
         headers:{
             "content-Type":"application/json"
         }
     }
     try {
         
         config = {
             headers:{
                 "content-Type":"application/json",
                 "x-auth-token": localStorage.getItem("authToken")
             }
         }
         
 
         const data = await axios.get("http://localhost:8000/api/posts",config);
         setAuth(true);
        
       } catch (error) {
           
       }        
     }, [auth])

     console.log(auth);
  
  
      return(
        <Router> 
        <Navbar/>     
         <Switch>
         <Route path="/appointment" component={Appointment}/>
         <Route path="/admin" component={Admin}/>
            
        <Route path="/" exact component={Appointment} />
         </Switch>  
        </Router>

      )
 
    

  
};

export default App;