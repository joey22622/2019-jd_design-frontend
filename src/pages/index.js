import React from "react"
import {StaticQuery, graphql, Link } from "gatsby"
// import Image from 'gatsby-image'
import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import PortfolioGrid from "../components/portfolioGrid"


// const IndexPage = ( props) => (
  class IndexPage extends React.Component{

    state = {
      bodyClass : '',
      thumbnail : {
        style : {}
      },
      dimmensions : {
        thumbnail : {}
      },
      homeLink : "/"
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
      });
      this.handleDims()
    }
    handleDims = () =>{
      let dimmensions = this.state.dimmensions;
      const thumb = this.checkVar(()=> document.querySelector(".project-link"),false);
      if(thumb){
        dimmensions.thumbnail = {
          w : thumb.offsetWidth
        }
        // console.log("dimsHandled")
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

    }



  render(){

    return (
    <StaticQuery
    query={graphql`
      {
        allSanityProject (
          sort: {
        fields: [publishedAt]
        order: DESC
      }
      ){
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
                title
                remote
                remoteStatic
              }
              imgThumb {
                _key
                _type
                local {
                  asset {
                    fluid{
                      ...GatsbySanityImageFluid
                    }
                  }
                }
                title
                remote
                remoteStatic
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
       console.log(data)
       

return(
    <Layout
    // pathname={window.location.pathname}
    // search={window.location.search}
    home={true}
    bodyClass={'home'}
    // homeLink={this.state.homeLink}
    taxonomies={""}
    coverPage={true}
    data={
      <PortfolioGrid
      data = {this.state}
      query = {query}
      wToH = {this.wToH}
      handleDims = {this.handleDims}
      />
    }
    coverPage={true}
    pageState = {this.state}
    >

      
      <SEO title="Home" />

  </Layout>
)
     }}
  />
    )
    }
}

export default IndexPage


