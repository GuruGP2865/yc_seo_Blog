/*import React from 'react'
import { useState, useEffect } from 'react'
import NavBar from '../../../../components/Admin/Appbar/NavBar';
import { withRouter } from 'next/router'
import EditPostData from '../../../../components/Admin/Post/EditPostData';

import { getSinglePostById } from '../../../../actions/admin/posts'




 
const EditPost = ( { post }) => {

 const [ title, setTitle ] = useState('');
 const [ introContent, SetIntroContent ] = useState();
 const [ content, setContent ] = useState('');
 const [ image, setImage ] = useState('');
 const [ category, setCategory ] = useState([]);
 const [ hashtag, setHashtag ] = useState([]);
 const [ sidead, setSidead] = useState('');


 
 useEffect(() => {
    if (post.title !== undefined) {
        setTitle(post.title)
      } else {
        setTitle('')
      }
      if (post.intro_content !== undefined) {
        SetIntroContent(post.intro_content)
      } else {
        SetIntroContent('')
      }
      if (post.content !== undefined) {
        setContent(post.content)
      } else {
        setContent('')
      }
      if (post.image !== undefined) {
        setImage(post.image)
      } else {
        setImage('')
      }
      if (post.category && post.category.length > 0) {
        setCategory(post.category[0])
      } else {
        setCategory('none')
      }
      if (post.hashtag !== undefined && post.hashtag.length > 0) {
        let hash = post.hashtag.map((element, index) => {
          return (
            {
              id: element._id,
              name: element.name
            }
          )
        });
        setHashtag(hash)
        console.log(hash);
      } else {
        setHashtag(['none'])
      }
      if (post.sidead && post.sidead.name) {
        setSidead(post.sidead.name)
      } else {
        setSidead('none')
      }
 }, [])


 return (
  <React.Fragment>
    <NavBar />
    <EditPostData title={title} 
                  introContent={introContent} 
                  content={content}
                  image={image}
                  category={category}
                  hashtag={hashtag}
                  sidead={sidead}  />
  </React.Fragment>
 )
}


EditPost.getInitialProps = ({ query }) => {
 return getSinglePostById(query.slug).then( data => {
  if (data.error) {
   console.log(data.error)
  } else {
    //console.log(data)
   return { post : data}
  }
 })
}

export default withRouter(EditPost)
*/


import React from 'react'
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../../../node_modules/react-quill/dist/quill.snow.css';
import Button from '@material-ui/core/Button';
import { editPost, getSinglePostById, uploadFilterImage, uploadImage } from '../../../../actions/admin/posts';
import {  makeStyles, withStyles } from '@material-ui/core/styles';
import { API, BACKEND, DOMAIN } from '../../../../config';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { getAllCategories } from '../../../../actions/admin/category';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { getAllHashtags, searchHashtag } from '../../../../actions/admin/hashtag';

import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { createValue } from '../../../../actions/admin/categoryhashtag';
import Chip from '@material-ui/core/Chip';
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getAllSideads } from '../../../../actions/admin/sidead';
import Router from 'next/router'

import NavBar from '../../../../components/Admin/Appbar/NavBar';
import { withRouter } from 'next/router'
import Switch from '@material-ui/core/Switch';

import Admin from '../../../../components/Admin/Admin'

const filter = createFilterOptions();


