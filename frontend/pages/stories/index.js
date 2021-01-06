import { Fragment, useState, useEffect, useRef } from 'react'
import Layout from "../../components/Layout"
import Sidebar from "../../components/Sidebar"
import Head from 'next/head';
import { useRouter } from 'next/router'

import { APP_NAME, BACKEND, DOMAIN, FB_APP_ID } from '../../config';
import { getCategories } from '../../actions/categories';
import StoriesDisplay from '../../components/storires/StoriesDisplay';

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


const StoriesPage = ({ categories }) => {
 
 const router = useRouter();
 const storySlider = useRef(null);
 
  const classes = useStyles();
 
    const [ linear , setLinear ] = useState(false);

    
    const LinearLoad = () => {
      if (linear === true) {
        return(
          <LinearProgress />
        )
      }
    }

    const setLinearLoader = (value) => {
      setLinear(true)
      return (
        router.push(`/stories/${value}`)
      )
    };

 useEffect(() => {

  let isDown = false;
let startX;
let scrollLeft;
   storySlider.current.addEventListener('mousedown', (e) => {
  isDown = true;
  storySlider.current.classList.add('active');
  startX = e.pageX - storySlider.current.offsetLeft;
  scrollLeft = storySlider.current.scrollLeft;
});
   storySlider.current.addEventListener('mouseleave', () => {
  isDown = false;
  storySlider.current.classList.remove('active');
});
   storySlider.current.addEventListener('mouseup', () => {
  isDown = false;
  storySlider.current.classList.remove('active');
});
 storySlider.current.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - storySlider.current.offsetLeft;
  const walk = (x - startX) * 1.5; //scroll-fast
  storySlider.current.scrollLeft = scrollLeft - walk;
  //console.log(walk);
});


 })

 

 const head = () => (
        <Head>
            <title>Covai news | {APP_NAME} | stories</title>
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
             <script type="text/javascript" src="static/js/scrollerSlider.js"></script>
        </Head>
    );



    const setAllCategories = () => {
      return (
            categories.map((value, index) => 
    
              <div key={index} className="story__dis__card">
              <button onClick={() => setLinearLoader(value._id)} className="story__card__button">
                <div  className="story__card__innercontent" style={{background : "url(" + `${BACKEND}uploads/${value.image}` + ") center / contain no-repeat"}}  >
                  
                </div>
                <span className="story__title__content">{value.name}</span>
              </button>
                 
              </div>
           )
          
      )
    }
/**  <img src={`${BACKEND}uploads/${value.image}`} /> */
 return (
  <Fragment>
  
  {head()}
   {LinearLoad()}
    <Layout>
   
      <div className="entire__container__block">
      
        <Sidebar page="stories" />
      <div  className="post__container">
        <h2>Stories</h2>
        <div ref={storySlider} className="stories__scroll__container">
          {setAllCategories()}
        </div>
        <StoriesDisplay loader={() => setLinear(true)} />
      </div>
    </div>  
  </Layout>
  </Fragment>
 )
}

StoriesPage.getInitialProps = () => {

  return getCategories().then( data => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        categories : data
      }
      
    }
  })
}

export default StoriesPage;

/**
 
import { Fragment, useState, useEffect, useMemo, useRef } from 'react'
import { Router, useRouter, withRouter } from "next/router"
import { getStories } from "../../actions/stories"
import Sidebar from '../../components/Sidebar'
import Layout from '../../components/Layout'
import dynamic from "next/dynamic";



const DynamicStoryWithNoSSR = dynamic(() => import("react-insta-stories"), {ssr: false, });
import { WithSeeMore } from 'react-insta-stories'

const storyDetailPage = ({ category, router }, slug) => {

  const [ stories, setStories ] = useState([]);
  const [ screenWidth, setScreenWidth ] = useState(450);
  const widthElement = useRef(null)
  const [ screenHeight, setScreenHeight ] = useState(300);

  useEffect(() => {
    

   
  if (typeof window !== undefined) {
    setScreenWidth(widthElement.current.offsetWidth)
    setScreenHeight(window.innerHeight - 150);
    
   getStories(category).then(data => {
  if (data.error) {
   //console.log(data.error)
  } else {
   //console.log(data.stories)
   //console.log(typeof data.stories)
   let duration = 5000;
   let storiesData = [];
   let width = window.innerWidth;
   data.stories.forEach((value, index) => {

    let image = value.storyContentImage
    if (width > 850) {
      image = value.image
    }
    return (
      storiesData.push({
     url: `http://localhost:5000/uploads/${image}`,
     duration: duration,
     content: ({ action, story }) => (

      <WithSeeMore story={story} action={action}>
				<div style={{width: '100%'}}>
            <img style={{width: '100%'}} src={`http://localhost:5000/uploads/${image}`} />
        </div>
      </WithSeeMore>
            
        ),
        seeMore: ({ close }) => <div><h2>see more</h2><p onClick={close}>close</p></div>,
     seeMoreCollapsed:  ({ toggleMore, action }) =>
     <div>
     {value.storyContent}
       <div className="see__more__component">
       <button className="seee__more__heading" onClick={() => {
        action('pause');
        //window.open('https://mywebsite.url', '_blank');
        router.push(`/post/${value.slug}`)
    }}>
      <i className="fa fa-eye eye__icon" aria-hidden="true"></i>  View More
    </button>
     </div>
     </div>
    ,
    })
   
    )
   }
   
   );

   setStories(storiesData)
   }})
  }

    
  }, [])




  const storiesBlock = () => {
   if ( stories.length > 0 && typeof window !== 'undefined') {
    return (
     <div>
       <DynamicStoryWithNoSSR
            keyboardNavigation={true}
            stories={stories}
            defaultInterval={1500}
            width={screenWidth}
            height={screenHeight}
            onAllStoriesEnd={() => router.push('/stories')}
       />
     </div>
    )
   }
  }


 return(
  <Fragment>
    <Layout>
      <div className="entire__container__block">
      
        <Sidebar page="stories" />
      <div ref={widthElement}  className="post__container">

          {storiesBlock()}
 
      </div>
    </div>  
  </Layout>
  </Fragment>
 )
}


storyDetailPage.getInitialProps = ({ query }) => {
  let cate = query.category
 return {
 category: cate,
 }
}


export default withRouter(storyDetailPage)

 
 */