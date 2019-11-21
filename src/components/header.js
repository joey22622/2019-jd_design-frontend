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
            <li key="2" onClick={(e)=>{props.handleNav(e, "panelLeft")}}><a className={`panel-link left-link ${props.leftClass}`} href="?about">About</a></li>
            <li key="1" className="link-home">
              <div className="title-wrap">
              {/* <a onClick={(e)=>{props.handleCover(e)}} href="/"> */}
              <Link to={props.homeLink} onClick={(e)=>{props.handleCover(e)}}>
                  <span className="title-1">{title[0]}{props.name} {title[1]}</span>            
                  <span className="title-2">{title[2]}{props.path}</span> 
              </Link>      
              {/* </a> */}
                <div 
                className="title-backdrop"
                style={props.navCenter}
                />
              </div>
            </li>
            <li key="3" onClick={(e)=>{props.handleNav(e, "panelRight")}}><a className={`panel-link right-link ${props.rightClass}`} href="?contact">Contact</a></li>
          </ul>
        </nav>
      </header>
  ) }}
  />
)