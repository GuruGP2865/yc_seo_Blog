import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Router from 'next/router'

const useStyles = makeStyles((theme) => ({
  addIcon: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
}));

export default function CreateIcon() {

 const classes = useStyles();

 return(
  <Fab color="primary" aria-label="add" className={classes.addIcon}>

  <IconButton aria-label="View" onClick={() => Router.push(`/admin/posts/create`)}>
              <AddIcon />
    </IconButton>

        
  </Fab>
 )
}