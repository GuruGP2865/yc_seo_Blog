import Link from "next/link"
import { useState, Fragment } from  'react'
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  linear: {
    width: '98vw',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    top: "-100px",
    left: "-5vw",
    zIndex: 2,
    '@media (max-width: 850px)' : {
     left: "0",
     top: "-59px",
    }
  },
}));


const Sidebar = (props) => {

  
    const [ linear , setLinear ] = useState(false);
    
  const classes = useStyles();

  const presentStyle = {
    backgroundColor: "#6396fc42",
    borderLeft: "5px solid #3d6eea"
  }

  const allotStyle = (value) => {
    //console.log(props)
    if (value === props.page) {
      return presentStyle;
    } else {
      return null;
    }
  }
  const LinearLoad = () => {
      if (linear === true) {
        return(
          <LinearProgress  className={classes.linear} />
        )
      }
    }

 return (
   <Fragment>
   {LinearLoad()}
    
      <nav className="side__nav__column">
      
      <ul className="side__nav__list">
        <li className="sidenav__list__item">
          <Link href="/"  >
          <a  className="list__item__button" style={allotStyle("home")} onClick={() => setLinear(true)}>Home</a>
          </Link>
        </li>
        <li className="sidenav__list__item">
          <Link href="/stories"  >
          <a className="list__item__button " style={allotStyle("stories") } onClick={() => setLinear(true)}>Stories</a>
          </Link>
        </li>
        <li className="sidenav__list__item">
          <Link href="/podcasts" >
          <a className="list__item__button " style={allotStyle("podcasts")} onClick={() => setLinear(true)}>Podcasts</a>
          </Link>
        </li>
        <li className="sidenav__list__item">
          <Link href="/bookmarks" >
          <a className="list__item__button " style={allotStyle("bookmark")} onClick={() => setLinear(true)}>Bookmarks</a>
          </Link>
        </li>
      </ul>
    </nav>
   </Fragment>
 );
};

export default Sidebar;