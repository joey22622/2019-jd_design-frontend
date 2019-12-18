
import React from "react"
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
          <div className="arrow-container" style={props.style.underlay}>
            <div className={"button-wrap-outer button-prev "+props.arrowClasses.prev} >
              <div className="button-wrap-inner">
              <button  onClick={(e)=>{ e.preventDefault();props.changeSlide(props.activeSlide.index - 1)}} className="arrow-left" style={props.arrowStyles.prev}>
                <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><defs></defs><title>arrow_prev</title><path className="cls-1" d="M88.5,250l323-234.47L196.5,250l215,234.47Z"/></svg>
              </button>
              </div>        
              <div className="arrow-streak"></div>
            </div>
            <div className={"button-wrap-outer button-next "+ props.arrowClasses.next}>
            <div className="arrow-streak"></div>
            <div className="button-wrap-inner">
              <button onClick={(e)=>{e.preventDefault();props.changeSlide(props.activeSlide.index + 1)}} className="arrow-right" style={props.arrowStyles.next}>
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
              {/* <Image fluid={photo.fluid}></Image>  */}
              {
                photo.gif ?
                (<div className="gif-wrap"><img src={photo.remote}/></div>)
                :
                  <Image fluid={photo.fluid}/>              
              }
              {
                photo.caption || photo.exLink ?
                <div className="text-box">
                   {
                  photo.exLink ?
                    <div className="link-wrap">
                      <a href={photo.exLink} target="_blank">{photo.linkTitle}</a>
                    </div>
                    :
                    <div className="link-wrap empty"/>
                  }
                  {
                  photo.caption ?
                    <div className="caption-wrap">
                      <p>{photo.caption}</p>
                    </div>
                    :
                    <div className="caption-wrap empty"/>
                  }
                </div>
                :
                <div className="text-box empty"/>
              }


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
  
