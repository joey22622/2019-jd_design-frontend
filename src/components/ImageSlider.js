
import React from "react"
// import { Slide } from 'react-slideshow-image'
import Image from 'gatsby-image'



const ImageSlider = (props) => {
    // const transition = props.transition;
    let style = {
      width: `${props.slides.length}00vw`,
      transform: `translateX(-${props.activeSlide.index * 100}vw)`,
    }

   
    return(
      <div className="slider-wrapper" style={props.style.main}>
        <div className="slider-inner">
          <div className="arrow-container">
            <div className="button-wrap-outer button-prev" style={props.arrowStyles.prev}>
              <div className="button-wrap-inner">
              <button  onClick={(e)=>{ e.preventDefault();props.changeSlide(props.activeSlide.index - 1)}} className="arrow-left">
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><defs></defs><title>arrow_prev</title><path className="cls-1" d="M88.5,250l323-234.47L196.5,250l215,234.47Z"/></svg>
              </button>
              </div>        
              <div className="arrow-streak"></div>
            </div>
            <div className="button-wrap-outer button-next" style={props.arrowStyles.next}>
            <div className="arrow-streak"></div>
            <div className="button-wrap-inner">
              <button onClick={(e)=>{e.preventDefault();props.changeSlide(props.activeSlide.index + 1)}} className="arrow-right">
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><defs></defs><title>arrow_next</title><path className="cls-1" d="M411.5,250,88.5,484.47,303.5,250,88.5,15.53Z"/></svg>
              </button>
              </div>
            </div>
          </div>
          <div className="slide-window" style={props.style.window}>
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
      <div onClick={props.toggle} style={props.style.underlay}  className="slider-underlay"></div>
    </div>
    )
  }



export default ImageSlider; 
  
