import React from 'react'
import Image from 'gatsby-image'



//  const Layout = ({children}) => {
class Project extends React.Component{
  state = {
   data : this.props.data.sanityProject,
   dimmensions : {},
   thumbnail : {
     style : {}
   }
  }
  
  componentDidUpdate(){
   
  }
  
  componentDidMount(){
    console.log(this.state.data.imgImage.local.asset.fluid)
    this.buildPhotoGrid() 
    this.handleDims()
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
    console.log("dimsHandled")
    this.setState({dimmensions},()=>{
      //dimmension dependent callbacks
      this.wToH()
    })

  }
  wToH = () => {
    const thumb = this.state.thumbnail;
    thumb.style = {
      height : this.state.dimmensions.thumbnail.w
    }
    this.setState({thumb})
    console.log("wtoh")
    // return style
    console.log(this.state)
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
        <div key={j} style={this.state.thumbnail.style} className="slide-wrap">
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
        <div className="project-wrap-inner">
          <div className="project-left">
            <div className="photo-grid-wrap">
              <div className="photo-grid-inner">
                <div key={1} data-slide={0} style={this.state.thumbnail.style} className="slide-wrap feat-image">
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
