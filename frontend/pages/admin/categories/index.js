import { Fragment, useState, useEffect } from 'react'
import { getAllCategories } from '../../../actions/admin/category';
import NavBar from '../../../components/Admin/Appbar/NavBar'
import CategoryCard from '../../../components/Admin/category/CategoryCard'
import Admin from '../../../components/Admin/Admin'

const Categories = () => {

  const [ categories, setCategories ] = useState([]);

  useEffect(() => {
    loadCategories();
  }, [])


  const loadCategories = () => {
     getAllCategories().then( 
      data => {
        if ( data.error ) {
          console.log(data.error) 
        } else {
          setCategories([...data])
        }
      }
    )
  }

  const listCategories = () => {
    if (categories.length > 0) {
      return categories.map(( value, index ) => {
        return (
          <article key={index}>
            <CategoryCard  type='category' key={index+1} serial={index+1} id={value._id} name={value.name} image={value.image} />
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
        {listCategories()}
      </div>
    </Admin>
  </Fragment>
 )
}

export default Categories