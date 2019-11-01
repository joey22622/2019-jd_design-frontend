
import React from "react"
// import { Slide } from 'react-slideshow-image'
import Image from 'gatsby-image'



const PhotoGrid = (props) => {
    console.log(props.photoGridData)
    // const photoGrid = buildPhotoGrid();
    return(
          <div className="photo-grid">
        {props.photoGridData.map((photo, i)=>{
          const j = parseFloat(i+1);
          // console.log(photo)
          return(
          <div onClick={(e)=>{props.toggle(e, j)}}key={j} data-index={j} style={props.style} className="slide-wrap">
              <Image fluid={photo.fluid}/>
          </div>
          )})}
  
        </div>
    )
  }


export default PhotoGrid; 
  
