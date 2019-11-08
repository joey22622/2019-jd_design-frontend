import React from "react"
import {StaticQuery, graphql, Link } from "gatsby"
import Image from 'gatsby-image'
import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"


// const IndexPage = ( props) => (
  class IndexPage extends React.Component{

    state = {
      thumbnail : {
        style : {}
      },
      dimmensions : {
        thumbnail : {}
      }
    }
    checkVar = (a, b) => {
      try{
        return a()
      } catch (e) {
        return b
      }
    }
    componentDidMount(){
      window.addEventListener('resize', ()=>{
        this.handleDims()
      })
      this.handleDims()
    }
    handleDims = () =>{
      let dimmensions = this.state.dimmensions;
      const thumb = this.checkVar(()=> document.querySelector(".project-link"),false);
      if(thumb){
        dimmensions.thumbnail = {
          w : thumb.offsetWidth
        }
        console.log("dimsHandled")
        this.setState({dimmensions},()=>{
          //dimmension dependent callbacks
          this.wToH()
        })
      }
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



  render(){

    return (
    <StaticQuery
    query={graphql`
      {
        allSanityProject {
          edges {
            node {
              imgImage {
                _key
                _type
                local {
                  asset {
                    fluid{
                      ...GatsbySanityImageFluid
                    }
                  }
                }
              }
              imgGallery {
                _key
                _type
                caption
              }
              id
              title
              slug {
                _key
                _type
                current
              }
              projectType {
                title
              }
              client {
                title
              }
            }
          }
        }
      } 
      `}
  
     render={data => {
       const query = data.allSanityProject.edges
       
       const PortfolioGrid = () => {
        return(
          <ul className="project-index">

          {query.map((item, i)=>{
            // const img  = item.node.imgImage ? item.node.imgImage.local.asset.url : ``;
            const img  = item.node.imgImage.local.asset.fluid ? item.node.imgImage.local.asset.fluid : ``;

            
            // console.log(img2.local)

            // thumbnail component will go here
          return(
            <li className="project-link" key={item.node.id} style={this.state.thumbnail.style}>
              <Link to={`/${item.node.slug.current}`}>

              <div className="project-link-outer">
                <div className="project-link-inner">
                {/* {node.imgImage.local.asset.url} */}
                  {/* <img src={img} alt="" className="project-thumbnail"/> */}
                  <Image key={i} className="project-thumbnail" fluid={img}/>
                  <div className="text-wrap-outer">
                    <div className="text-wrap-inner">
                      <p className="project-text">
                        <span className="project-cat">{item.node.projectType? `${item.node.projectType.title}: ` : ``}</span>
                        <span className="project-title">{item.node.title}</span>
                      </p>
                      <p className="project-client">{item.node.client.title? `${item.node.client.title} ` : ``}</p>
                    </div>
                  </div>
                </div>
              </div>
              </Link>
            </li>
          )})}
      </ul>
      )
      }

return(
    <Layout
    taxonomies={""}
    coverPage={true}
    data={PortfolioGrid()}
    coverPage={true}
    >

      
      <SEO title="Home" />
      <h1>Hi people</h1>

  </Layout>
)
     }}
  />
    )
    }
}

export default IndexPage


