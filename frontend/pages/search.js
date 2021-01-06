import { useState, useEffect, Fragment } from 'react';
import Layout from '../components/Layout';
import SearchContainer from '../components/search/SearchContainer';
import Sidebar from '../components/Sidebar';


const Search = () => {
 return (
  <Fragment>
    <Layout>
    <div className="entire__container__block">
        <Sidebar page="home" />
      <div className="post__container">
      <SearchContainer />
      </div>
    </div>  
  </Layout>
  </Fragment>
 )
}

export default Search