const useStyles = (theme) => ({
  root: {
    width: '90%',
    maxWidth: '360px',
    backgroundColor: '#fff',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  title: {
    width: '98%',
    margin: '10px 1%'
  },
  introContent: {
    width: '98%',
    margin: '10px 1%'
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  categoryForm: {
    width: '50%',
    maxWidth: '340px',
    padding: '10px 2px',
    backgroundColor: '#fff',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
    "@media (max-width: 850px)": {
      width: '90%',
      maxWidth: '700px',
    },
  }, 
  hashtagList: {
    width: '50%',
    maxWidth: '340px',
    padding: '10px 2px',
    backgroundColor: '#fff',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
    "@media (max-width: 850px)": {
      width: '90%',
      maxWidth: '700px',
    },
    selectedHashtags: {
      width: '100%',
      padding: '10px'
    },
    submitButton: {
      width: '90%',
      margin: "10px",
      padding: "10px"
    }
  }
});

class CreatePostData extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          _id : "",
            editorHtml: '',
            title: this.props.title,
            introContent: this.props.introContent,
            category: '',
            hashtag: this.props.hashtag,
            image: '',
            photo: null,
            date:  moment().format("YYYY-MM-DD"),
            open: false,
            allCategories: [],
            allHashtags: [],
            selectedHashtags: [],
            displayHashtag: [],
            hashtagOpen: false,
            hashtagBoxValue: {
              id: "0",
              name: "",
              inputValue: ""
            },
            allSideads: [],
            sidead: {
              _id: '',
              name: '',
            },
            story: null,
            storyContentImage: '',
            storyContentImagePhoto: null,
            storyContent: '',
            storySmallImage: '',
            storySmallImagePhoto: null,
            storySmallContent: '',

        };
        this.handleChange = this.handleChange.bind(this);
        this.listCategories = this.listCategories.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.handleHashtagSubmit = this.handleHashtagSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.quill = null;
        
    }

    static async getInitialProps({ query }) {
      return getSinglePostById(query.slug).then( data => {
      if (data.error) {
        console.log(data.error)
      } else {
      //console.log(data.sidead)
      let dataCategory = []
      let dataHashtag = []
      let dataSidead = {
        _id: '',
        name: ''
      }
      if (data.category.length > 0) {
            dataCategory = data.category[0]
      }
      if (data.hashtag.length > 0) {
            dataHashtag = data.hashtag
      }

      if (data.sidead !== undefined) {
            dataSidead = data.sidead
      }

      let value = {
        _id: data._id,
        title: data.title,
        introContent: data.intro_content,
        content: data.content,
        image: data.image,
        category: dataCategory,
        hashtags: dataHashtag,
        sidead: dataSidead,
        story: data.story,
        storyContent: data.storyContent,
        storyContentImage: data.storyContentImage,
        storySmallContent: data.storySmallContent,
        storySmallImage: data.storySmallImage
      }
      return { post : value}
      }
    })
    }

    handleSubmit(e) {
        e.preventDefault();

         if (this.state.title === '') {
          toast.error("title not added")
        } else if (this.state.introContent === '') {
          toast.error("intro content not added")
        } else if (this.state.editorHtml === '') {
          toast.error("Content not added")
        } else if (this.state.category === '') {
          toast.error("Category not added")
        } else if (this.state.selectedHashtags.length == 0) {
          toast.error("hashtags not added")
        } else {
          const formData = new FormData();
          if (this.state.photo !== null) {
            formData.append("file", this.state.photo);
          }
          formData.append("title", this.state.title);
          formData.append("intro_content", this.state.introContent);
          formData.append("content", this.state.editorHtml);
          formData.append("category", this.state.category);
          formData.append("bannerimage", this.state.image)
          this.state.selectedHashtags.forEach((value, index) => {
            formData.append(`hashtag[${index}]`, value._id)
          })
          if (this.state.sidead._id !== '') {
            formData.append("sidead", this.state.sidead._id)
          }

          if (this.state.story === true) {
            console.log("new Updation in story")
            formData.append("story", this.state.story);
            formData.append("storyContent", this.state.storyContent);
            formData.append("storyContentImage", this.state.storyContentImage);
            formData.append("storySmallContent", this.state.storySmallContent);
            formData.append("storySmallImage", this.state.storySmallImage);
          }

          /*
          
          console.log(this.state.title);
          console.log(this.state.introContent);
          console.log( this.state.editorHtml);
          console.log(this.state.category);
          console.log(this.state.selectedHashtags);
          console.log(this.state.sidead);

          */
          
          editPost(formData, this.state._id).then( data => {
            if (data.error) {
              toast.error("Post Edit Failed")
            } else {
              toast.success("Post Edited Successfully")
              this.setState({
                photo: null,
                title: '',
                introContent: '',
                editorHtml: '',
                category: '',
                selectedHashtags: [],
                sidead: {
                  id: '',
                  name: ''
                }
              })
              Router.replace("/admin/posts")
            }
          })
        }
    }

    handleHashtagSubmit(e) {
      e.preventDefault();
      let value = this.state.hashtagBoxValue.inputValue;
      createValue("hashtag", value).then( data => {
        if (data.error) {
          console.log(data.error)
        } else {
          let val = {
                   _id: data.hash._id,
                  name: data.hash.name
                };
                this.setState({ hashtagBoxValue : {
                  id: data._id,
                  name: data.name
                }});
                
                  this.setState({ 
                selectedHashtags : [...this.state.selectedHashtags, val] 
              })
              
          this.setState({ hashtagOpen : false })
          getAllHashtags().then( data => {
           //this.setState({[allCategories] : data})
          if (!data.error) {
            //this.handleCategory(data)
            this.setState({ allHashtags: data})
          }
      })
        }
      })
    }

    handleChange(e) {
        this.setState({ editorHtml: e });
    }

    handleCategory(data) {
      this.setState({ allCategories: data})
    }

    handleHashtagBoxOpen() {
       this.setState({ hashtagOpen : true })
    }

    handleHashtagBoxClose() {
       this.setState({ hashtagOpen : false })
    }

    handleContentChange = name => e => {
    // console.log(e.target.value);
    const value = name === "photo" || name === "storyContentImage" || name === "storySmallImage" ? e.target.files[0] : e.target.value;
    //formData.set(name, value);
    if ( name === 'photo' ) {
      const formData = new FormData();
      formData.append("file", value)
      formData.append("type", "banner")
      //console.log("sent")
      uploadFilterImage(formData).then(
        data => {
          if (data.error) {
            console.log(data.error)
          }
          this.setState({ image: data.filename})
          console.log(data.filename)
        }
      )
    } else if ( name === 'storyContentImage') {
      const formData = new FormData();
      formData.append("file", value)
      formData.append("type", "story")
      //console.log("sent")
      uploadFilterImage(formData).then(
        data => {
          if (data.error) {
            console.log(data.error)
          }
          this.setState({ storyContentImage: data.filename})
          //console.log(data.filename)
        }
      )
    } else if ( name === 'storySmallImage') {
      const formData = new FormData();
      formData.append("file", value)
      formData.append("type", "storySmallImage")
      //console.log("sent")
      uploadFilterImage(formData).then(
        data => {
          if (data.error) {
            console.log(data.error)
          }
          this.setState({ storySmallImage: data.filename})
          //console.log(data.filename)
        }
      )
    } else {
      this.setState({ ...this.state, [name]: value });
    }
    
    };


    imageHandler() {
        const input = document.createElement('input');

        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = () => {
            const file = input.files[0];
            const formData = new FormData();

            formData.append('file', file);

            // Save current cursor state
            const range = this.quill.getSelection(true);

            // Insert temporary loading placeholder image
            this.quill.insertEmbed(range.index, 'image', `http://localhost:3000/static/images/loader.gif`);

            // Move cursor to right side of image (easier to continue typing)
            this.quill.setSelection(range.index + 1);

            uploadImage(formData).then(data => {
                if ( data.error) {
                    console.log(data.error);
                } else {
                     // Remove placeholder image
                    this.quill.deleteText(range.index, 1);

                    // Insert uploaded image
                    // this.quill.insertEmbed(range.index, 'image', res.body.image);
                    this.quill.insertEmbed(range.index, 'image', (BACKEND).concat(data.url));
                    this.quill.setSelection(range.index + 1);
                }
            }); // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'
        };
    }

    listSelectedHashtags() {
      if ( this.state.selectedHashtags.length === undefined && this.state.selectedHashtags) {
        return <p className="selected__hashtags__para">Nothing selected</p>
      } else {  
        //console.log(this.state.selectedHashtags)
        return (
          <div className="selected__hashtags">
            {
              this.state.selectedHashtags.map((value) => {
          return (
            
              <Chip key={value._id}  variant="outlined" label={value.name} color="primary" size="small" 
            onDelete={() => {
              let hashtags = this.state.selectedHashtags.filter( check => check._id !== value._id);
              return this.setState({ selectedHashtags : hashtags})
            }} />
         
          )
        })
            }
          </div>
        )
      }
    }


    
    addHashtag() {
        if (this.state.hashtagBoxValue.name === '' || this.state.selectedHashtags.some( item => item.id === this.state.hashtagBoxValue.id)) {
          return (
            <div className="hashtag__button">
              <Button variant="contained" disabled>
                Add
              </Button>
            </div>
          )
        } else {
          return (
            <Button className="hashtag__button" onClick={
              () => {
                let val = {
                  _id :  this.state.hashtagBoxValue.id,
                  name:  this.state.hashtagBoxValue.name,

                }
                this.setState({ hashtagBoxValue : {
                  id: '',
                  name: '',
                  inputValue: ''
                }})
                return (
                  this.setState({ 
                selectedHashtags : [...this.state.selectedHashtags, val] 
              })
                )
              }
            } variant="contained"  color="primary">
              Add
            </Button>
          )
        }
      
    }
    

    listHashtags() {

      if (this.state.allHashtags.length == 0) {
        {/**<ListItem button key={1}>
              <ListItemText primary={`Item 1`} />
            </ListItem> */}
          return (
            <p> hashtags</p>
          )
        } else {
          //console.log(this.state.allHashtags)
          {/**<ListItem button key={value._id}>
                <ListItemText primary={`${value.name}`} />
              </ListItem> */}

               {
                  /**
                    <Autocomplete
                  id="combo-box-demo"
                  options={this.state.allHashtags}
                  getOptionLabel={(option) => option.name}
                  style={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Hashtags" variant="outlined" />}
                />
                   
                   */
                }
          return (
            <React.Fragment>
                <Autocomplete
                  value={this.state.hashtagBoxValue.name}
                  onChange={(event, newValue) => {
                    
                    if (typeof newValue === 'string') {
                      setTimeout(() =>{

                        this.setState({ hashtagOpen : true })
                        this.setState({ hashtagBoxValue: {
                          id: "0",
                          name: newValue,
                          inputValue: newValue
                        }})
                        
                      })
                      
                    } else if (newValue && newValue.inputValue) {
                      // Create a new value from the user input
                      //console.log(newValue)
                        setTimeout(() =>{

                        this.setState({ hashtagBoxValue: {
                          id: newValue._id,
                          name: newValue.name,
                          inputValue: newValue.inputValue
                        } })
                        this.setState({ hashtagOpen : true })
                      })
                    } else if (newValue && newValue.id != 0 ) {
                      //console.log(newValue)
                        setTimeout(() =>{

                        this.setState({ hashtagBoxValue: {
                          id: newValue._id,
                          name: newValue.name,
                          inputValue: newValue.inputValue
                        } })
                      })
                    } else {
                      this.setState({ hashtagBoxValue: {
                          id: "0",
                          name: newValue,
                          inputValue: newValue
                        }})
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    // Suggest the creation of a new value
                    if (params.inputValue !== '') {
                      filtered.push({
                        _id: 0,
                        inputValue: params.inputValue,
                        name: `Add "${params.inputValue}"`,
                      });
                    }
                    return filtered;
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="free-solo-with-text-demo"
                  options={this.state.allHashtags}
                  getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    
                    // Regular option
                    return option.name;
                  }}
                  renderOption={(option) => option.name}
                  style={{ width: 300 }}
                  freeSolo
                  renderInput={(params) => (
                    
                    <TextField {...params} label="Hashtags" variant="outlined" />
                  )}
              />

    <Dialog open={this.state.hashtagOpen} onClose={this.handleHashtagBoxClose} aria-labelledby="form-dialog-title">
        <form onSubmit={this.handleHashtagSubmit}>
          <DialogTitle id="form-dialog-title">Add a new Hashtag</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did you miss any hashtags in the list? Please, add it!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={this.state.hashtagBoxValue.inputValue}
              onChange={(event) => this.setState({ hashtagBoxValue : {
                name: event.target.value,
                inputValue: event.target.value
              } })}
              label="name"
              type="text"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ hashtagOpen : false })} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      </React.Fragment>
    )
        }
    }

    listCategories() {
      
      if (this.state.allCategories.length == 0) {
          return (
            <ListItem button key={1}>
              <ListItemText primary={`no values`} />
            </ListItem>
          )
        } else {
          console.log(this.state.allCategories)
          return this.state.allCategories.map((value) => 
             (
              <ListItem button key={value._id}>
                <FormControlLabel value={value._id} control={<Radio />} label={`${value.name}`} />
              </ListItem>
            )
          )
        }
    }

    listSideAds() {
      return (
          <Autocomplete
          value={this.state.sidead}
                  id="combo-box-demo"
                  options={this.state.allSideads}
                  getOptionLabel={(option) => option.name}
                  style={{ width: 300 }}
                  onChange={(event, value) => {
                    //console.log(this.state.sidead);
                    if (value === null) {
                      return;
                    }
                    else {
                      return (
                      this.setState({ sidead: {
                    _id: value._id,
                    name: value.name
                  }})
                    )
                    }
                  }}
                  renderInput={(params) => <TextField {...params} label="Side ad" variant="outlined" />}
          />
      )
    }

    
    componentDidMount() {
      let propsValue = this.props.post;
      this.setState({
        _id : propsValue._id,
        title : propsValue.title,
        introContent: propsValue.introContent,
        content: propsValue.content,
        image: propsValue.image,
        category: propsValue.category._id,
        selectedHashtags: propsValue.hashtags,
        date: propsValue.date,
        editorHtml: propsValue.content,
        sidead: propsValue.sidead,
        story: propsValue.story,
        storyContent: propsValue.storyContent,
        storyContentImage: propsValue.storyContentImage,
        storySmallContent: propsValue.storySmallContent,
        storySmallImage: propsValue.storySmallImage
      })
      if ( this.state.allCategories.length == 0) {
        getAllCategories().then( data => {
           //this.setState({[allCategories] : data})
          if (!data.error) {
            //this.handleCategory(data)
            this.setState({ allCategories: data})
          }
      })
      }

      if ( this.state.allHashtags.length == 0) {
        getAllHashtags().then( data => {
           //this.setState({[allCategories] : data})
          if (!data.error) {
            //this.handleCategory(data)
            
            this.setState({ allHashtags: data})
          }
      })
      }

      if (this.state.allSideads.length == 0) {
        getAllSideads().then(data => {
          if (!data.error) {
            this.setState({ allSideads: data})
          }
        })
      }
    }

    
    storyUploader() {
      const { classes } = this.props;
      if (this.state.story === true) {
        return (
        <div>
          <img src={`${BACKEND}uploads/${this.state.storyContentImage}`} />
          <input name="storyContentImagePhoto" value={this.state.storyContentImagePhoto} className="file__upload__button" type="file" onChange={this.handleContentChange('storyContentImage')} /> 
          <TextField
            className={classes.introContent}
            id="outlined-textarea"
            label="Story Content"
            placeholder="Story Content"
            multiline
            variant="outlined"
            type="text" 
            value={this.state.storyContent}
            onChange={this.handleContentChange('storyContent')}
            />

          <img src={`${BACKEND}uploads/${this.state.storySmallImage}`} />
          <input name="storySmallImagePhoto" value={this.state.storySmallImagePhoto} className="file__upload__button" type="file" onChange={this.handleContentChange('storySmallImage')} /> 
          <TextField  type="text" 
            className={classes.title}
            value={this.state.storySmallContent}
            onChange={this.handleContentChange('storySmallContent')} 
            id="outlined-basic" 
            label="Story small Title" 
            variant="outlined" />
        </div>
      )
      }
      
    }

    render() {
        const { classes } = this.props;
        //console.log(this.props.post)

        return (
          <React.Fragment>
            <Admin>
            <NavBar />
            <div >
              <ToastContainer />
              <form>
              <div className="post__create">
                <div>
                    <div className="form-group">
                        <TextField  type="text" 
                        className={classes.title}
                        value={this.state.title} 
                        onChange={this.handleContentChange('title')} 
                        id="outlined-basic" 
                        label="Title" 
                        variant="outlined" />
                        <h1>{this.props.title}  title</h1>
                        <TextField
                        className={classes.introContent}
                        id="outlined-textarea"
                        label="Intro Content"
                        placeholder="Intro Content"
                        multiline
                        variant="outlined"
                        type="text" 
                        value={this.state.introContent}
                        onChange={this.handleContentChange('introContent')}
                        />
                        <img src={`${BACKEND}uploads/${this.state.image}`} />
                        <input name="photo" className="file__upload__button" type="file" onChange={this.handleContentChange('photo')} /> 
                        <FormControlLabel
        control={<Switch  color="primary" checked={this.state.story} onChange={() => this.setState({ story: !this.state.story})} />}
        label="Story" name="story"
      />

       {this.storyUploader()}
                    </div>

                    {/*JSON.stringify(this.state.editorHtml)*/}
                    <hr />
                    <ReactQuill
                    ref={el => {
                        this.quill = el;
                    }}
                    value={this.state.editorHtml || ''}
                    onChange={this.handleChange}
                    placeholder={this.props.placeholder}
                    
                    modules={{
                        toolbar: {
                            container: [
                                [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
                                [{ size: [] }],
                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                [{ list: 'ordered' }, { list: 'bullet' }],
                                ['link', 'image', 'video'],
                                ['clean'],
                                ['code-block']
                            ],
                            handlers: {
                                image: this.imageHandler
                            }
                        }
                    }}
                    />

                    
                
                </div>
                
                <div>
                  <div className="">
                    <FormControl className={classes.categoryForm} component="fieldset">
                      <FormLabel component="legend">Category</FormLabel>
                        
                        <List className={classes.root} >
                          <RadioGroup aria-label="category" name="category" value={this.state.category} onChange={
                            (e) => {
                              console.log(e.target.value)
                              return this.setState({
                                category: e.target.value
                              })
                            }
                          }>
                            {this.listCategories()}
                          </RadioGroup>
                          
                        </List> 
                    </FormControl>
                  </div>
                    
                  <h2>Hashtags</h2>
                  {
                    /*
                    <TextField
                    type="search"
                    variant="outlined"
                    margin="normal"
                    InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    )
                    }}
                  />
                    */
                  }
                  <div className={classes.hashtagList}>
                    {this.listSelectedHashtags()}
                    {this.listHashtags()}
                    {this.addHashtag()}
                  </div>


                  {/*
                  <TextField
                    id="date"
                    label="Created Date"
                    type="date"
                    onChange={this.handleContentChange('date')} 
                    defaultValue={this.state.date}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  /> */ }
                  
                  {this.listSideAds()}
                </div>
              </div>
                  <div className="post__submit__button">
                    <Button className={classes.submitButton} variant="contained"  color="primary" onClick={this.handleSubmit}>
                    Publish
                    </Button>
                    </div>
                </form>
            </div>
            </Admin>
           </React.Fragment>
        );
    }
}



const newComponent = withRouter(CreatePostData)
export default withStyles(useStyles, { withTheme: true })(newComponent);