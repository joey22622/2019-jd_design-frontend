import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/layout"


export const query = graphql`
    query ($slug : String) {
        sanityProject(slug : {current : {eq : $slug}}){
          title
        }
      }   
  `

export default ({ data }) => (
      <Layout
        coverPage={false}
      >
                    <h1>{data.sanityProject.title}</h1>

      </Layout>
  )

  