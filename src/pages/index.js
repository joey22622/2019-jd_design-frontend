import React from "react"
// import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ( data) => (
  <Layout>
      {console.log(data)}
    
    <SEO title="Home" />
    <h1>Hi people</h1>

  </Layout>
)

export default IndexPage
