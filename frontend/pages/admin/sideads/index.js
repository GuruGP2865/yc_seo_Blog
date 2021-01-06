import React from 'react'
import { Fragment, useEffect, useState } from 'react'
import { getAllSideads } from '../../../actions/admin/sidead';
import NavBar from '../../../components/Admin/Appbar/NavBar'
import AdCard from "../../../components/Admin/MainadSidead/AdCard"
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from "@material-ui/core/styles";
import Modal from '@material-ui/core/Modal';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { createSidead } from "../../../actions/admin/sidead";
import Admin from '../../../components/Admin/Admin'

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles(themes => ({
  addIcon: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
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
}))

const Sideads = () => {

  
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [ open, setOpen ] = useState(false);
  const [ name, setName ] = useState('');
  const [ link, setLink ] = useState('');
  const [ file, setFile ] = useState(null);

 const [ sideads, setSideads] = useState([]);

  useEffect(() => {
    loadSideads()
  }, [])

  const loadSideads = () => {
    getAllSideads().then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        //console.log(data)
        setSideads(data)
      }
    })
  }

  const createNewSidead = () => {
    if (name === '') {
      toast.error("Name is empty")
   } else if (link === '') {
    toast.error("link is empty")
   } else if (file === null) {
     toast.error("file is empty")
   } else {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("link", link);
    formData.append("file", file);
    createSidead(formData).then( data => {
      if (data.error) {
        toast.error("Sidead creation failed")
      } else {
        toast.success("Sidead Created Successfully")
        setOpen(false)
        loadSideads();
      }
    })
   }
  }

  const LoadCreateSideAd = () => {
    return (
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2>Create</h2>
          <TextField value={name} onChange={e => setName(e.target.value)} id="standard-basic" label="Name" />
          <TextField value={link} onChange={e => setLink(e.target.value)} id="standard-basic" label="Link" />
          <input type="file" name="image" onChange={e => {
            return (
              setFile(e.target.files[0])
            )
          }} />

          <div className={classes.editButton}>
          <Button className={classes.saveButton} variant="contained" onClick={createNewSidead} >
              save
            </Button>
            <Button className={classes.cancelButton} variant="contained" onClick={() => setOpen(false)} >
              cancel
            </Button>
          </div>
        </div>
      </Modal>
    )
  }

  const listSideads = () => {
    if (sideads.length > 0) {
      return sideads.map(( value, index ) => {
        return (
          <article key={index}>
            <AdCard refreshMethod={loadSideads} key={index+1} serial={index+1} id={value._id} name={value.name} link={value.link} image={value.image}/>
          </article>
        )
      }
      )
    }
  }



 return (
  <Fragment>
  <Admin>
    <NavBar />
    <ToastContainer />
      {LoadCreateSideAd()}
      <div className="category__container">

        <Fab color="primary" aria-label="add" className={classes.addIcon}>
          <IconButton aria-label="View" onClick={() => setOpen(true)}>
            <AddIcon />
          </IconButton>
        </Fab>
        {listSideads()}
      </div>
    </Admin> 
  </Fragment>
 )
}

export default Sideads