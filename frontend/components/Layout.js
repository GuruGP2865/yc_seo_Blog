import {Fragment} from 'react';
import Header from "./Header";

const Layout = ({children}) => {

 return (
  <Fragment>
    <Header/>
    {children}
    <footer className="footer__container">Your Coimbatore</footer>
  </Fragment>
 )
}

export default Layout;