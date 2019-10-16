
import React from "react"
// import { Slide } from 'react-slideshow-image'
import Image from 'gatsby-image'



class ImageSlider extends React.Component {
  // render(){
    state = { 
    }
   
    componentDidMount(){
      console.log(this.state)
      // this.changeSlides('prev')
      this.props.changeSlides(0);

    }
    componentWillUpdate(){
      console.log(`active: ` +this.state.active)
      if(!this.state.loaded){

      }
    } 
    componentDidUpdate(){
      console.log(`active: ` +this.state.active)

    }

    // slide = 'next' ,' prev' , 'slide data-index'

    

    render(){
    return(
      <div className="slider-wrapper" style={this.props.style}>
        <div onClick={this.props.toggle}  className="slider-underlay"></div>
        <div className="slider-inner">
          <div className="arrow-container">
            {/* // <button onClick={()=>{goNext()}} className="arrow-left">arrow left</button>
            // <button onClick={this.slideRef.goPrev} className="arrow-right">arrow right</button> */}
          </div>
        <div className="slide-container">
          {this.props.slides.map((photo, i )=>(
                      <div key={i} data-index={i} className="project-slide-wrap">
<Image fluid={photo}></Image> 


                  </div>

          ))}
      </div>
      </div>
    </div>
    )
  }

}
export default ImageSlider; 
  
