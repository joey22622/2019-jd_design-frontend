import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout"
import Project from "../components/project"


export const query = graphql`
    query ($slug : String) {
        sanityProject(slug : {current : {eq : $slug}}){
          title
          projectType {
            title
          }
          client {
            title
          }
          _rawBody
          exLink{
            title
            url
          }
          imgImage {
            _key
            local {
              asset {
                fluid{
                  ...GatsbySanityImageFluid
                }
              }
            }
          }
          imgGallery{
            _key
            local{
              asset {
                fluid {
                  ...GatsbySanityImageFluid
                }
              }
            }
          }
        }
      }   
  `

export default ({ data }) => (
      <Layout
        pathname={window.location.pathname}
        search={window.location.search}
        coverPage={false}
        homeLink={'/?home'}
        data={<Project data={data}/>}
      >
                    <h1>{data.sanityProject.title}</h1>

      </Layout>
  )

  