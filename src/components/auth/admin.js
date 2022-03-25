import React,{useState, useEffect} from 'react'
import { makeStyles, Grid,Paper, Avatar, TextField, Button, Typography,Link, responsiveFontSizes } from '@material-ui/core'

import axios from 'axios';
import { useHistory } from "react-router-dom";
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const useStyles = makeStyles((theme) =>({

    grid:{
        marginTop:theme.spacing(10),
        height:'100%',
        display:'flex',
        flexDirection: 'column',
        textAlign:'center',        
     },
     snackbar:{
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
     },
     password:{
        marginTop: theme.spacing(2)
      },
      signup:{
        marginTop: theme.spacing(2)
      },
      paperStyle:{
        padding :20,
        height:'70vh',
        width:500, 
        margin:"20px auto",
  
     },
     signupSection:{
        marginTop:theme.spacing(3),
        marginBottom:theme.spacing(3)
     }
    
    
}))

 

const Register =()=>{
     
     const [date,setdate] = useState("");    
     const [mechanic, setmechanic] = useState("");
     const [rows,Setrows]= useState([]);
     const [open,setOpen] =useState({
        status:false,
        message: " ",

     })

     const option_list = [
        {
         name:"Abdul karim"
        },
                {
          name:"Bellal Ahmed"
        },
                {
          name:"Rubel Hossain"
        },
                {
          name:"Sakawat Chowdhury"
        },
                {
          name:"Ibrahim Khan"
        },
     ]

        const history = useHistory();

        const handleRoute = (result) =>{
      
              history.push('/'+result)

        }
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }    
        setOpen(false);
      };

      function createData(name, calories, fat, carbs, protein) {
      return { name, calories, fat, carbs, protein };
       }
   
    useEffect(async() => {
    try {
        const data = await axios.get("https://serverm1235.herokuapp.com/api/appointment");

        console.log(data)
        if(data.data){
            Setrows(data.data);
        }
 
    }   catch (error) {
     
        history.push('/appointment')
    }
  
   },[rows])

   
    const classes = useStyles();



        const loginHandler = async(value,valueDate)=>{
          
        
         let setupDate = date
         if(!date){
             setupDate = valueDate;
         }
        
        try {

            let data = await axios.post("https://serverm1235.herokuapp.com/api/appointment/update",{                
                "mechanic":mechanic,
                "date":setupDate,
                "id":value
                
              });
              if(data){
              setOpen({
               
                status:true,
                message: "Changed Updated",
                severity: "success",
                
              })
              
            }
           
            

            } catch(error) {

            console.log(error.message);
            
            setOpen({
               
                status:true,
                message: "Mechanic is not available at this date",
                severity: "error",
                
            })
            
      }
   }

    return(
      <>
        <Grid className={classes.grid}>
            
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell align="center">Phone Number</TableCell>
                          <TableCell align="center">Address</TableCell>
                          <TableCell align="center">Car License Number</TableCell>
                          <TableCell align="center">Car Engine Number</TableCell>
                          <TableCell align="center">Mechanics</TableCell>
                          <TableCell align="center">Date</TableCell>
                          <TableCell align="center">Change Mechanic</TableCell>
                          <TableCell align="center">Change Date</TableCell>
                          <TableCell align="center">Submit</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.slice(0).reverse().map((row) => (
                          <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                             {row.name}
                            </TableCell>
                            <TableCell align="center">{row.phone}</TableCell>
                            <TableCell align="center">{row.address}</TableCell>
                            <TableCell align="center">{row.car}</TableCell>
                            <TableCell align="center">{row.car_engine}</TableCell>
                            <TableCell align="center">{row.mechanic}</TableCell>
                            <TableCell align="center">{row.date.slice(0,10)}</TableCell>
                            <TableCell align="center">
                                                  <Select
                              
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
                              <option value=" ">{row.mechanic}</option>
                              {option_list.map(result=>{
                                  if(result.name != row.mechanic){
                                    return (
                                        <option value={result.name}>{result.name}</option>
                                     )
                                    }
                              })}
                              

                             </Select>

                            </TableCell>
                            
                            
                            <TableCell align="right">
                            <TextField                                                                               
                              id="outlined-password-input"
                              type="date"                              
                              placeholder={row.date}
                              variant="outlined"
                              onChange={(e)=>setdate(e.target.value)}
                              fullWidth
                              />
                            </TableCell>
                            <TableCell align="right">
                              <Button variant="contained" color="primary" onClick={()=>loginHandler(row._id,row.date)}>
                                Submit
                              </Button>
                            </TableCell>
                            
                          </TableRow>
                        ))}
                      </TableBody>
                   </Table>
             </TableContainer>   
            
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

export default Register;