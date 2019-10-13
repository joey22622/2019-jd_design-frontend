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
                  srcSet
                }
              }
            }
          }
        }
      }   
  `

export default ({ data }) => (
      <Layout
        coverPage={false}
        data={<Project data={data}/>}
      >
                    <h1>{data.sanityProject.title}</h1>

      </Layout>
  )

  