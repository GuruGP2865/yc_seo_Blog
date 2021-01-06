import Head from 'next/head';
import InfiniteScroll from "react-infinite-scroll-component";
import {useState, useEffect, Fragment} from 'react'
import { withRouter } from 'next/router';
import { BlogsWithCategoriesHashtags } from "../actions/posts"
import Layout from "../components/Layout"
import Sidebar from "../components/Sidebar"
import { APP_NAME, DOMAIN, FB_APP_ID } from '../config';
import Card from "../components/Post/Card"
import { isAuth } from '../actions/auth';

import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));




const Index = ({ posts, categories, hashtags, totalPost, postLimit, postSkip, router}) => {

  const classes = useStyles();
  const [allPost, setAllPost] = useState(posts.map(value => {
        if (isAuth() && isAuth().posts.indexOf(value._id) >= 0 ) {
          value.mark = true
        } else {
          value.mark = false
        }
        //console.log(value._id);
        return value
      }));

  const [ loading, setLoading ] = useState('Loading...');

useEffect(() => {
  posts.map(value => {
        if (isAuth() && isAuth().posts.indexOf(value._id) >= 0 ) {
          value.mark = true
        } else {
          value.mark = false
        }
        //console.log(value._id);
        return value
      })
      //console.log(isAuth())
}, [])


  const head = () => (
        <Head>
            <title>Covai news | {APP_NAME}</title>
            <meta
                name="description"
                content="Know news around coimbatore"
            />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content={`Latest news | ${APP_NAME}`} />
            <meta
                property="og:description"
                content="Know news around coimbatore"
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
            
        </Head>
    );

    const [limit, setLimit] = useState(postLimit);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(totalPost);
    const [loadedPosts, setLoadedPosts] = useState([]);
    const [ linear , setLinear ] = useState(false);


    const loadMore = () => {
      let toSkip = skip + limit;
      BlogsWithCategoriesHashtags(limit, toSkip).then(data => {
        if (data.error) {
          console.log(data.error)
        } else {
          setLoadedPosts([...loadedPosts, ...data.posts])
          setSize(data.size);
          setSkip(toSkip);
          if (data.posts.length === 0) {
            setLoading("")
          }
        }
      })
    }

    const LinearLoad = () => {
      if (linear === true) {
        return(
          <LinearProgress />
        )
      }
    }

    const setLinearLoader = () => setLinear(true);


    const showLoadedPosts = () => {
      if (loadedPosts.length > 0) {
        return loadedPosts.map((post, i) => (
          <article key={i}>
            <Card postDetail={post} loader={setLinearLoader}/>
          </article>
        ))
      }
    }

    const showAllPosts = () => {
      return allPost.map((post, i) => {
        return (
          <article key={i} >
            <Card postDetail={post} />

          </article>
        )
      })
    }




 return (
  <Fragment>
    {head()}
    {LinearLoad()}
    <Layout>
    
    <div className="entire__container__block">
      
        <Sidebar page="home" />
      <div className="post__container">
        {showAllPosts()}

        <InfiniteScroll
          dataLength={loadedPosts.length}
          next={loadMore}
          hasMore={true}
          loader={
            <h2>{loading}</h2>
          }
        >
          {showLoadedPosts()}
        </InfiniteScroll>


        
      </div>
    </div>  
    
  </Layout>
  </Fragment>
 )
}

Index.getInitialProps = () => {
  
  let limit = 10;
  let skip = 0;
  return BlogsWithCategoriesHashtags(limit, skip).then(data => {
    if (data.error) {
      console.log(data.error)
    } else {
      
      return {
        posts: data.posts,
        categories: data.categories,
        hashtags: data.hashtags,
        totalPost: data.size,
        postLimit: limit,
        postSkip: skip
      }
    }
  })
}

export default withRouter(Index);