
import React from "react"
// import { Slide } from 'react-slideshow-image'
import Image from 'gatsby-image'



const ImageSlider = (props) => {
    const style = {
      width: `${props.slides.length}00vw`,
      transform: `translateX(-${props.activeSlide.index * 100}vw)`
    }
   
    return(
      <div className="slider-wrapper" style={props.style}>
        <div className="slider-inner">
          <div className="arrow-container">
            <button onClick={(e)=>{ e.preventDefault();props.changeSlide(props.activeSlide.index - 1)}} className="arrow-left">arrow left</button>
            <button onClick={(e)=>{e.preventDefault();props.changeSlide(props.activeSlide.index + 1)}} className="arrow-right">arrow right</button>
          </div>
          <div className="slide-window">
          <div className="slide-container" style={style}>
          
          {props.slides.map((photo, i )=>(
            <div key={i} data-index={i} className="project-slide-wrap">
            <div className="slide-wrap-inner">
              <Image fluid={photo.fluid}></Image> 
            </div>
        </div>

        ))}
      </div>
      </div>
      </div>
      <div onClick={props.toggle}  className="slider-underlay"></div>
    </div>
    )
  }



export default ImageSlider; 
  
