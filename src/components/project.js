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
  }
  checkVar = (a, b) => {
    try{
      return a()
    } catch (e) {
      return b
    }
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
  const link =  this.checkVar(()=> this.state.data.exLink.url,false);
  // const link = this.state.data.exLink.url || false;
  const title = this.checkVar(()=> this.state.data.exLink.title, `Visit Website`);
  // const title = this.state.data.exLink.title || `Visit Website`;
  const exLink = link ? (<a href={link} target="blank" title={title}>{title}</a>) : ``
  const bodyData = this.checkVar(()=> this.state.data._rawBody.split('\n'), false);
  // const bodyData = this.state.data._rawBody.split('\n')|| false;
  const test = this.checkVar(()=> this.state.data.exLink.url,false)
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

      <Image fluid={this.state.data.imgImage.local.asset.fluid}/>
        </div>
      </div>
      
    )
  }
}


export default Project
