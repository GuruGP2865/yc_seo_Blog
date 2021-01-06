import React, { useState } from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core";
import { BACKEND } from '../../../config'
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'; 
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { editSidead, deleteSidead } from "../../../actions/admin/sidead";

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles({
  card: {
    width: '98%',
    height: "180px",
    margin: "10px 5px",
    display: "flex",
    '@media (max-width: 850px)' : {
      width: "98%",
      margin: '5px'
    }
  },
  image: {
   height: 'auto',
   width: "30vw",
   margin: "2px",
   '@media (max-width: 850px)' : {
     margin: "5px 2px",
     width: '30vw',
     height: "90%"
    }
  },
  actionsArea: {
    width: "10vw",
    justifyContent: "center !important",
    '@media (max-width: 850px)' : {
     width: "20vw"
    }
  },
   content: {
    width: "60vw",
    height: "100%",
    '@media (max-width: 850px)' : {
     width: "50vw"
    }
   },
   heading: {
    fontSize: "1.7rem",
    margin: "2px 10px",
    '@media (max-width: 850px)' : {
      fontSize: "1rem",
      margin: "2px"
    }
   },
   linkButton : {
    margin: "2px"
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
  editButton: {
    display: "flex",
    justifyContent: "space-around"
  }, 
  saveButton: {
    backgroundColor: '#00b54f',
    '&:hover': {
      backgroundColor: '#00a04e'
    }
  },
  cancelButton: {
    backgroundColor: '#e62d01',
    '&:hover': {
      backgroundColor: '#d30301'
    }
  }
});

export default function AdCard({ refreshMethod, serial, id, name, link, image }) {

 const classes = useStyles();
 const [modalStyle] = React.useState(getModalStyle);


 const [ newName, setNewName ] = useState(name);
 const [ newLink, setNewLink ] = useState(link)
 const [ newId, setNewId ] = useState(id)
 const [ newFile, setNewFile ] = useState(null)
 const [ newFileName, setNewFileName ] = useState(image)


 const [ edit, setEdit ] = useState(false);
 const [ del, setDel ] = useState(false);



 const saveAdChanges = () => {
   if (newName === '') {
      toast.error("Name is empty")
   } else if (newLink === '') {
    toast.error("link is empty")
   } else {
    const formData = new FormData();
    formData.append("name", newName);
    formData.append("link", newLink);
    formData.append("file", newFile);
    editSidead(newId, formData).then( data => {
      if (data.error) {
        toast.error("Sidead edit failed")
      } else {
        toast.success("Sidead Editted Successfully")
        setEdit(false)
        refreshMethod();
      }
    })
   }
 }

 const deleteSelectedAd= () => {
    deleteSidead(id).then( data => {
      if (data.error) {
        toast.error("Deletion failed")
      } else {
        toast.success("Deleted Successfully")
        refreshMethod()
        setDel(false)
      }
    })
 }

 
  const editAd = () => {
    return (
      <Modal
        open={edit}
        onClose={() => setEdit(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2>Edit:</h2>
          <TextField id="standard-basic" label="Name" value={newName} onChange={e => setNewName(e.target.value)} />
          <TextField id="standard-basic" label="Link" value={newLink} onChange={e => setNewLink(e.target.value)} />
          <h2>image : {newFileName}</h2>
          <input type="file" name="image" onChange={e => {
            setNewFileName(e.target.files[0].fileName);
            return (

              setNewFile(e.target.files[0])
              
            )
          }} />

          <div className={classes.editButton}>
          <Button className={classes.saveButton} variant="contained" onClick={saveAdChanges} >
              save
            </Button>
            <Button className={classes.cancelButton} variant="contained" onClick={() => setEdit(false)} >
              cancel
            </Button>
          </div>
        </div>
      </Modal>
    )
  }

  const deleteAd = () => {
    return (
      
      <Modal
        open={del}
        onClose={() => setDel(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Delete {name} ?</h2>
          
          <div className={classes.editButton} >
            <Button className={classes.saveButton} onClick={deleteSelectedAd} variant="contained" color="primary">
              yes
            </Button>
            <Button className={classes.cancelButton} onClick={() => setDel(false)} variant="contained" color="primary">
            No
          </Button>
          </div>
          
          
        </div>
      </Modal>
    )
  }



 return (
  <React.Fragment>
  {editAd()}
  {deleteAd()}
  <ToastContainer />
    <Card className={classes.card}>
    <CardActionArea className={classes.image}>
      <CardMedia
          component="img"
          alt={name}
          image={`${BACKEND}uploads/${image}`}
          title={name}
          className={classes.image}
        />
    </CardActionArea>

    <CardActionArea className={classes.content}>
      <Typography className={classes.heading} gutterBottom variant="h6" component="h3">
            {name}
      </Typography>
      <Button className={classes.linkButton} variant="contained" target="_blank" href={link}>Open Link</Button>
      
    </CardActionArea>

    <CardActions className={classes.actionsArea}>
        <Typography className={classes.options} color="textSecondary">

          <IconButton aria-label="View" type='button' onClick={() => setEdit(true)}>
            <EditIcon />
          </IconButton>

          <IconButton aria-label="View" onClick={() => setDel(true)}>
            <DeleteForeverIcon />
          </IconButton>
          
        </Typography>
      </CardActions>
  </Card>
  </React.Fragment>
 )
}