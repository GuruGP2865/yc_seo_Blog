import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import Router from 'next/router'
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { editValue, createValue, deleteValue } from '../../../actions/admin/categoryhashtag'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: '5px 2px',
    padding: '5px',
  },
  card: {
    display: "flex" ,
    alignItems: "center",
    
  },
  serial: {
    margin: "5px 5px",
    fontSize: 14
  },
  title: {
    padding: "5px"
  },
  options: {
    marginLeft: 'auto',
    maxWidth: '10vw'
  },
  paper: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    width: '30vw',
    minWidth: '300px',
    backgroundColor: '#fff',
    outline: 'none',
    boxShadow: '5px',
    padding: '10px',
    "& > *": {
      padding: '10px 5px',
      justifyContent: 'center'
    }
  },
  addIcon: {
        margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
  yesButton: {
    backgroundColor: '#00b54f',
    '&:hover': {
      backgroundColor: '#00a04e'
    }
  },
  noButton: {
    backgroundColor: '#e62d01',
    '&:hover': {
      backgroundColor: '#d30301'
    }
  }
});

export default function CHCard({ type, serial, id, name}) {
  const classes = useStyles();
  const [ modalStyle ] = React.useState(getModalStyle);
  const [ newValue, setNewValue ] = useState('');
  const [ open, setOpen ] = useState(false);
  const [ createOpen, setCreateOpen ] = useState(false)
  const [ create, setCreate ] = useState('');
  const [ del, setDel ] = useState(false);

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCreateOpen = () => {
    setCreateOpen(true)
  }


  const handleCreateClose = () => {
    setCreateOpen(false)
  }

  const handleDelOpen = () => {
    setDel(true)
  }

  const handleDelClose = () => {
    setDel(false);
  }

  const editSingleValue = () => {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Edit: </h2>
          <h2 id="simple-modal-description">hashtag : {name}</h2>
          <TextField value={newValue} onChange={(e) => setNewValue(e.target.value)} id="outlined-basic" label={`${type}`} variant="outlined" />
          <Button onClick={
            () => {
              if (newValue != '') {
                return editValue(type, id, newValue).then(data => {
                  if ( data.error) {
                     toast.error("Value not changed");
                  }
                  else {
                     toast.success("Value changed");
                     Router.reload(window.location.pathname);
                  }
                })
              } else {
                toast.error("Value cannot be empty")
              }
            }
          } variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </Modal>
    )
  }

  const handleCreate = () => {
    return (
      <Modal
        open={createOpen}
        onClose={handleCreateClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Create: </h2>
          <TextField value={create} onChange={(e) => setCreate(e.target.value)} id="outlined-basic" label={`${type}`} variant="outlined" />
          <Button onClick={
            () => {
              if (create != '') {
                return createValue(type, create).then(data => {
                  if ( data.error) {
                     toast.error("Value not added");
                  }
                  else {
                     toast.success("Value added");
                     Router.reload(window.location.pathname);
                  }
                })
              } else {
                toast.error("Value cannot be empty")
              }
            }
          } variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </Modal>
    )
  }


  const handleDelete = () => {
     return (
      <Modal
        open={del}
        onClose={handleDelClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Delete {name} ?</h2>
          
          <div className='delete__flex'>
            <Button className={classes.yesButton} onClick={
            () => {
              return deleteValue(type, id).then(data => {
                if ( data.error) {
                  toast.error("Value not deleted");
                }
                else {
                  toast.success("Value deleted");
                  Router.reload(window.location.pathname);
                }
              })
            }} variant="contained" color="primary">
              yes
            </Button>
            <Button className={classes.noButton} onClick={
            () => {
              return handleDelClose(); 
            }
          } variant="contained" color="primary">
            No
          </Button>
          </div>
          
          
        </div>
      </Modal>
    )
  }

  return (
    <React.Fragment>
      <ToastContainer />
      <Fab color="primary" aria-label="add" className={classes.addIcon}>
        <IconButton aria-label="View" onClick={handleCreateOpen}>
          <AddIcon />
        </IconButton>
      </Fab>
      {editSingleValue()}
      {handleCreate()}
      {handleDelete()}
      
      <Card className={classes.root}>
      <CardContent className={classes.card}>
        <Typography className={classes.serial} color="textSecondary">
          {serial}
        </Typography>
        <Typography className={classes.title} variant="h5" component="h2">
          {name}
        </Typography>
        <Typography className={classes.options} color="textSecondary">

          <IconButton aria-label="View" type='button' onClick={handleOpen}>
            <EditIcon />
          </IconButton>

          <IconButton aria-label="View" onClick={handleDelOpen}>
            <DeleteForeverIcon />
          </IconButton>
          
        </Typography>
      </CardContent>
    </Card>
  
    </React.Fragment>
    
  );
}
