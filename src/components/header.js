import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'

export default (props) => (
  <StaticQuery
    query={graphql`
      {
        allSanityProfile {
          edges {
            node {
              _id
              title
            }
          }
        }
      }
    `}
    render={(data) => {
      const title = data.allSanityProfile.edges[0].node.title.split(' ')
      return (
        <header>
          <nav>
            <ul className='main-navigation'>
              <li
                key='2'
                onClick={(e) => {
                  props.handleNav(e, 'panelLeft')
                }}
              >
                <a
                  className={`panel-link left-link ${props.leftClass}`}
                  href='?about'
                >
                  About
                </a>
              </li>
              <li key='1' className={`link-home ${props.navCenter.active}`}>
                <div className={`title-wrap hovered-${props.hovered}`}>
                  <Link
                    className={`hovered-${props.hovered}`}
                    to={props.homeLink}
                    onMouseEnter={() => {
                      props.handleHomeHover(true)
                    }}
                    onMouseLeave={() => {
                      props.handleHomeHover(false)
                    }}
                    onClick={(e) => {
                      props.handleCover(e)
                    }}
                  >
                    <span className='title-1'>
                      {title[0]}
                      {props.name} {title[1]}
                    </span>
                    <span className='title-2'>
                      {title[2]}
                      {props.path}
                    </span>
                    <i className='icon-logo' />
                  </Link>
                  <div
                    className='title-backdrop'
                    style={props.navCenter.style}
                  />
                </div>
              </li>
              <li
                key='3'
                onClick={(e) => {
                  props.handleNav(e, 'panelRight')
                }}
              >
                <a
                  className={`panel-link right-link ${props.rightClass}`}
                  href='?contact'
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </header>
      )
    }}
  />
)
