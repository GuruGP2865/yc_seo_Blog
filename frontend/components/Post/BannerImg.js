import { BACKEND } from '../../config'
import Link from "next/link"


const BannerImg = ({sidead}) => {


 return (
  <div className="side__banner__image__column">
      <a target="_blank" href={sidead.link}>
        <img src={`${BACKEND}uploads/${sidead.image}`} />
      </a>
      
  </div>
 )
}

export default BannerImg