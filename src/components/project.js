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
    socialLinks : {}
  }
  
  
  buildSocialArr = () => {
    const socialLinks = this.state.socialLinks;
    const data = this.props.data.sanityProject.projectSocial;
    socialLinks.behance = this.checkVar(()=> data.urlBehance, false)
    socialLinks.dribbble = this.checkVar(()=> data.urlDribbble, false)
    socialLinks.github = this.checkVar(()=> data.urlGithub, false)
    this.setState({socialLinks},console.log(this.state.socialLinks))
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
    this.buildSocialArr()
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
    let slides = this.state.slides;
    if(slides[i].remote === slides[i].src){
      slides[i].src = slides[i].remoteStatic
    } else {
       slides[i].src = slides[i].remote
    }
    this.setState({slides});
  }
  buildPushSlide = (arr, elem, i) => {
    let slide = {}
    slide.index = i;
    slide.gif = false
    if(elem.remote){
      slide.remote = this.checkVar(()=> elem.remote, `#`)
      slide.remoteStatic = this.checkVar(()=> elem.remoteStatic, `#`)
      slide.src = this.checkVar(()=> elem.remoteStatic, `#`)
      slide.gif = true
    // } else if(elem.local.asset.fluid) {
    }
    slide.fluid = this.checkVar(()=> elem.local.asset.fluid, false);

    slide.title = this.checkVar(()=> elem.title, false);
    slide.caption = this.checkVar(()=> elem.caption, false);
    slide.exLink = this.checkVar(()=> elem.exLink, false);
    slide.linkTitle = this.checkVar(()=> elem.linkTitle, slide.exLink);
    arr.push(slide);
  }

  buildSlidesArr = () => {
    let slides = this.state.slides;
    this.buildPushSlide(slides,this.state.data.imgImage,0);

    if(this.state.data.imgGallery.length > 0){
      this.state.data.imgGallery.forEach((image, i)=>{
        let j = i + 1;
        this.buildPushSlide(slides,image,j);
      })
    }
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


  const link =  this.checkVar(()=> this.state.data.exLink.url,false);
  const title = this.checkVar(()=> this.state.data.exLink.title, `Visit Website`);
  const exLink = link ? (<a href={link} target="_blank" rel="noopener noreferrer" title={title}>{title}</a>) : ``
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
        {this.state.slides.length &&

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
        }
        <div className="project-wrap-inner">
          <div className="project-left">
            <div className="photo-grid-wrap">
              <div className="photo-grid-inner">
              {this.state.slides.length > 0 &&
                <div onClick={()=>{this.toggleSlider(0)}}  onMouseOver={()=>{this.changeSlides(0); this.toggleGIF(0)}} onMouseOut={()=>{this.toggleGIF(0)}} key={1} data-index={0} style={this.state.thumbnail.style} className="slide-wrap feat-image">
                  {
                  this.state.slides[0].gif ?
                  <div><img src={this.state.slides[0].src} alt={this.state.slides[0].title} /></div>
                  :
                  this.state.slides[0] && <Image fluid={this.state.slides[0].fluid} alt={this.state.slides[0].title}/>
                  }
                </div>
                  }                  
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
                <h1><span className="project-type">{this.state.data.projectType.title}</span> <span className="project-name">{this.state.data.title}</span></h1>
                <p className="project-client"><label>Client</label> {this.state.data.client.title}</p>
                <ul className="project-tags">
                  {
                    this.state.data.tags.length > 0 && this.state.data.tags.map((elem, i)=>{
                    return(
                    <li key={elem._id} className="project-tag">{`${elem.title}${i < this.state.data.tags.length-1 ? `, ` : ``}`}</li>
                    )})
                  }
                </ul>
                {exLink}
              </div>
              <div className="project-body-wrap">
              {body()}
              </div>
              <div className="project-social-wrap">
                <div className="social-inner-wrap">
                  {this.state.socialLinks.github && 
                  <div className="social-icon git-icon">
                    <a href={this.state.socialLinks.github} rel="noopener noreferrer" target="_blank" title="GitHub Repository" className="social-link">
                    <i className="icon-social_github"i/>
                    </a>
                  </div>}
                  {this.state.socialLinks.dribbble && 
                  <div className="social-icon drib-icon">
                    <a href={this.state.socialLinks.dribbble} rel="noopener noreferrer" target="_blank" title="Dribbble Post" className="social-link">
                    <i className="icon-social_dribbble"i/>
                    </a>
                  </div>}
                  {this.state.socialLinks.behance && 
                  <div className="social-icon be-icon">
                    <a href={this.state.socialLinks.behance} rel="noopener noreferrer" target="_blank" title="Behance Post" className="social-link">
                    <i className="icon-social_behance"i/>
                    </a>
                  </div>}
                </div>
              </div>
              <div className="tech">
                <label>Tech</label>
              <ul className="tech-list">
                  {
                    this.state.data.tech.length > 0 && this.state.data.tech.map((elem, i)=>{
                      return(
                      <li className="tech-list-item">{`${elem.title}${i < this.state.data.tech.length-1 ? `, ` : ``}`}</li>
                    )})
                  }
              </ul>

              </div>
            </div>
          </div>

        </div>
      </div>
      
    )
  }
}


export default Project
