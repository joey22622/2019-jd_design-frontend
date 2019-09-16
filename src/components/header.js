import React from "react"
import { StaticQuery, graphql } from "gatsby"

export default (props) => (
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
    render = {data => {
      const title = data.allSanityProfile.edges[0].node.title.split(" ");
      // const handlePanel = props.contactLink;
      return(
      <header>
        {console.log()}
        <nav>
          <ul className="main-navigation">
            <li key="2"><a onClick={(e)=>{props.handleNav(e)}} href="?about">About</a></li>
            <li key="1" className="link-home">
              <div className="title-wrap">
              <a href="/">
                  <span className="title-1">{title[0]} {title[1]}</span>            
                  <span className="title-2">{title[2]}</span>            
              </a>
                <div className="title-backdrop"></div>
              </div>
            </li>
            <li key="3"><a onClick={(e)=>{props.handleNav(e)}} href="?contact">Contact</a></li>
          </ul>
        </nav>
      </header>
  ) }}
  />
)