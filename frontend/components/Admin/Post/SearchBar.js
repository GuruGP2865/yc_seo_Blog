import React from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
 searchBar: {
  width: '50%',
  minWidth: '300px',
  justifyContent: 'center'
 },
  root: {
   width: '100vw',
    display: 'flex',
    padding: '5rem',
    justifyContent:'center'
  },
  button: {
   margin: '0px 5px'
  }
}));


export default function SearchBar() {
 const classes = useStyles();

 return (
  <div>
    <form className={classes.root} noValidate autoComplete="off">
      <TextField className={classes.searchBar} id="outlined-basic" label="Search" variant="outlined" />
      <Button className={classes.button} variant="contained" color="primary">
      Search
     </Button> 
    </form>
  </div>
  
 )
}