import React from 'react'
import Image from 'gatsby-image'
import ImageSlider from './imageSlider'


//  const Layout = ({children}) => {
class Project extends React.Component{
  state = {
    imageSlider : {
      active : false,
      activeStyle : {},
      inactiveStyle : {
        display: 'none'
      },
      style : {display: 'none'}
    },
    data : this.props.data.sanityProject,
    dimmensions : {},
    thumbnail : {
      style : {}
    },
    slides : [],
    firstSlide : this.props.firstSlide,
    active : this.props.active,
    loaded : this.props.loaded,
    slideQueue : {
      active : 0
    }

  }
  
  componentDidUpdate(){
   
  }
  
  toggleSlider = () => {
    let imageSlider = this.state.imageSlider;
    const active = !imageSlider.active;
    imageSlider.active = active;
    if(active){
      imageSlider.style = imageSlider.activeStyle
    } else {
      imageSlider.style = imageSlider.inactiveStyle
    }
    console.log("hi there")
    console.log(imageSlider)
    this.setState({imageSlider})
  }
  
  componentDidMount(){
    this.buildPhotoGrid() 
    this.handleDims()
    this.buildSlidesArr()
    window.addEventListener("resize",()=>{
      this.handleDims()
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
    const thumb = document.querySelector(".photo-grid .slide-wrap")
    dimmensions.thumbnail = {
      w : thumb.offsetWidth
    }
    // console.log("dimsHandled")
    this.setState({dimmensions},()=>{
      //dimmension dependent callbacks
      this.wToH()
    })
  }
  buildSlidesArr = () => {
    let slides = this.state.slides;
    slides.push(this.state.data.imgImage.local.asset.fluid)
    slides[0].active = false;
    this.state.data.imgGallery.map((image, i)=>{
      slides.push(image.local.asset.fluid)
      image.active = false;
    })
    console.log(slides);
    this.setState({slides})

  }

  changeSlides =(slide) => {
    let active = this.state.slideQueue.active;

    const slideCount = this.state.slides.length
    let nextActive = 0;
    console.log(`active ` +active)
    if(typeof(slide) === "number"){
      if(slide < slideCount) {
        nextActive = slide;
      }
    } else if(slide === 'next'){
      console.log(`next`)
      console.log(`active ` +active)
      console.log(`active+1`);
      console.log(active+1);
      if(active+1 === slideCount){
        nextActive = 0;
        console.log(`goes over, so nextActive: `);
        console.log(nextActive);
      } else {
        nextActive = active+1;
        console.log(`nextActive: `);
        console.log(nextActive);
      }
    } else if (slide === 'prev'){
      console.log(`(slide = 'prev')`)
      if(active-1 < 0){
        nextActive = slideCount-1;
        console.log(`goes under, so nextActive: `);
        console.log(nextActive);
      } else {
        nextActive = active-1;
        console.log(`nextActive: `);
        console.log(nextActive);
      }
    }

      let nextPrev = nextActive-1 < 0 ? slideCount - 1 : nextActive-1;
      console.log(`nextPrev ` +nextPrev);
      console.log(`nextActive ` +nextActive);
      let nextNext = nextActive+1 === slideCount ? 0 : nextActive+1;
      console.log(`nextNext ` +nextNext);

      let state = this.state;
      state.slideQueue.active = nextActive
      state.slideQueue.next = nextNext
      state.slideQueue.prev = nextPrev
      this.setState({state},console.log(state))
  }

  wToH = () => {
    const thumb = this.state.thumbnail;
    thumb.style = {
      height : this.state.dimmensions.thumbnail.w
    }
    this.setState({thumb})
    // console.log("wtoh")
    // return style
    // console.log(this.state)
  }

  buildPhotoGrid(){
    // console.log(this.state.data.imgGallery)
  }

render() {
  const photoGridData = this.checkVar(()=> this.state.data.imgGallery,false);
  const buildPhotoGrid = () => {
    if(photoGridData){
      return(
        <div className="photo-grid">
      {photoGridData.map((photo, i)=>{
        const j = parseFloat(i+1);
        // console.log(photo)
        return(
        <div key={j} data-index={j} style={this.state.thumbnail.style} className="slide-wrap">
        <Image fluid={photo.local.asset.fluid}/>
        </div>
        )

      })}
      </div>)
    } else {
      return `asdfasdfasdf`
    }
  }
  const photoGrid = buildPhotoGrid()

  const link =  this.checkVar(()=> this.state.data.exLink.url,false);
  const title = this.checkVar(()=> this.state.data.exLink.title, `Visit Website`);
  const exLink = link ? (<a href={link} target="blank" title={title}>{title}</a>) : ``
  const bodyData = this.checkVar(()=> this.state.data._rawBody.split('\n'), false);
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
          active={this.state.slider}
          toggle={this.toggleSlider}
          slides={this.state.slides}
          activeSlide={0}
          style={this.state.imageSlider.style}
          changeSlides = {this.changeSlides}
        />
        <div className="project-wrap-inner">
          <div className="project-left">
            <div className="photo-grid-wrap">
              <div className="photo-grid-inner">
                <div onClick={this.toggleSlider} key={1} data-index={0} style={this.state.thumbnail.style} className="slide-wrap feat-image">
                  <Image fluid={this.state.data.imgImage.local.asset.fluid}/>
                </div>
                {photoGrid}
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
