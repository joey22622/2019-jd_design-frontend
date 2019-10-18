
import React from "react"
// import { Slide } from 'react-slideshow-image'
import Image from 'gatsby-image'



const ImageSlider = (props) => {
  // render(){
   
    return(
      <div className="slider-wrapper" style={props.style}>
        <div onClick={props.toggle}  className="slider-underlay"></div>
        <div className="slider-inner">
          <div className="arrow-container">
            {/* // <button onClick={()=>{goNext()}} className="arrow-left">arrow left</button>
            // <button onClick={this.slideRef.goPrev} className="arrow-right">arrow right</button> */}
          </div>
        <div className="slide-container">
          {props.slides.map((photo, i )=>(
                      <div key={i} data-index={i} className="project-slide-wrap">
                <Image fluid={photo}></Image> 
        </div>

          ))}
      </div>
      </div>
    </div>
    )
  }


export default ImageSlider; 
  
