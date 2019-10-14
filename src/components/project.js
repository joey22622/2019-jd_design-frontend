import React from 'react'
import Image from 'gatsby-image'



//  const Layout = ({children}) => {
class Project extends React.Component{
  state = {
   data : this.props.data.sanityProject
  }
  
  componentDidUpdate(){

  }
  
  componentDidMount(){
    console.log(this.state.data.imgImage.local.asset.fluid)
    this.buildPhotoGrid()
  }
  checkVar = (a, b) => {
    try{
      return a()
    } catch (e) {
      return b
    }
  }

  buildPhotoGrid(){
    console.log(this.state.data.imgGallery)

  }
    // console.log(`value`)
    // console.log(value)
  
//   getSafe = (fn, defaultVal) => {
//     try {
//         console.log(`fn`)
//         console.log(fn)
//         return fn();
//     } catch (e) {
//       console.log(`e`)
//       console.log(e)
//       return defaultVal;
//     }
// }
 
render() {
  const photoGridData = this.checkVar(()=> this.state.data.exLink.url,false);
  const photoGrid = () => {
    if(photoGridData){
      pho
    } else {
      return ``
    }
  }

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
                <div key={1} className="slide-wrap feat-image">
                  <Image fluid={this.state.data.imgImage.local.asset.fluid}/>
                </div>
                {/* {photoGrid} */}
              </div>
            </div>


          </div>
          <div className="project-right">
            <div className="project-head">
              <h1><span className="project-type">{this.state.data.projectType.title}:</span> {this.state.data.title}</h1>
              <p className="project-client"><label>Client:</label> {this.state.data.client.title}</p>
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
      
    )
  }
}


export default Project
