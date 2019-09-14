import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
// import SEO from "../components/seo"

export const query = graphql`
{ 
  allSanityProfile{
   edges{
     node{
     _id
     title
     }
     }
   } 
 }`;
 console.log(query);


const IndexPage = ( data) => (
  <Layout>
      {console.log(data.data)}

    {/* <SEO title="Home" /> */}
    <h1>Hi people</h1>
    <ul>
      {/* {data.allSanityProfile.edges.map(({ node: profile}) => (
        <li key={profile._id}>
          {profile.title}
        </li>
      ))} */}
    </ul>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
