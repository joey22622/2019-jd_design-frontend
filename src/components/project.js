import React from 'react'
import Image from 'gatsby-image'
import ImageSlider from './imageSlider'
import PhotoGrid from './photoGrid'


//  const Layout = ({children}) => {
class Project extends React.Component{
  state = {
    slides : [],
    imageSlider : {
      active : false,
      activeSlide : {},
      inactiveStyle : {
        display: 'none'
      },
      arrowStyles : {
        next : {},
        prev : {}
      },
      arrowClasses : {
        next : ``,
        prev : ``
      },
      style : {
        current : {
          main: {
            opacity: 0,
            pointerEvents: "none"
          },
          underlay :{
            transform: `translateY(100vh)`,
            opacity: 0.8,
          },
          window :{
            transform: `translateY(-100vh)`,
            opacity: 0
          }
        },
        active : {
          underlay :{
            // transform: `translateY(100vh)`,
            // opacity: 0,
          }
        },
        inactive : {
          main: {
            // display: 'none',
            opacity: 0,
            pointerEvents: "none"
          },
          underlay :{
            transform: `translateY(100vh)`,
            opacity: 0.4,
          },
          window :{
            transform: `translateY(-100vh)`,
            opacity: 0
          }
        }
      }
    },
    data : this.props.data.sanityProject,
    dimmensions : {},
    thumbnail : {
      style : {}
    },
  }
  

  
  toggleSlider = (index) => {
    if(!index){
      index = 0
    }
    let imageSlider = this.state.imageSlider;
    const active = !imageSlider.active;
    imageSlider.active = active;
    if(active){
      // imageSlider.style = imageSlider.activeStyle
      imageSlider.style.current = imageSlider.style.active;
      this.changeSlides(index)
    } else {
      imageSlider.style.current = imageSlider.style.inactive;
    }
    this.setState({imageSlider})
  }
  
  componentDidMount(){
    console.log(this.state.data)
    this.buildSlidesArr()
    window.addEventListener("resize",()=>{
      this.handleDims()
    });
    document.addEventListener("scroll", (e)=>{
      if(this.state.imageSlider.active){
        this.toggleSlider();
      }
    })
    document.addEventListener("keyup", (e)=>{
      console.log(this.state.imageSlider.active);
      if(this.state.imageSlider.active){
        if(e.keyCode === 37){
          this.changeSlides(this.state.imageSlider.activeSlide.index - 1);
        } else if(e.keyCode === 39){
          this.changeSlides(this.state.imageSlider.activeSlide.index + 1);
        } else if(e.keyCode === 27){
          this.toggleSlider();
        }
      }
    })

  }
  checkVar = (a, b) => {
    try{
      return a()
    } catch (e) {
      return b
    }
  }

  handleDims = () =>{
    let dimmensions = this.state.dimmensions;
    const thumb = this.checkVar(()=> document.querySelector(".photo-grid .slide-wrap"),false)
    if(thumb){
      dimmensions.thumbnail = {
        w : thumb.offsetWidth
      }
      this.setState({dimmensions},()=>{
        //dimmension dependent callbacks
        this.wToH()
      })
    }
  }
  toggleGIF = (i) => {
    // alert("hi");
    // alert("index " + i)
    let slides = this.state.slides;
    if(slides[i].remote === slides[i].src){
      slides[i].src = slides[i].remoteStatic
    } else {
       slides[i].src = slides[i].remote
    }
    this.setState({slides});
  }
  buildSlidesArr = () => {
    let slides = this.state.slides;
    let slide = {}
    slide.index = 0;
    slide.gif = false
    if(this.state.data.imgImage.remote){
      slide.remote = this.state.data.imgImage.remote
      slide.remoteStatic = this.state.data.imgImage.remoteStatic
      slide.src = this.state.data.imgImage.remoteStatic
      slide.gif = true
    } else {
    }
    slide.fluid = this.state.data.imgImage.local.asset.fluid;
    // slide.active = false;
    slides.push(slide);
    if(this.state.data.imgGallery.length > 0){
      this.state.data.imgGallery.map((image, i)=>{
        let slide = {}
        slide.index = i + 1
        slide.gif = false
        if(image.remote){
          slide.remote = image.remote
          slide.remoteStatic = image.remoteStatic
          slide.src = this.state.data.imgImage.remoteStatic
          slide.gif = true
        } else {
          }
          slide.fluid = image.local.asset.fluid
        slides.push(slide)
      })
    }
    console.log();
    this.setState({slides},()=>{
      this.handleDims()
    })
  }

