import { useState, useEffect, Fragment } from 'react';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';


const Search = () => {
 return (
  <Fragment>
    <Layout>
    <div className="entire__container__block">
        <Sidebar page="podcasts" />
      <div className="post__container">
        <div className="comming__soon__container">
          <h2 className="comming__soon__text">
            Coming Soon...
          </h2>
        </div>
      </div>
    </div>  
  </Layout>
  </Fragment>
 )
}

export default Search