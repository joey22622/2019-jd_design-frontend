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
          body
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
            title
            caption
            remote
            remoteStatic
            exLink
            linkTitle
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
            title
            caption
            remote
            remoteStatic
            exLink
            linkTitle
          }
          projectSocial{
            urlGithub
            urlDribbble
            urlBehance
          }
          tags{
            id
            title
          }
          tech{
            id
            title
          }
        }
      }   
  `

export default ({ data }) => (
      <Layout
        // pathname={window.location.pathname}
        // search={window.location.search}
        bodyClass="project"
        coverPage={false}
        homeLink={'/?home'}
        title={data.sanityProject.title}
        data={<Project data={data}/>}
      >
        <h1>{data.sanityProject.title}</h1>
      </Layout>
  )

  