  changeSlides =(index) => {
    if(index >= 0 && index < this.state.slides.length){
      let imageSlider = this.state.imageSlider;
      imageSlider.arrowStyles.next = {};
      imageSlider.arrowStyles.prev = {};
      imageSlider.arrowClasses.next = `active`;
      imageSlider.arrowClasses.prev = `active`;
      imageSlider.activeSlide = this.state.slides[index];
      if(index === 0){
      imageSlider.arrowStyles.prev = {
        pointerEvents : 'none',
        opacity: 0.1
      }
      imageSlider.arrowClasses.prev = ``

      } else if(index === this.state.slides.length-1){
        imageSlider.arrowStyles.next = {
          pointerEvents : 'none',
          opacity: 0.1
        }
        imageSlider.arrowClasses.next = ``
      }
      this.setState({imageSlider});
    }
  }

  wToH = () => {
    const thumb = this.state.thumbnail;
    thumb.style = {
      height : this.state.dimmensions.thumbnail.w
    }
    this.setState({thumb})

  }

render() {
  const photoGridData = this.checkVar(()=> this.state.slides,false);


  const link =  this.checkVar(()=> this.state.data.exLink.url,false);
  const title = this.checkVar(()=> this.state.data.exLink.title, `Visit Website`);
  const exLink = link ? (<a href={link} target="blank" title={title}>{title}</a>) : ``
  const bodyData = this.checkVar(()=> this.state.data.body.split('\n'), false);
  const body = () => {
    if(bodyData){
      return(
      <div className="project-body">
      {bodyData.map((p,i)=>(
        <p key={i}>{p}</p>
        
      ))}
      </div>
      )} else {
        return ``;
      }
  }
  // const techData = this.state.data.
  


    return ( 
      <div className="project-wrap-outer">
        <ImageSlider
          // properties = {this.state.imageSlider}
          active={this.state.slider}
          toggle={this.toggleSlider}
          slides={this.state.slides}
          activeSlide={this.state.imageSlider.activeSlide}
          style={this.state.imageSlider.style.current}
          changeSlide = {this.changeSlides}
          arrowStyles = {this.state.imageSlider.arrowStyles}
          arrowClasses = {this.state.imageSlider.arrowClasses}
          checkVar = {this.checkVar}
        />
        <div className="project-wrap-inner">
          <div className="project-left">
            <div className="photo-grid-wrap">
              <div className="photo-grid-inner">
                <div onClick={()=>{this.toggleSlider(0)}}  onMouseOver={()=>{this.changeSlides(0); this.toggleGIF(0)}} onMouseOut={()=>{this.toggleGIF(0)}} key={1} data-index={0} style={this.state.thumbnail.style} className="slide-wrap feat-image">
                  {this.state.slides.length > 0 ?
                  this.state.slides[0].gif ?
                  (<div><img src={this.state.slides[0].src}/></div>)
                  :
                  <Image fluid={this.state.data.imgImage.local.asset.fluid}/>
                  :
                  (<img src=""/>)
                  }
                </div>
                <PhotoGrid
                  toggle = {this.toggleSlider}
                  toggleGIF = {this.toggleGIF}
                  photoGridData = {this.checkVar(()=> this.state.slides,[])}
                  changeSlides = {this.changeSlides}
                  style = {this.state.thumbnail.style}
                />
              </div>
            </div>


          </div>
          <div className="project-right">
            <div className="project-right-inner">
              <div className="project-head">
                <h1><span className="project-type">{this.state.data.projectType.title}</span> {this.state.data.title}</h1>
                <p className="project-client"><label>Client</label> {this.state.data.client.title}</p>
                {exLink}
              </div>
              <div className="project-body-wrap">
              {body()}
              </div>
              <div className="tech">

              </div>
            </div>
          </div>

        </div>
      </div>
      
    )
  }
}


export default Project
