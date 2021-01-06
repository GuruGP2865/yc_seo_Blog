import { Fragment, useEffect } from 'react'
import Admin from '../../components/Admin/Admin'
import NavBar from '../../components/Admin/Appbar/NavBar'
import AdminCard from '../../components/Admin/Post/AdminCard'

const AdminPanel = () => {
 
 return (
  <Fragment>
  <Admin>
    <NavBar />
    <AdminCard />
  </Admin>
    
  </Fragment>
 )
}

/*
AdminPanel.getInitialProps = ( { query } ) => {
  console.log(query)
  return {
    adminCheck : true
  }
};
*/

export default AdminPanel;