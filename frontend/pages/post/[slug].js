import {useState, useEffect} from 'react'
import { withRouter } from 'next/router'
import { Fragment } from 'react'
import Layout from '../../components/Layout'
import { getSinglePost, getRecomendations } from "../../actions/posts"
import { BACKEND, DOMAIN, PROTOCOL } from '../../config'
import renderHTML from 'react-render-html';
import moment from 'moment'
import Sidebar from "../../components/Sidebar"
import { isAuth } from '../../actions/auth'
import { addBookmark, removeBookmark } from '../../actions/user'
import Link from 'next/link'
import Router from 'next/router'
import BannerImg from '../../components/Post/BannerImg'


import RecomendPost from '../../components/Post/RecomendPost'
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from "react-share";

const singlePost = ({ post, recomendPosts, router }) => {

   const [mark, setMark] = useState(false);
   const [ url, setUrl ] = useState(`${PROTOCOL}://${DOMAIN}/post/${post.slug}`)

  useEffect(() => {
    if (isAuth()) {
      console.log("is auth is passed");
      if (  isAuth().posts.indexOf(post._id) >= 0) {
        console.log("Check is passed");
        setMark(true)
      }
    } else {
      setMark(false)
    }
  }, [])

  const manageBookmark = () => {
   if (isAuth()) {
     let index = isAuth().posts.indexOf(post._id);
     if (index >= 0) {
       
       removeBookmark(post._id).then(data => {
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
       addBookmark(post._id).then(data => {
         if (data.error) {
           console.log("error occured");
         }
         else {
           let user = isAuth();
            user.posts.push(post._id)
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

  const LoadRecomendPost = () => {
    if (recomendPosts.length > 0) {
      return (
        <div>
          {
            recomendPosts.map((value, index) => (
              <div key={value.title} className="latest__post__card">
            <div className="latest__post__image">
              <img src={`${BACKEND}uploads/${value.image}`} />
            </div>
            <div>
              <div className="latest__post__heading__container">
                <h3 className="latest__post__heading">{value.title}</h3>
              </div>
              <Link href={`/post/${value.slug}`}  key={value.title}>
                <a className="post__read__btn latest__post__readmore">
                  Read More <i className="fas fa-chevron-right post__read__btn__arrow"></i>
                </a>
              </Link>
            </div>
          </div>
            ))
          }
        </div>
      )
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
        {post.hashtag.map((value, index) => <h4 key={index} className="post__detail__hashtag">#{value.name}</h4>)}
      </div>
      
    )
  }

  const loadBannerImg = () => {
    if (post.sidead !== undefined) {
      return (
        <BannerImg sidead={post.sidead} />
      )
    }
  }

  return (
    <Fragment>
    <Layout>
    <div className="entire__container__block">
      <Sidebar/>
      <div className="post__container">
        <main>
        <article>
          <section className="post__content">
          <h1 className="post__title">{post.title}</h1>
          <p>By <span className="post__intro__heading">YourCoimbatore</span> on {moment(post.createdAt).format("Do MMM YYYY")}</p>
          <div className="post__sub__heading" >

           {bookmark()}
             <FacebookShareButton  children={<i className="fab fa-facebook facebook__share"></i>} url={url} />
            
            <WhatsappShareButton children={<i className="fab fa-whatsapp whatsapp__share"></i>} url={url} />
            <TwitterShareButton  children={<i className="fab fa-twitter twitter__share"></i>} url={url} />
          <h3 className="post__detail__category">{post.category[0].name}</h3>
        </div>
    
            <img className="post__view__image" src={`${BACKEND}uploads/${post.image}`} />

            {hashtags()}
          <div className="post__content" >{renderHTML(post.content)}</div>
          {loadBannerImg()}
          </section>
        </article>
      </main>
        <div className="post__detail__latest__post">
          <h3 className="latest__post__heading">Latest Post</h3>
          {LoadRecomendPost()}

        </div>
      </div>
    </div>
      
      
    </Layout>
  </Fragment>
  )
}

singlePost.getInitialProps = ({ query }) => {
 return getSinglePost(query.slug).then( data => {
  if (data.error) {
   console.log(data.error)
  } else {
    return { 
          post : data.post[0] ,
          recomendPosts: data.recomendPosts
        }
  
  }
 })
}

export default withRouter(singlePost);