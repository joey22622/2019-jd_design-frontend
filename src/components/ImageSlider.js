
import React from "react"
import { Slide } from 'react-slideshow-image'
import Image from 'gatsby-image'



const ImageSlider = (props) => {
  // render(){
    const slideData = props.slides;

    const properties = {
      // duration: 5000,
      autoplay: false,
      transitionDuration: 500,
      infinite: true,
      indicators: true,
      arrows: true,
      onChange: (oldIndex, newIndex) => {
        console.log(`slide transition from ${oldIndex} to ${newIndex}`);
      }
    }
    return(
      <div className="slider-wrapper">
        <div className="slider-inner">
          <div className="arrow-container">
            {/* // <button onClick={()=>{goNext()}} className="arrow-left">arrow left</button>
            // <button onClick={this.slideRef.goPrev} className="arrow-right">arrow right</button> */}
          </div>
        <div className="slide-container">
        <Slide {...properties}>
          {props.slides.map((photo, i )=>(
                      <div key={i} className="project-slide">
<Image fluid={photo}></Image> 


                  </div>

          ))}
        </Slide>
      </div>
      </div>
    </div>
    )
  // }
}
export default ImageSlider; 
  
