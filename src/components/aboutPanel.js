import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from 'gatsby-image'

export default () => (
  <StaticQuery
    query={graphql`
    {
      allSanityProfile {
        edges {
          node {
            title
            _rawBio
            portrait {
              asset{
                fluid{
                  ...GatsbySanityImageFluid
                }
              }
            }
          }
        }
      }
    } 
     `}
    render={data => {
        const profile = data.allSanityProfile.edges[0].node;
        const bio = profile._rawBio.split('\n');
      return(
      <section>

        <div className="portrait-wrap">
          <Image fluid={profile.portrait.asset.fluid}/>
        </div>
        <div className="bio-wrap">
          {bio.map((p) => 
            (
              <p>{p}</p>
            )

          )}
        </div>
      </section>
    )}}
  />
)