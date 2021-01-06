import React, {useState, useEffect} from 'react'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Fragment} from 'react';
import Link from "next/link"
import {APP_NAME} from "../config"
import {getCookie, isAuth} from "../actions/auth"

import IconButton from '@material-ui/core/IconButton'; 
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';


import LinearProgress from '@material-ui/core/LinearProgress';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  appBar: {
    display: 'flex'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  loader: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));



const Header = () => {

  const [open, setOpen] = useState(false);
  //const authValue = isAuth()._id;
  const [ token, setToken ] = useState('');
  
    const [ linear , setLinear ] = useState(false);


  useEffect(() => {
    if (typeof window !== undefined) {
      setToken(getCookie('token'))
    }
  }, [])
  
  const classes = useStyles();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const adminLinks = () => {
    if (isAuth()) {
      if (isAuth().role === 'Admin') {
        return (
          <div>
            <ListItem button key={'Admin Page'} component="a" href="/admin" onClick={() => setLinear(true)}>
              <ListItemText primary={'Admin Page'} />
            </ListItem>
            <ListItem button key={'Posts'} component="a" href="/admin/posts" onClick={() => setLinear(true)}>
              <ListItemText primary={'Posts'} />
            </ListItem>
            <ListItem button key={'Categories'} component="a" href="/admin/categories" onClick={() => setLinear(true)}>
              <ListItemText primary={'Categories'} />
            </ListItem>
            <ListItem button key={'Hashtags'} component="a" href="/admin/hashtags" onClick={() => setLinear(true)}>
              <ListItemText primary={'Hashtags'} />
            </ListItem>
            <ListItem button key={'Side ads'} component="a" href="/admin/sideads" onClick={() => setLinear(true)}>
              <ListItemText primary={'Side ads'} />
            </ListItem>
            <ListItem button key={'Podcast'} >
              <ListItemText primary={'Podcast'} />
            </ListItem>
            <ListItem button key={'Users'} component="a" href="/admin/users" onClick={() => setLinear(true)}>
              <ListItemText primary={'Users'} />
            </ListItem>
          </div>


        )
      }
    }
  }


  const LinearLoad = () => {
      if (linear === true) {
        return(
          <LinearProgress />
        )
      }
    }

 return(
  <Fragment>
  {LinearLoad()}
    <nav className="top__navbar">
        <div>

        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer('left', true)}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <button className="topnav__menu__btn">
            <i className="fas fa-bars"></i>{" "}
            <span className="menu__explore">
                Explore
             </span>
          </button>
          </IconButton>
          
        </div>
        <div>
          <img className="top__navbar__logo" src={"/static/images/yourcoimbatore-logo.png"} alt="" />
        </div>
        <div className="search__signin">
          <Link className="topnav__search" href="/search">
            <a >
              <i className="fas fa-search"></i>
            </a>
          </Link>
          <button className="topnav__signin__btn">

            
            <span className="menu__userlogo"> 
            {
              isAuth() ? (
                <Link href="/signout">
                <a> <i className="fas fa-user"></i> <span className="login__wording"> Sign out</span></a>
              </Link>
              ) : (
                <Link href="/signup">
                <a> <i className="fas fa-user"></i> <span className="login__wording"> Sign up</span></a>
              </Link>
              )
              }
            </span>
          </button>
        </div>
      </nav>
      
      <SwipeableDrawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
        <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer('left', false)}
      onKeyDown={toggleDrawer('left', false)}
    >
       <List>
            <ListItem button key={'Home Page'} component="a" href="/" >
              <ListItemText primary={'Home Page'} />
            </ListItem>
             
            <ListItem button key={'About us'} component="a" href="/about" >
              <ListItemText primary={'About us'} />
            </ListItem>

            {adminLinks()}
          
        </List>
    </div>
      </SwipeableDrawer>
  </Fragment>
 )
}

export default Header;