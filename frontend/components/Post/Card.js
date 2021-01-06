import { BACKEND, DOMAIN, PROTOCOL } from "../../config";
import moment from 'moment'
import Link from 'next/link'
import Router from 'next/router'
import { useState, useEffect } from "react";
import { isAuth, setLocalStorage } from "../../actions/auth"
import { addBookmark, removeBookmark } from "../../actions/user";
import { useRouter } from 'next/router'

import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";

const Card = ({ postDetail, loader }) => {

  const [mark, setMark] = useState(false);
  
   const [ url, setUrl ] = useState(`${PROTOCOL}://${DOMAIN}/post/${postDetail.slug}`)
  const router = useRouter()

  useEffect(() => {
    if (isAuth()) {
      console.log("is auth is passed");
      if (  isAuth().posts.indexOf(postDetail._id) >= 0) {
        console.log("Check is passed");
        setMark(true)
      }
      
    } else {
      setMark(false)
    }
  }, [])

  const manageBookmark = () => {
   if (isAuth()) {
     let index = isAuth().posts.indexOf(postDetail._id);
     if (index >= 0) {
       
       removeBookmark(postDetail._id).then(data => {
         if (data.error) {
           console.log("error occured");
         }
         else {
           let user = isAuth();  
           user.posts.splice(index, 1)
           setLocalStorage("user", user);
           setMark(false);
           console.log("Removed successfully")
         }
       })
     } else {
       addBookmark(postDetail._id).then(data => {
         if (data.error) {
           console.log("error occured");
         }
         else {
           let user = isAuth();
            user.posts.push(postDetail._id)
           setLocalStorage("user", user);
           setMark(true);
           console.log("added successfully")
         }
       })
     }
     
    } else {
      Router.push(`/signin`);
    }
  }

  const bookmark = () => {
    return mark === true ? 
        (<button onClick={() => manageBookmark()} className="post__bookmark__btn">
            <i className="fa fa-bookmark"></i>
          </button>) :
        (<button onClick={() => manageBookmark()} className="post__bookmark__btn">
            <i className="far fa-bookmark"></i>
          </button>)
  }

  const hashtags = () => {
    return (
      <div className="post__detail__hashtag__container">
        {postDetail.hashtag.map((value, index) => <h4 key={index} className="post__detail__hashtag">#{value.name}</h4>)}
      </div>
      
    )
  }
  
  return (
    
   <div className="post__box">

   <img
        className="post__image"
        src={`${BACKEND}uploads/${postDetail.image}`}
        alt=""
      /> 
      

      <h2 className="post__heading">
        {postDetail.title}
      </h2>
      <p className="post__time">By <span className="post__intro__heading">YourCoimbatore</span> on {moment(postDetail.createdAt).format("Do MMM YYYY")}</p>
      {hashtags()}
      <p className="post__small__content">{postDetail.intro_content} {'' + postDetail.mark}</p>
      <div className="post__bottom__container">
        <div>
  
        {bookmark()}
         
        <FacebookShareButton  children={<i className="fab fa-facebook facebook__share"></i>} url={url} />
            
            <WhatsappShareButton children={<i className="fab fa-whatsapp whatsapp__share"></i>} url={url} />
            <TwitterShareButton  children={<i className="fab fa-twitter twitter__share"></i>} url={url} />

         
        </div>

        <Link href={`/post/${postDetail.slug}`} key={postDetail._id} onClick={() => loader()} >
        <a  className="post__read__btn">
          Read more
          <i className="fas fa-chevron-right post__read__btn__arrow"></i>
        </a>
          
          
        </Link>
      </div>
    </div>
  );
};

export default Card;
