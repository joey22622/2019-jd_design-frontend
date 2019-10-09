import React from "react"
import {StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"


const IndexPage = ( props) => (
  <StaticQuery
  query={graphql`
    {
      allSanityProject {
        edges {
          node {
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
       console.log(query);
       const PortfolioGrid = () => {
        return(
          <ul className="project-index">

          {query.map((item)=>(
            //thumbnail component will go here
            <li className="project-link" key={item.node.id}>
              <div className="project-link-outer">
                <div className="project-link-inner">
                  <img src="" alt="" className="project-thumbnail"/>
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
            </li>
      ))}
      </ul>
      )
      }

return(
    <Layout
    taxonomies={""}
    data={PortfolioGrid()}
    // test = {Test()}
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


