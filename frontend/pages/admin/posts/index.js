import React from 'react'
import { Fragment, useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { BlogsWithCategoriesHashtags } from '../../../actions/posts';
import NavBar from '../../../components/Admin/Appbar/NavBar';
import AdminCard from '../../../components/Admin/Post/AdminCard';
import CreateIcon from '../../../components/Admin/Post/CreateIcon';
import SearchBar from '../../../components/Admin/Post/SearchBar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { BlogsWithContent } from '../../../actions/admin/posts';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from "@material-ui/core/styles";
import { BACKEND } from '../../../config'
import  Admin from '../../../components/Admin/Admin' 

const useStyles = makeStyles({
  dialogRoot: {
    maxWidth: '98% !important'
  },
  image: {
   height: 'auto',
   width: "90%",
   marginRight: '0px !important', 
   '@media (max-width: 850px)' : {
     margin: "5px 2px",
     width: '90%',
    }
  },
});

const AdminPanel = () => {

  const classes = useStyles();
 const [ posts, setPosts ] = useState([]);
 const [ limit, setLimit ] = useState(10);
 const [ skip, setSkip ]   = useState(-10);
 const [ view, setView ] = useState(false);

 const [ viewValue, setViewValue ] = useState({
   title: '',
   introContent: '',
   content: '',
   image: 'uploads/1608741428585_4.jpg',
   category: '',
   sidead : '',
   hashtag: [],
 })

 const [ title, setTitle ] = useState('');
 const [ introContent, setIntroContent ] = useState('');
 const [ content, setContent ] = useState('');
 const [ image, setImage ] = useState('uploads/1608741428585_4.jpg');
 const [ category, setCategory ] = useState('');
 const [ hashtag, setHashtag ] = useState([]);
 const [ sidead, setSidead ] = useState('');

 const dialogRef = React.useRef(null)

 useEffect(() => {
   loadMore();
 }, [])

 const loadMore = () => {
  let toSkip = skip + limit;
   BlogsWithContent(limit, toSkip).then(data => {
        if (data.error) {
          console.log(data.error)
        } else {
          setPosts([...posts, ...data.posts])
          setSkip(toSkip);
        }
  })
 }

 const showLoadedPosts = () => {
   if (posts.length > 0) {
     return posts.map((post, i) => (
          <article key={i}>
            <AdminCard viewPost={viewPost} image={post.image} serial={i + 1} id={post._id} heading={post.title} date={post.createdAt} />
            
          </article>
        ))
   }
 }


 /**
  * 
  * 
  setViewValue({
        title: value.title,
        introContent: value.intro_content,
        content: value.content,
        image: value.image,
      })
      if (value.category && value.category[0].name) {
        setViewValue({
          category: value.category[0].name,
        })
      }
      if (value.sidead && value.sidead.name) {
        setViewValue({
          sidead: value.sidead.name
        })
      }
      if (value.hashtag && value.hashtag.length > 0) {
        setViewValue({
          hashtag: value.hashtag,
        })
      }
  */

 const viewPost = (id) => {
    let value = posts.find( post => post._id === id);
    console.log(value)
    if (value !== null && value !== undefined) {
      setView(true)
      if (value.title !== undefined) {
        setTitle(value.title)
      } else {
        setTitle('')
      }
      if (value.intro_content !== undefined) {
        setIntroContent(value.intro_content)
      } else {
        setIntroContent('')
      }
      if (value.content !== undefined) {
        setContent(value.content)
      } else {
        setContent('')
      }
      if (value.image !== undefined) {
        setImage(value.image)
      } else {
        setImage('')
      }
      if (value.category && value.category.length > 0) {
        setCategory(value.category[0].name)
      } else {
        setCategory('none')
      }
      if (value.hashtag.length > 0) {
        setHashtag(value.hashtag)
      } else {
        setHashtag(['none'])
      }
      if (value.sidead && value.sidead.name) {
        setSidead(value.sidead.name)
      } else {
        setSidead('none')
      }
    } else{
      setView(false)
    }
    
 }

 const popup = () => {
     return (
       <Dialog
        className={classes.dialogRoot}
        open={view}
        onClose={() => setView(false)}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">View Post</DialogTitle>
        <DialogContent dividers={true}>
            <Typography variant="h5" component="h2">
              Title
            </Typography>
          
          <DialogContentText
            id="scroll-dialog-description"
            ref={dialogRef}
            tabIndex={-1}
          >
            {title}
          </DialogContentText>
          <Typography variant="h5" component="h2">
              Intro Content
            </Typography>
          <DialogContentText
            id="scroll-dialog-description"
            ref={dialogRef}
            tabIndex={-1}
          >
            {introContent}
          </DialogContentText>
            <Typography variant="h5" component="h2">
              Content
            </Typography>
            <DialogContentText
            id="scroll-dialog-description"
            ref={dialogRef}
            tabIndex={-1}
          >
            {content}
          </DialogContentText>

            <Typography variant="h5" component="h2">
              Image
            </Typography>
             <CardActionArea>
              <CardMedia
                component="img"
                alt={title}
                image={`${BACKEND}uploads/${image}`}
                title={title}
                className={classes.image}
              />
             </CardActionArea>

            <Typography variant="h5" component="h2">
              Category
            </Typography>
            <DialogContentText
            id="scroll-dialog-description"
            ref={dialogRef}
            tabIndex={-1}
          >
            {category}
          </DialogContentText>

            <Typography variant="h5" component="h2">
              hashtag
            </Typography>
            {
              hashtag.map((value, index) => (
                <DialogContentText
                key={value._id}
            id="scroll-dialog-description"
            ref={dialogRef}
            tabIndex={-1}
          >
            {value.name}
          </DialogContentText>
              ))
            }
              <Typography variant="h5" component="h2">
              Side ad
            </Typography>
            <DialogContentText
            id="scroll-dialog-description"
            ref={dialogRef}
            tabIndex={-1}
          >
            {sidead}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  color="primary">
            Edit
          </Button>
          <Button onClick={() => setView(false)} color="primary">
            close
          </Button>
        </DialogActions>
      </Dialog>
     )
   
 }

 return (
  <Fragment>
  <Admin>
    <NavBar />
    <div style={{ width: 300 }}>
      
          <SearchBar />
          <CreateIcon />
    </div>
    <div>
      {popup()}
    </div>
    <InfiniteScroll
          dataLength={posts.length}
          next={loadMore}
          hasMore={true}
          loader={
            <h2>loading...</h2>
          }
        >
          {showLoadedPosts()}
    </InfiniteScroll>



    </Admin>
  </Fragment>
 )
}

export default AdminPanel;