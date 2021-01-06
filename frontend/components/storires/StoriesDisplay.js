import React from 'react'
import { useState, useEffect } from 'react'
import { GetStoryImages } from '../../actions/stories';
import { BACKEND } from '../../config';
import InfiniteScroll from "react-infinite-scroll-component";
import { makeStyles } from "@material-ui/core/styles";
import Modal from '@material-ui/core/Modal';
import { useRouter } from 'next/router'
function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}

const useStyles = makeStyles({
  paper: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    width: '30vw',
    minWidth: '300px',
    backgroundColor: '#fff',
    outline: 'none',
    boxShadow: '5px',
    padding: '10px',
    "& > *": {
      padding: '10px 5px',
      justifyContent: 'center'
    }
  }
});




const StoriesDisplay = ({ loader }) => {


  const router = useRouter();
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
 const [ limit, setLimit ] = useState(12);
 const [ skip, setSkip ] = useState(-12);
 const [ storyImages, setStoryImages ] = useState([]);
 const [ loading, setLoading ] = useState("Loading...")
 const [ open, setOpen ] = useState(false)

 const [ popupImage, setPopupImage ] = useState("");
 const [ popupSlug, setPopupSlug ] = useState("");
 const [ popupContent, setPopupContent ] = useState("");

  useEffect(() => {
    loadMore();
  }, [])

  const loadMore = () => {
    GetStoryImages(limit, skip + 12).then( data => {
      if (data.error) {
        console.log(data.error);
      } else {
        //console.log(data.storyImages)
        if (data.storyImages.length == 0) {
          setLoading('');
        }
        setStoryImages([...storyImages, ...data.storyImages])
        setSkip(skip + 12);
      }
    })
   
  }

  const viewStory = () => {
    return (
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <img src={`${BACKEND}uploads/${popupImage}`} />
          <p>{popupContent}</p>
          <button className="stories__readmore" onClick={() => {
            loader()
            return router.push(`/post/${popupSlug}`)
          } }>Read More</button>

        </div>
      </Modal>
    )
  }

   const showLoadedPosts = () => {
      if (storyImages.length > 0) {
        return storyImages.map((images, i) => (
          <button onClick={() => {
            
            setPopupImage(images.storySmallImage);
            setPopupSlug(images.slug);
            setPopupContent(images.storySmallContent);
            setOpen(true);
          }} className="story__small__button w-full block rounded-b" key={i}>
          
            <div className="story__inner__container">
              <img className="story__small__image" src={`${BACKEND}uploads/${images.storySmallImage}`} />
            <div className="story__small__content">{images.storySmallContent}</div>
            </div>
          </button>
        ))
      }
    }

 return( 
  <div>
  {viewStory()}
    <h2>Latest News</h2>
    <InfiniteScroll
     className="story__grid max-w-4xl mx-auto p-2"
          dataLength={storyImages.length}
          next={loadMore}
          hasMore={true}
          loader={
            <h2>{loading}</h2>
          }
        >
          {showLoadedPosts()}
      
          
        </InfiniteScroll>
  </div>
 )
}

export default StoriesDisplay;