import { Fragment, useState, useEffect, useMemo, useRef } from 'react'
import { Router, useRouter, withRouter } from "next/router"
import { getStories } from "../../actions/stories"
import Sidebar from '../../components/Sidebar'
import Layout from '../../components/Layout'
import dynamic from "next/dynamic";
import moment from 'moment'


import { BACKEND } from '../../config'
import { AccordionActions } from '@material-ui/core'
const DynamicStoryWithNoSSR = dynamic(() => import("react-insta-stories"), {
  ssr: false,
});

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

const storyDetailPage = ({ category, router }, slug) => {

    const classes = useStyles();
  const [ duration, setDuration ] = useState(5000)
  const [ stories, setStories ] = useState([]);
  const [ screenWidth, setScreenWidth ] = useState(450);
  const widthElement = useRef(null)
  const [ screenHeight, setScreenHeight ] = useState(300);
  
    const [ linear , setLinear ] = useState(false);

    
    const LinearLoad = () => {
      if (linear === true) {
        return(
          <LinearProgress />
        )
      }
    }

    const setLinearLoader = () => setLinear(true);

  const customCollapsedComponent = ({ toggleMore, action }) =>
    <h2 className="seee__more__heading" onClick={() => {
        action('pause');
        //window.open('https://mywebsite.url', '_blank');
        router.push(`/`)
    }}>
      <i className="fa fa-eye eye__icon" aria-hidden="true"></i>  View More
    </h2>

  useEffect(() => {
    setScreenWidth(widthElement.current.offsetWidth)
    setScreenHeight(window.innerHeight - 150);
    

     /*
     if ( storiesData.length === 0) {
    router.push("/stories")
   } 
   */
   //setStories(stories.forEach((value) => value.header.subheading = moment(value.header.subheading).format("Do MMM YYYY")))

   if (window.innerWidth > 850) {
     setScreenWidth(widthElement.current.offsetWidth - Math.round(widthElement.current.offsetWidth / 4) )
   }

   getStories(category).then(data => {
  if (data.error) {
   console.log(data.error)
  } else {
   console.log(data.stories)
   //console.log(typeof data.stories)
   let duration = 5000;
   let storiesData = []
   data.stories.forEach((value, index) => (
     
    storiesData.push({
     url: `http://localhost:5000/uploads/${value.storyContentImage}`,
     duration: duration,
     header: {
            heading: 'Your Coimbatore',
            subheading: moment(value.createdAt).format("Do MMM YYYY"),
            profileImage: 'http://localhost:3000/static/images/ycsmallogo.png',
        },
     slug: value.slug,
     seeMore: ({ close }) => {
            return <div onClick={close}>View</div>;
        },
     seeMoreCollapsed:  ({ toggleMore, action }) =>
     <div className="story__detail__container">
     <p>{value.storyContent}</p>
       <div className="see__more__component">
       <button className="seee__more__heading" onClick={() => {
        action('pause');
        setLinear(true)
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
   );

   setStories(storiesData)
   }})
   
    
  }, [])




  const storiesBlock = () => {
   if ( stories.length > 0) {
    return (
     <div className="story__container">
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
  {LinearLoad()}
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
return {
 category: query.category
}
}


export default withRouter(storyDetailPage)


 //console.log(query.category)
/*
 return getStories(query.category).then( data => {
  if (data.error) {
   console.log(data.error)
  } else {
   //console.log(data.stories)
   //console.log(typeof data.stories)
   let duration = 5000;
   let storiesData = []
   data.stories.forEach((value, index) => (
    storiesData.push({
     url: `http://localhost:5000/uploads/${value.image}`,
     duration: duration,
     header: {
            heading: 'Your Coimbatore',
            subheading: value.createdAt,
            profileImage: 'https://picsum.photos/100/100',
        },
        
    })
   ));
   
   //console.log(storiesData)
   return {
    storiesData : storiesData,
    category: query.category
   }
  }
 })
 */