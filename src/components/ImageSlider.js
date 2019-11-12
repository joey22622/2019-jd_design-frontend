
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
            <div className="button-wrap-outer button-prev">
              <div className="button-wrap-inner">
              <button style={props.arrowStyles.prev} onClick={(e)=>{ e.preventDefault();props.changeSlide(props.activeSlide.index - 1)}} className="arrow-left">
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><defs></defs><title>arrow_prev</title><path class="cls-1" d="M88.5,250l323-234.47L196.5,250l215,234.47Z"/></svg>
              </button>
              </div>        
              <div className="arrow-streak"></div>
            </div>
            <div className="button-wrap-outer button-next">
            <div className="arrow-streak"></div>
            <div className="button-wrap-inner">
              <button style={props.arrowStyles.next} onClick={(e)=>{e.preventDefault();props.changeSlide(props.activeSlide.index + 1)}} className="arrow-right">
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><defs></defs><title>arrow_next</title><path class="cls-1" d="M411.5,250,88.5,484.47,303.5,250,88.5,15.53Z"/></svg>
              </button>
              </div>
            </div>
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
  
