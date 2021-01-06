import { Fragment, useEffect, useState } from 'react'
import { isAuth } from '../actions/auth';
import { getBookmark } from "../actions/posts"
import InfiniteScroll from "react-infinite-scroll-component";
import Sidebar from "../components/Sidebar"
import Router from 'next/router'
import Layout from "../components/Layout";
import Card from '../components/Post/Card';
import BookmarkCard from '../components/Post/BookmarkCard';


const Bookmark = () => {

 const [ bookmark, setBookmark ] = useState([]);
 const [ limit, setLimit ] = useState(10);
 const [ skip, setSkip ] = useState(0);

  useEffect(() => {
    if (isAuth()) {
      getBookmark(limit, skip).then(data => {
       if (data.error) {
        console.log(data.error)
       } else {
        setSkip(limit + skip)
        setBookmark([...bookmark, ...data]);
       }
      })
    }
  }, [])

     const loadMore = () => {
      
      if (isAuth()) {
      getBookmark(limit, skip).then(data => {
       if (data.error) {
        console.log(data.error)
       } else {
        setSkip(limit + skip)
        setBookmark([...bookmark, ...data]);
       }
      })
    }
    }


    const showLoadedPosts = () => {
      if (bookmark.length > 0) {
        return bookmark.map((post, i) => (
          <article key={i}>
            <BookmarkCard postDetail={post} />
          </article>
        ))
      }
    }

 return <Fragment>
   <Layout>
     <div className="entire__container__block">
      
        <Sidebar page="bookmark" />
        <div className="post__container">
          {
           isAuth() ? 
           (<InfiniteScroll
          dataLength={bookmark.length}
          next={loadMore}
          hasMore={true}
          loader={
            <h2>loading...</h2>
          }
        >
          {showLoadedPosts()}
        </InfiniteScroll>) :
        (
         <div className="">
        <h1 className="mt-8 text-2xl xl:text-2xl font-extrabold">
              Want to bookmark posts?
            </h1>
          <button onClick={() => Router.push('/signin')} type="button" className="mt-8 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Signup / Signin
          </button>
        </div>
        )
          }
        
        </div>
       

     </div>
   </Layout>
 </Fragment>
}

export default Bookmark;