import React from "react"



//  const Layout = ({children}) => {
class Project extends React.Component{
  state = {
   data : this.props.data.sanityProject
  }
  
  componentDidUpdate(){

  }
  
  componentDidMount(){
    console.log(this.state)
  }
 
render() {


    return ( 
      <div className="project-wrap">{this.state.data.title}</div>
      
    )
  }
}


export default Project
