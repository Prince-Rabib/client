import React,{useEffect, useState,useRef} from 'react'
import { makeStyles, Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import { useHistory,useLocation } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Select from '@material-ui/core/Select';
import BuildIcon from '@material-ui/icons/Build';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
const useStyles = makeStyles((theme) =>({
     
    Typography:{
        color:"white"
    },

    background:{
        backgroundImage:`url(${"https://wallpaperaccess.com/full/2056568.jpg"})`,
        
    },
    gridCover:{
        marginTop:theme.spacing(8),
        height:900,
        display:'flex',
        flexDirection: 'column',
        textAlign:'center',
      
        justifyContent:'center',

        backdropFilter: "blur(6px)",
        backgroundColor:'rgba(0,0,30,0.4)'
     },


    grid:{
        marginTop:theme.spacing(8),
        height:900,
        display:'flex',
        flexDirection: 'column',
        textAlign:'center',        
        justifyContent:'center',
        backgroundColor:'rgba(0,0,30,0.4)',
        backdropFilter: "blur(6px)",
     },


     paperStyle:{

        padding :20,
        height:'90vh',
        width:500, 
        margin:"20px auto",
        
     },
     password:{
       marginTop: theme.spacing(3)
     },
     color:{
         color:"blue"
     },
     submitButton :{
        marginTop: theme.spacing(4)
     },
     typo:{
         marginTop: theme.spacing(0)
     },
        logo:{
         marginTop: theme.spacing(1)
     }
}))

const Login=()=>{
    const [fieldError,setError] = useState({                
                 name:"",
                 phone:"",
                 car:"",
                 car_engine:"",
                 address:"",
                 mechanic:"",
                 date:""});

    const [name, setname] = useState("");
    const [phone,setphone] = useState("");
    const [car, setcar] = useState("");
    const [car_engine, setcar_engine] = useState("");
    const [address,setaddress] = useState("");
    const [mechanic, setmechanic] = useState("");
    const [date,setdate] = useState("");        
    const [check,setCheck] =useState(false);
    const [open,setOpen] =useState({
                status:false,
                message: " ",
                
    })

   const history = useHistory();
   const {state} = useLocation();
   const classes = useStyles();

    const handleRoute = (result) =>{      
    history.push('/'+result)
   }
    
    const avatarStyle={backgroundColor:'#3F51B5'}
    const btnstyle={margin:'8px 0'}

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }   
        setOpen(false);
      };
    const exampleInput = useRef();
    const loginHandler = async(e)=>{
          
        console.log("working");
        
        try {
  
            let data = await axios.post("https://serverm1235.herokuapp.com/api/appointment",{                
                "name":name,
                "phone":phone,
                "car":car,
                "car_engine":car_engine,
                "address":address,
                "mechanic":mechanic,
                "date":date,
              });

            let errors = data.data.error;
            console.log(errors);
            let allErrors={
                 name:"",
                 phone:"",
                 car:"",
                 car_engine:"",
                 address:"",
                 mechanic:"",
                 date:""
            };

            if(errors){
            errors.map(e=>{

                 if(e.param == "name"){
                    allErrors.name = e.msg;
                 }else if(e.param == "car"){
                     allErrors.car = e.msg;
                 }else if(e.param == "car_engine"){
                     allErrors.car_engine = e.msg;
                 }else if(e.param == "address"){
                     allErrors.address = e.msg;
                 }else if(e.param == "mechanic"){
                     allErrors.mechanic = e.msg;
                 }else if(e.param == "date"){
                     allErrors.date = e.msg;
                 }else if(e.param == "phone"){
                     allErrors.phone = e.msg;
                 }
              })
                




            setError(allErrors);
            }else{
            setError(allErrors);
            setOpen({
               
                status:true,
                message: "Appointment is Completed",
                severity: "success",
                
              })
              
             
           }

            } catch(error) {

            const err = error.response.data
            
            setOpen({
               
                status:true,
                message: err.msg,
                severity: "error",
                
            })
            
      }
   }
            useEffect(() => {

                let allErrors={
                    name:"",
                    phone:"",
                    car:"",
                    car_engine:"",
                    address:"",
                    mechanic:"",
                    date:""
                };
                setError(allErrors);
            },[] )

    return(
        <>
        
        <Grid container className={classes.background}>
            <Grid item sm={7} className={classes.gridCover}>  
                
               <div>
                   <Typography className={classes.Typography} variant="h4" component="h1" gutterBottom>Take Your Car to the next level</Typography>
                   <Typography className={classes.Typography} variant="h6" component="h5" gutterBottom>Service at your home or office · 7 days a week · Fair and transparent pricing</Typography>
                   <Typography className={classes.Typography} variant="h5" component="h5" gutterBottom>12-month / 12,000 mile warranty</Typography>
                     <Button type='submit' color='primary' variant="contained">Contact Us</Button>
               </div>
                
            </Grid>
           <Grid item sm={5} className={classes.grid} > 
            {(check==true)? <h1>welcome</h1> : 
            <Paper elevation={12} className={classes.paperStyle}>
                <Grid align='center'>
                     <Avatar className = {classes.logo} style={avatarStyle}><BuildIcon/></Avatar>
                     <Typography className={classes.typo} variant="h4" component="h1">
                      Car Fixer
                     </Typography>
                </Grid>

                 {(fieldError.name)?  
                   <TextField
                   error
                   helperText={fieldError.name}
                   className={classes.password}
                   id="outlined-password-input"
                   label="Name"
                   type="text"
                   autoComplete="current-password"
                   variant="outlined"
                   onChange={(e)=>setname(e.target.value)}
                   fullWidth
                  />               
                 
                 :
                 
                 <TextField
                   className={classes.password}
                   id="outlined-password-input"
                   label="Name"
                   type="text"
                   inputRef={exampleInput}
                   autoComplete="current-password"
                   variant="outlined"
                   onChange={(e)=>setname(e.target.value)}
                   fullWidth
                  />
                 
                 }

                 
               {(fieldError.phone)? 
                <TextField
                   error
                   helperText={fieldError.phone}
                   className={classes.password}
                   id="outlined-password-input"
                   label="Phone"
                   type="number"
                   autoComplete="current-password"
                   variant="outlined"
                   onChange={(e)=>setphone(e.target.value)}
                   fullWidth
                  />
                   : 
                <TextField
                   className={classes.password}
                   id="outlined-password-input"
                   label="Phone"
                   type="number"
                   inputRef={exampleInput}
                   autoComplete="current-password"
                   variant="outlined"
                   onChange={(e)=>setphone(e.target.value)}
                   fullWidth
                  />  }
                  
                 {(fieldError.car)? 
                 <TextField
                                    error
                   helperText={fieldError.car}
                   className={classes.password}
                   id="outlined-password-input"
                   label="Car License Number"
                   type="number"
                   autoComplete="current-password"
                   variant="outlined"
                   onChange={(e)=>setcar(e.target.value)}
                   fullWidth
                  />:

                 <TextField
                   className={classes.password}
                   id="outlined-password-input"
                   label="Car License Number"
                   type="number"
                   inputRef={exampleInput}
                   autoComplete="current-password"
                   variant="outlined"
                   onChange={(e)=>setcar(e.target.value)}
                   fullWidth
                   />
                 }

                  {(fieldError.car_engine)?  
                   
                  <TextField
                   error
                   helperText={fieldError.car_engine}
                   className={classes.password}
                   id="outlined-password-input"
                   label="Car Engine Number"
                   type="number"
                   autoComplete="current-password"
                   variant="outlined"
                   onChange={(e)=>setcar_engine(e.target.value)}
                   fullWidth
                  />
                  
                  : 

                                  <TextField
                   className={classes.password}
                   id="outlined-password-input"
                   label="Car Engine Number"
                   type="number"
                   inputRef={exampleInput}
                   autoComplete="current-password"
                   variant="outlined"
                   onChange={(e)=>setcar_engine(e.target.value)}
                   fullWidth
                  />
                   } 
                     {(fieldError.address)?
                       
                    <TextField
                    error
                   helperText={fieldError.address}                   
                   className={classes.password}
                   id="outlined-password-input"
                   label="Address"
                   type="Text"
                   autoComplete="current-password"
                   variant="outlined"
                   onChange={(e)=>setaddress(e.target.value)}
                   fullWidth
                  />
                     
                     
                     :

                  <TextField
                   className={classes.password}
                   id="outlined-password-input"
                   label="Address"
                   type="Text"
                   
                   autoComplete="current-password"
                   variant="outlined"
                   onChange={(e)=>setaddress(e.target.value)}
                   fullWidth
                   inputRef={exampleInput}
                  />
                     
                     }
                   {(fieldError.date)?

                    <TextField
                   error
                   helperText={fieldError.date}                                                         
                   className={classes.password}
                   id="outlined-password-input"
                   type="date"
                   autoComplete="current-password"
                   variant="outlined"
                   onChange={(e)=>setdate(e.target.value)}
                   fullWidth
                  />
                   
                   :
                    <TextField
                   className={classes.password}
                   id="outlined-password-input"
                   type="date"
                   inputRef={exampleInput}
                   autoComplete="current-password"
                   variant="outlined"
                   onChange={(e)=>setdate(e.target.value)}
                   fullWidth
                  />

                   }
                    {(fieldError.mechanic)?
                                           <Select
                    error
                    helperText="Select Your Mechanic" 
                    className={classes.password}
                    native
                    fullWidth
                    variant="outlined"
                    inputProps={{
                        name: 'None',
                        id: 'outlined-age-native-simple',
                    
                    }}

                    onChange={(e)=>setmechanic(e.target.value)}
                    >
                    <option >Choose Your Mechanic</option>
                    <option value={"Abdul karim"}>Abdul karim</option>
                    <option value={"Bellal Ahmed"}>Bellal Ahmed</option>
                    <option value={"Rubel Hossain"}>Rubel Hossain</option>
                    <option value={"Sakawat Chowdhury"}>Sakawat Chowdhury</option>
                    <option value={"Ibrahim Khan"}>Ibrahim Khan</option>
                    </Select>     
                    :
                    <Select
                    className={classes.password}
                    native
                    fullWidth
                    helperText="Choose your Mechanic"
                    variant="outlined"
                    inputProps={{
                        name: 'None',
                        id: 'outlined-age-native-simple',
                    
                    }}

                    onChange={(e)=>setmechanic(e.target.value)}
                    >
                    <option >Choose Your Mechanic</option>
                    
                    <option value={"Abdul karim"}>Abdul karim </option>
                    <option value={"Bellal Ahmed"}>Bellal Ahmed </option>
                    <option value={"Rubel Hossain"}>Rubel Hossain </option>
                    <option value={"Sakawat Chowdhury"}>Sakawat Chowdhury </option>
                    <option value={"Ibrahim Khan"}>Ibrahim Khan </option>
                    </Select>     
                    
                    }
                       
                <Button className={classes.submitButton} type='submit' color='primary' variant="contained"  onClick={()=> loginHandler()} fullWidth>Make Appointment</Button>
            </Paper>
            }              
            </Grid>
                    

        </Grid>


        <div className={classes.snackbar}>

        <Snackbar  open={open.status} autoHideDuration={6000} onClose={handleClose}>
            <Alert  severity={open.severity} onClose={handleClose}>
                {open.message}
            </Alert>
        </Snackbar>  
                
     </div>
     </>
    )
}

export default Login