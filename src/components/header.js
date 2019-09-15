import React from "react"
import { StaticQuery, Link, graphql } from "gatsby"

export default () => (
  <StaticQuery
    query={graphql`
    { 
      allSanityProfile{
       edges{
         node{
         _id
         title
         }
         }
       } 
     }`}
    render={data => {
      const title = data.allSanityProfile.edges[0].node.title.split(" ");
      return(
      <header>
        {console.log()}
        <nav>
          <ul className="main-navigation">
            <li key="2"><Link to="?about">About</Link></li>
            <li key="1" className="link-home">
              <div className="title-wrap">
              <Link to="/">
                  <span className="title-1">{title[0]} {title[1]}</span>            
                  <span className="title-2">{title[2]}</span>            
              </Link>
                <div className="title-backdrop"></div>
              </div>
            </li>
            <li key="3"><Link to="?contact">Contact</Link></li>
          </ul>
        </nav>
        <h1></h1>
      </header>
  ) }}
  />
)