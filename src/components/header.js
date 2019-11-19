import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"

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
            <li key="2" onClick={(e)=>{props.handleNav(e, "panelLeft")}}><a href="?about">About</a></li>
            <li key="1" className="link-home">
              <div className="title-wrap">
              {/* <a onClick={(e)=>{props.handleCover(e)}} href="/"> */}
              <Link to="/?asdfa" onClick={(e)=>{props.handleCover(e)}}>
                  <span className="title-1">{title[0]} {title[1]}</span>            
                  <span className="title-2">{title[2]}</span> 
              </Link>      
              {/* </a> */}
                <div 
                className="title-backdrop"
                style={props.navCenter}
                />
              </div>
            </li>
            <li key="3" onClick={(e)=>{props.handleNav(e, "panelRight")}}><a href="?contact">Contact</a></li>
          </ul>
        </nav>
      </header>
  ) }}
  />
)