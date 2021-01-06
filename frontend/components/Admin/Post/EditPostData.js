/*

import React from 'react'
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import '../../../node_modules/react-quill/dist/quill.snow.css';
import Button from '@material-ui/core/Button';
import { createPost, uploadImage } from '../../../actions/admin/posts';
import {  makeStyles, withStyles } from '@material-ui/core/styles';
import { API, BACKEND, DOMAIN } from '../../../config';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { getAllCategories } from '../../../actions/admin/category';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { getAllHashtags, searchHashtag } from '../../../actions/admin/hashtag';

import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import { createValue } from '../../../actions/admin/categoryhashtag';
import Chip from '@material-ui/core/Chip';
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getAllSideads } from '../../../actions/admin/sidead';
import imageCompression from 'browser-image-compression';


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
            editorHtml: this.props.content,
            title: this.props.title,
            introContent: this.props.introContent,
            category: this.props.category,
            hashtag: this.props.hashtag,
            sidead: this.props.sidead,
            image: this.props.image,
            photo: null,
            date:  moment().format("YYYY-MM-DD"),
            open: false,
            allCategories: [],
            allHashtags: [],
            selectedHashtags: this.props.hashtag,
            displayHashtag: [],
            hashtagOpen: false,
            hashtagBoxValue: {
              id: "0",
              name: "",
              inputValue: ""
            },
            allSideads: [],
            sidead: {
              id: '',
              name: '',
              
            },

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.listCategories = this.listCategories.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.handleHashtagSubmit = this.handleHashtagSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.quill = null;
        
    }

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.photo === null) {
            toast.error("Photo not added")
        } else if (this.state.title === '') {
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
          formData.append("file", this.state.photo);
          formData.append("title", this.state.title);
          formData.append("intro_content", this.state.introContent);
          formData.append("date", this.state.date);
          formData.append("content", this.state.editorHtml);
          formData.append("category", this.state.category);
          this.state.selectedHashtags.forEach((value, index) => {
            formData.append(`hashtag[${index}]`, value.id)
          })
          if (this.state.sidead.id !== '') {
            formData.append("sidead", this.state.sidead.id)
          }
          
          createPost(formData).then( data => {
            if (data.error) {
              toast.error("Post Creation Failed")
            } else {
              toast.success("Post created Successfully")
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
                  id:this.state.hashtagBoxValue.id,
                  name: this.state.hashtagBoxValue.inputValue
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

    handleChange(html) {
        this.setState({ editorHtml: html });
    }

    handleCategory(data) {
      this.setState({ allCategories: data})
    }

    async compressImage(name, value) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 360,
        useWebWorker: true
      }
      const compressedFile = await imageCompression(value, options);
      console.log("Compressed")
    this.setState({ ...this.state, [name]: compressedFile });
    } 

    handleHashtagBoxOpen() {
       this.setState({ hashtagOpen : true })
    }

    handleHashtagBoxClose() {
       this.setState({ hashtagOpen : false })
    }

    handleContentChange = name => e => {
    // console.log(e.target.value);
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    //formData.set(name, value);
    if ( name === "photo") {
      console.log("Called")
      compressImage(name, value)
    } else {
      console.log("not Called")
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
        console.log(this.state.selectedHashtags)
        return (
          <div className="selected__hashtags">
            {
              this.state.selectedHashtags.map((value) => {
          return (
            
              <Chip key={value.id} variant="outlined" label={value.name} color="primary" size="small" 
            onDelete={() => {
              let hashtags = this.state.selectedHashtags.filter( check => check.id !== value.id);
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
                  id :  this.state.hashtagBoxValue.id,
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
          return (
            <p> hashtags</p>
          )
        } else {
          console.log(this.state.allHashtags)
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
                      console.log(newValue)
                        setTimeout(() =>{

                        this.setState({ hashtagBoxValue: {
                          id: newValue._id,
                          name: newValue.name,
                          inputValue: newValue.inputValue
                        } })
                        this.setState({ hashtagOpen : true })
                      })
                    } else if (newValue && newValue.id != 0 ) {
                      console.log(newValue)
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
                <FormControlLabel value={`${value._id}`} control={<Radio />} label={`${value.name}`} />
              </ListItem>
            )
          )
        }
    }

    listSideAds() {
      return (
          <Autocomplete
                  id="combo-box-demo"
                  options={this.state.allSideads}
                  getOptionLabel={(option) => option.name}
                  style={{ width: 300 }}
                  onChange={(event, value) => this.setState({ sidead: {
                    id: value._id,
                    name: value.name,
                  }})}
                  renderInput={(params) => <TextField {...params} label="Side ad" variant="outlined" />}
          />
      )
    }


    
    componentWillMount() {
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

    render() {
        const { classes } = this.props;

        return (
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
                        <h1>{this.props.introContent}  title</h1>
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
                        <input accept="image/*" name="photo" className="file__upload__button" type="file" onChange={this.handleContentChange('photo')} /> 
                    </div>

                    <hr />
                    <ReactQuill
                    ref={el => {
                        this.quill = el;
                    }}
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
                              //console.log(e.target.value)
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
                  <div className={classes.hashtagList}>
                    {this.listSelectedHashtags()}
                    {this.listHashtags()}
                    {this.addHashtag()}
                  </div>

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
                  />
                  
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
        );
    }
}




export default withStyles(useStyles, { withTheme: true })(CreatePostData);


*/