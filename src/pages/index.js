import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Layout from '../components/layout'
import PortfolioGrid from '../components/portfolioGrid'

class IndexPage extends React.Component {
  state = {
    bodyClass: '',
    thumbnail: {
      style: {},
    },
    dimmensions: {
      thumbnail: {},
    },
    homeLink: '/',
  }
  checkVar = (a, b) => {
    try {
      return a()
    } catch (e) {
      return b
    }
  }
  componentDidMount() {
    window.addEventListener('resize', () => {
      this.handleDims()
    })
    this.handleDims()
  }
  handleDims = () => {
    let dimmensions = this.state.dimmensions
    const thumb = this.checkVar(
      () => document.querySelector('.project-link'),
      false
    )
    if (thumb) {
      dimmensions.thumbnail = {
        w: thumb.offsetWidth,
      }
      this.setState({ dimmensions }, () => {
        this.wToH()
      })
    }
  }
  wToH = () => {
    const thumb = this.state.thumbnail
    thumb.style = {
      height: this.state.dimmensions.thumbnail.w,
    }
    this.setState({ thumb })
  }

  render() {
    return (
      <StaticQuery
        query={graphql`
          {
            allSanityProject(sort: { fields: [publishedAt], order: DESC }) {
              edges {
                node {
                  imgImage {
                    _key
                    _type
                    local {
                      asset {
                        fluid {
                          ...GatsbySanityImageFluid
                        }
                      }
                    }
                    title
                    remote
                    remoteStatic
                  }
                  imgThumb {
                    _key
                    _type
                    local {
                      asset {
                        fluid {
                          ...GatsbySanityImageFluid
                        }
                      }
                    }
                    title
                    remote
                    remoteStatic
                  }
                  imgGallery {
                    _key
                    _type
                    caption
                  }
                  id
                  title
                  slug {
                    _key
                    _type
                    current
                  }
                  projectType {
                    title
                  }
                  client {
                    title
                  }
                }
              }
            }
          }
        `}
        render={(data) => {
          const query = data.allSanityProject.edges

          return (
            <Layout
              home={true}
              bodyClass={'home'}
              taxonomies={''}
              coverPage={true}
              title={'Home'}
              data={
                <PortfolioGrid
                  data={this.state}
                  query={query}
                  wToH={this.wToH}
                  handleDims={this.handleDims}
                />
              }
              pageState={this.state}
            ></Layout>
          )
        }}
      />
    )
  }
}

export default IndexPage
