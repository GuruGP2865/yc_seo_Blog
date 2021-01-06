import { Fragment, useState, useEffect } from 'react'
import { getAllHashtags } from '../../../actions/admin/hashtag';
import NavBar from '../../../components/Admin/Appbar/NavBar'
import CHCard from '../../../components/Admin/CategoryAndHashtag/CHCard'
import Modal from '@material-ui/core/Modal';
import Admin from '../../../components/Admin/Admin'

const Hashtags = () => {

  const [ hashtags, setHashtags ] = useState([]);
  const [ open, setOpen ] = useState(false);
  


  useEffect(() => {
    loadHashtags();
  }, [])

 

  const loadHashtags = () => {
     getAllHashtags().then( 
      
      data => {
        console.log(data);
        if ( data.error ) {
          console.log(data.error) 
        } else {
          setHashtags([...data])
        }
      }
    )
  }

  const listHashtags = () => {
    if (hashtags.length > 0) {
      return hashtags.map(( value, index ) => {
        return (
          <article key={index}>
            <CHCard  type='hashtag' key={index+1} serial={index+1} id={value._id} name={value.name} />
          </article>
        )
      }
      )
    }
  }

 return (
  <Fragment> 
    <Admin>
    <NavBar />
      <div className="category__container">
        {listHashtags()}
      </div>
    </Admin>
  </Fragment>
 )
}

export default Hashtags