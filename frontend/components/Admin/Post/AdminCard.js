import React , {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import Router from 'next/router'
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { BACKEND } from "../../../config"
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { deletePost } from "../../../actions/admin/posts";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from "react-toastify";


function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles({
  root: {
    width: '98%',
    height: "180px",
    margin: "10px 5px",
    display: "flex",
    '@media (max-width: 850px)' : {
      width: "98%",
      margin: '5px'
    }
  },
  card: {
    width: "60vw",
    height: "100%",
    '@media (max-width: 850px)' : {
     width: "50vw"
    }
  },
  serial: {
    margin: "5px 5px",
    fontSize: 14
  },
  title: {
    padding: "5px"
  },
  options: {
    width: "10vw",
    justifyContent: "center !important",
    '@media (max-width: 850px)' : {
     width: "20vw"
    }
  },
  image: {
   height: 'auto',
   maxHeight: '180px',
   width: "30vw",
   margin: "2px",
   '@media (max-width: 850px)' : {
     margin: "5px 2px",
     width: '30vw',
     height: "90%"
    }
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

export default function AdminCard({ viewPost, image, serial, id, heading, date}) {
  const classes = useStyles();
  const [ del, setDel ] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);

    const handleDelete = () => {
     return (
      <Modal
        open={del}
        onClose={() => setDel(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Delete {heading} ?</h2>
          
          <div className='delete__flex'>
            <Button className={classes.yesButton} onClick={
            () => {
              return deletePost(id).then(data => {
                if ( data.error) {
                  toast.error("Post not deleted");
                }
                else {
                  toast.success("Post deleted");
                  Router.reload(window.location.pathname);
                }
              })
            }} variant="contained" color="primary">
              yes
            </Button>
            <Button className={classes.noButton} onClick={
            () => setDel(false)
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
    <ToastContainer/>
    {handleDelete()}
     <Card className={classes.root}>
      <CardActionArea className={classes.image}>
      <CardMedia
          component="img"
          alt={heading}
          image={`${BACKEND}uploads/${image}`}
          title={heading}
          className={classes.image}
        />
    </CardActionArea>
      <CardContent className={classes.card}>
        <Typography className={classes.serial} color="textSecondary">
          {serial}
        </Typography>
        <Typography className={classes.title} variant="h5" component="h2">
          {heading}
        </Typography>
        
      </CardContent>
      <Typography className={classes.options} color="textSecondary">
          <IconButton aria-label="View" onClick={() => viewPost(id)}>
            <VisibilityIcon />
          </IconButton>

          <IconButton aria-label="View" onClick={() => Router.push(`/admin/posts/edit/${id}`)}>
            <EditIcon />
          </IconButton>

          <IconButton aria-label="View" onClick={() => setDel(true)}>
            <DeleteForeverIcon />
          </IconButton>
          
        </Typography>
    </Card>
  
    </React.Fragment>
    
  );
}
