import { useState, useEffect } from 'react'
import { SearchBlog } from '../../actions/posts';
import Card from '../Post/Card';
import InfiniteScroll from "react-infinite-scroll-component";

const SearchContainer = () => {

 const [ search, setSearch ] = useState('');
 const [ limit, setLimit ] = useState(10);
 const [ skip, setSkip ] = useState(-10)
 const [ posts, setPosts ] = useState([]);
 const [ loading, setLoading ] = useState("");

 useEffect(() => {
  handleSearch();
 }, [search])

 const handleSearch = () => {
  if (search !== null && search !== '') {
     SearchBlog(limit, skip+10, search).then( data => {
      if (data.error) {
       console.log(data.error)
      } else {
       setPosts(data.posts)
       console.log(data.posts)
      }
     })
  }
 }

 const loadMore = () => {
  if (search !== null && posts.length > 10) {
     setLoading("Loading...")
     SearchBlog(limit, skip + 10, search).then( data => {
      if (data.error) {
       console.log(data.error)
      } else {
       setSkip(skip + 10)
       setPosts([...posts, ...data.posts])
       if (data.posts.length === 0) {
         setLoading('')
       }
      }
     })
  }
 }

 const handleChange = (value) => {
   setSearch(value);
   setSkip(-10)
 }

 const showPosts = () => {
  if (posts.length > 0) {
        return posts.map((post, i) => (
          <article key={i}>
            <Card postDetail={post} />
          </article>
        ))
      }
 }

 return (
  <div>
  <div className="search__container">
    <input value={search} onChange={ e => handleChange(e.target.value)} type="text" placeholder="Search" required />
    <button className="search__button" ><i className="fas fa-search"></i></button>
  </div>
  
  
  <InfiniteScroll
          dataLength={posts.length}
          next={loadMore}
          hasMore={true}
          loader={
            <h2>{loading}</h2>
          }
        >
          {showPosts()}
   </InfiniteScroll>
  </div>
  
 )
}

export default SearchContainer;