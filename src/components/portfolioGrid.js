import React from 'react'
import Image from 'gatsby-image'
import {Link} from 'gatsby'

class PortfolioGrid extends React.Component {
    state ={
        thumbnails : []
    }
    componentDidMount() {
        this.buildThumbArr()
    }
    toggleGIF = (i) => {
        // alert("hi");
        // alert("index " + i)
        let thumbnails = this.state.thumbnails;
        if(thumbnails[i].remote === thumbnails[i].src){
          thumbnails[i].src = thumbnails[i].remoteStatic
        } else {
           thumbnails[i].src = thumbnails[i].remote
        }
        this.setState({thumbnails});
      }
    buildThumbArr = () => {
        let thumbnails = []

        if(this.props.query){
            this.props.query.map((elem, i) => {
                let image = elem.node.imgImage;
                let thumb = {};
                console.log(elem)
                thumb.index = i;
                thumb.gif = false;
                if(image.remote){
                    thumb.gif = true;
                    thumb.remote = this.checkVar(()=> image.remote, `#`)
                    thumb.remoteStatic = this.checkVar(()=> image.remoteStatic, `#`)
                    thumb.src = this.checkVar(()=> image.remoteStatic, `#`)
                } else {
                    thumb.fluid = image.local.asset.fluid;
                }

                thumb.slug = this.checkVar(()=> elem.node.slug.current, `#`)
                thumb.type =  this.checkVar(()=> elem.node.projectType.title, ``)
                thumb.title = this.checkVar(()=> elem.node.title, ``)
                thumb.client = this.checkVar(()=> elem.node.client.title, ``)
                thumbnails.push(thumb);  
            })
            this.setState({thumbnails})
        }
    }
    checkVar = (a, b) => {  
        try{
          return a()
        } catch (e) {
          return b
        }
      }
    
    render(){
    return(
      <ul className="project-index">

      {this.state.thumbnails.length > 0 && this.state.thumbnails.map((item, i)=>(
        // const img  = item.node.imgImage ? item.node.imgImage.local.asset.url : ``;
        <li className="project-link" key={item.index} style={this.props.data.thumbnail.style}>
          <Link to={`/${item.slug}`}>

          <div className="project-link-outer">
            <div className="project-link-inner">
              {
              item.gif ?
              (<div className="project-thumbnail" onMouseOver={()=>{this.toggleGIF(i)}} onMouseOut={()=>{this.toggleGIF(i)}}><img src={item.src}/></div>)
              :
              // <Image fluid={this.props.data.data.imgImage.local.asset.fluid} alt={this.props.data.slides[0].title}/>
              <Image key={i} className="project-thumbnail" fluid={item.fluid}/>

              }
              {/* <Image key={i} className="project-thumbnail" fluid={img}/> */}
              <div className="text-wrap-outer">
                <div className="text-wrap-inner">
                  <p className="project-text">
                    <span className="project-cat">{item.type} : </span>
                    <span className="project-title">{item.title}</span>
                  </p>
                  <p className="project-client">{item.client}</p>
                </div>
              </div>
            </div>
          </div>
          </Link>
        </li>

      ))}
        </ul>
    )
    }
}

export default PortfolioGrid;