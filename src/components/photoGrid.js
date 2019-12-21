
import React from "react"
// import { Slide } from 'react-slideshow-image'
import Image from 'gatsby-image'



const PhotoGrid = (props) => {
    return(
          <div className="photo-grid">  
        {props.photoGridData.map((photo, i)=>{
          return(
          i > 0 &&
          <div onClick={()=>{props.toggle(i)}}key={i} onMouseOver={()=> props.changeSlides(i)} data-index={i} style={props.style} className="slide-wrap">
              {
                photo.gif ?
                (<div onMouseEnter={()=>  props.toggleGIF(i)} onMouseOut={()=> props.toggleGIF(i)} ><img src={photo.src} alt={photo.title}/></div>)
                :
                  <Image fluid={photo.fluid} alt={photo.title}/>
                }
          </div>  
          )})}
  
        </div>
    )
  }
  
export default PhotoGrid; 
  
