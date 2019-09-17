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
            _rawBio
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
        const bio = profile._rawBio.split('\n');

      return(
      <section
        className="side-panel panel-left contact-panel"
        style={
          {
            height: props.height,
            marginTop: props.head,
            width: props.panelWidth,
            transform: props.transform
          }
        }
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