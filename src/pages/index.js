import React from "react"
import {StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"


const IndexPage = ( props) => (
  <StaticQuery
  query={graphql`
    {
      allSanityProfile {
        edges {
          node{
            phone
            email
            address {
              street
              city
              state
              zip
            }
            socialLinks{
              urlGitHub
              urlBehance
              urlDribbble
              urlLinkedIn
            }
          } 
        }
      }
    } 
     `}
  
     render={data => {
return(
    <Layout
    taxonomies={""}
    >
        {
          
          console.log(`DATATATATAT`)}
        {console.log(data)}
      
      <SEO title="Home" />
      <h1>Hi people</h1>

  </Layout>
)
     }}
  />
)

export default IndexPage


