import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ListIcon from '@material-ui/icons/List';
import RadioIcon from '@material-ui/icons/Radio';
import PeopleIcon from '@material-ui/icons/People';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import HomeIcon from '@material-ui/icons/Home';
import CategoryIcon from '@material-ui/icons/Category';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import NoteIcon from '@material-ui/icons/Note';


import { isAuth } from "../../../actions/auth"

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
}));

export default function NavBar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const loginOpen = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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



  

  return (
    <div className={classes.root}>
      
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer('left', true)}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Admin Page
          </Typography>
          {isAuth() && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={loginOpen}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>

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
            <ListItem button key={'Home Page'} component="a" href="/">
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary={'Home Page'} />
            </ListItem>
            <ListItem button key={'Admin Home'} component="a" href="/admin">
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary={'Admin Home'} />
            </ListItem>
            <ListItem button key={'Posts'} component="a" href="/admin/posts">
              <ListItemIcon><ListIcon /></ListItemIcon>
              <ListItemText primary={'Posts'} />
            </ListItem>
            <ListItem button key={'Categories'} component="a" href="/admin/categories">
              <ListItemIcon><CategoryIcon /></ListItemIcon>
              <ListItemText primary={'Categories'} />
            </ListItem>
            <ListItem button key={'Hashtags'} component="a" href="/admin/hashtags">
              <ListItemIcon><LocalOfferIcon /></ListItemIcon>
              <ListItemText primary={'Hashtags'} />
            </ListItem>
            <ListItem button key={'Side ads'} component="a" href="/admin/sideads">
              <ListItemIcon><NoteIcon /></ListItemIcon>
              <ListItemText primary={'Side ads'} />
            </ListItem>
            <ListItem button key={'Podcast'}>
              <ListItemIcon><RadioIcon /> </ListItemIcon>
              <ListItemText primary={'Podcast'} />
            </ListItem>
            <ListItem button key={'Users'} component="a" href="/admin/users">
              <ListItemIcon> <PeopleIcon /></ListItemIcon>
              <ListItemText primary={'Users'} />
            </ListItem>
          
        </List>
    </div>
      </SwipeableDrawer>
      
    </div>
  );
}