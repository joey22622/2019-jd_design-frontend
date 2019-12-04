
import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Image from 'gatsby-image'

export default (props) => (
  <StaticQuery
    query={graphql`
    {
      allSanityProfile {
        edges {
          node {
            title
            bio
            portrait {
              _key
              _type
              asset {
    
                fluid {
                  ...GatsbySanityImageFluid

                }
              }
              hotspot {
                x
                y
              }
            }
              
            
          }
        }
      }
    } 
     `}
    render={data => {
        const profile = data.allSanityProfile.edges[0].node;
        const bio = profile.bio.split('\n');

      return(
      <section
        className="side-panel panel-left about-panel"
        style={props.style}
        >
        <div className="panel-inner-wrap">

        <div className="portrait-wrap">
          <Image
          imgStyle = {
            {
            //  objectPosition :  `${x}% ${y}%`

            }
          } 
          fluid={profile.portrait.asset.fluid}/>
        </div>
        <div className="bio-wrap">
          {bio.map((p, i) => 
            (
              <p key={i}>{p}</p>
            )

          )}
        </div>
        </div>
      </section>
    )}}
  />
)