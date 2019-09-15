/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */
import '../style.scss'
import React from "react"
// import PropTypes from "prop-types"
// import { Link, graphql } from "gatsby"


import Header from "./header"
import About from "./aboutPanel"
import Contact from "./contactPanel"

//  const Layout = ({children}) => {
class Layout extends React.Component {
  state = {
    state : {
      userPath : {
        currentPage : "",
        lastPage : ""
      },
      scroll : 0
    },
    timeouts : {
      scroll : null
    }
    
  }
  
  handleScroll = () => {
    clearTimeout(this.state.timeouts.scroll);
    this.state.timeouts.scroll = setTimeout(() => {
      this.setState({state : {scroll: window.scrollY}})
    },50)
  }


  lastState = () => {
    const lastState = JSON.parse(localStorage.state)
    console.log(lastState)
  }
  componentDidUpdate(){
    // console.log("hi there" +this.state.state.scroll)
    localStorage.setItem("state", JSON.stringify(this.state.state));
    console.log(JSON.parse(localStorage.state));
  }
  componentDidMount(){
    this.lastState();
    window.addEventListener('scroll', this.handleScroll, true);
    const scrollTrue = JSON.parse(localStorage.state).scroll
    // window.scollY(JSON.parse(localStorage.state))
  }


render() {
    return (
      <>
        <Header/>
        <div>
          <div className="side-panels">
            <About/>
            <Contact/>
          </div>
          {/* <main>{children}</main> */}
          <footer>
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </>
    )
  }
}


export default Layout
