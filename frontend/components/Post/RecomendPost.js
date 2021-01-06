
const RecomendPost = ({ title, image, slug}) => {


 return (
      <div key={title} className="latest__post__card">
            <div className="latest__post__image">
              <img src={`${BACKEND}${image}`} />
            </div>
            <div>
              <div className="latest__post__heading__container">
                <h3 className="latest__post__heading">{title}</h3>
              </div>
              <Link href={`/post/${slug}`}>
                <a className="post__read__btn latest__post__readmore">
                  Read More <i className="fas fa-chevron-right post__read__btn__arrow"></i>
                </a>
              </Link>
            </div>
      </div>
 )
}

export default RecomendPost