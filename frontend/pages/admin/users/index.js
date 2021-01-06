import React from 'react'
import { useState, useEffect, Fragment } from 'react'
import { ToastContainer } from 'react-toastify'
import { changeUserRole, getAllUsers } from '../../../actions/admin/users'
import Admin from '../../../components/Admin/Admin'
import NavBar from '../../../components/Admin/Appbar/NavBar'
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';


import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles({
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




const UsersDashboard = () => {

  const [ users, setUsers ] = useState([]);
  const classes = useStyles();
 const [ open, setOpen ] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);

 const [ id, setId ] = useState(''); 
 const [ name, setName ] = useState('');
 const [ role, setRole ] = useState('');

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = () => [
    getAllUsers().then( data => {
      if (data.error) {
        console.log(data.error)
      } else {
        setUsers(data)
        console.log(data)
      }
    })
  ]


  const setOppositeRole = ( value ) => {
    if (value === "Normal") {
      setRole("Admin")
    } else {
      setRole("Normal")

    }
  }

  const displayUserData = () => {
    if (users.length > 0) {
      return (
        users.map((user, index) => {
          return (
            <div key={index} className="user__card">
          <div className="user__content">
            <h2>{user.name}</h2>
            <h3>{user.email}</h3>
            <div className="user__type">
            <h2>
              {user.role}
            </h2>
          </div>
          </div>
          

          <div className="user__change">
            <button onClick={() => {
              setId(user._id)
              setName(user.name)
              setOppositeRole(user.role)
              return (
                 setOpen(true)
              )
            }}>
              Change
            </button>
          </div>
        </div>
          )
        })
      )
    }
  }

  const changeRole = () => {
    return (
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <p>Do you want to change  {name}'s role as {role}</p>
          <div className='delete__flex'>
            <Button className={classes.yesButton} onClick={
            () => {
              return changeUserRole(id, role).then( data => {
                if (data.error) {
                  console.log(data.error)
                } else {
                  setOpen(false)
                  loadUsers();

                }
              })
            }} variant="contained" color="primary">
              yes
            </Button>
            <Button className={classes.noButton} onClick={
            () => setOpen(false)
          } variant="contained" color="primary">
            No
          </Button>
          </div>

        </div>
      </Modal>
    )
  }



 return (
    <Fragment>
  <Admin>
    <NavBar />
    <ToastContainer />
      <div className="category__container">
      {changeRole()}

        <h2> Users</h2>

        {displayUserData()}

      </div>
    </Admin> 
  </Fragment>
 )
}

export default UsersDashboard