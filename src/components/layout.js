import '../style.scss'
import React from "react"



import Header from "./header"
import About from "./aboutPanel"
import Contact from "./contactPanel"

//  const Layout = ({children}) => {
class Layout extends React.Component {
  state = {
    test : "this is a test",
    dimmensions : {
      window : {
        h: 0,
        w: 0
      },
      panel : 0,
      brand : 0,
      head : 0
    },
    state : {
      userPath : {
        currentPage : "blahblah",
        lastPage : ""
      },
      scroll : 0
    },
    timeouts : {
      scroll : null 
    }
    
  }
  
  handleScroll = () => {
    // clearTimeout(this.state.timeouts.scroll);
    // this.setState({timeouts: {scroll : setTimeout(() => {
    //   this.setState({state : {scroll: window.scrollY}})
    // },1000)}})
  }
  handleNav = (e) => {
    e.preventDefault()
    alert("hi")

  }
  handleDims = () => {
    const fullW =  window.innerWidth;
    const fullH = window.innerHeight;
    const brand = document.querySelector(".title-wrap").offsetWidth;
    const panel =  parseFloat((fullW-brand)/2);

    const head = document.querySelector("header").offsetHeight;

    this.setState({
      dimmensions : {
        window : {
          h: fullH,
          w: fullW
        },
        panel,
        brand,
        head
      }
    });
  }


  lastState = () => {
  }
  componentDidUpdate(){
    localStorage.setItem("state", JSON.stringify(this.state.state));
    // console.log(JSON.parse(localStorage.state));
    console.log(this.state)
  }
  componentDidMount(){
    this.lastState();
    this.handleDims();
    window.addEventListener('scroll', this.handleScroll, true);
    window.addEventListener('resize', this.handleDims, true);
    // this.handleDims
  }

  handleResize = () => {
    alert("hi");
    const w = this.offsetWidth;
    console.log(w);
  }



render() {

  const panelStyles = {
    width: this.state.dimmensions.panel,
    marginTop:  this.state.dimmensions.head,
    minHeight: parseFloat(this.state.dimmensions.window.h - this.state.dimmensions.head)
  }
  
  

    return ( 
      
      <>
      
        <Header
          onResize={this.handleResize}
          handleNav = {this.handleNav}
          test = {this.state.test}
        />
        <div>
          <div className="side-panels">
            <About
              sharedStyles = {panelStyles}
              // panelWidth = {this.state.dimmensions.panel}
              // head = {this.state.dimmensions.head}
              // height = {parseFloat(this.state.dimmensions.window.h - this.state.dimmensions.head)}
            />
            <Contact
              // panelWidth = {this.state.dimmensions.panel}
              // head = {this.state.dimmensions.head}
              // height = {parseFloat(this.state.dimmensions.window.h - this.state.dimmensions.head)}
              // transform = {`translate(${this.state.dimmensions.panel})`}
              sharedStyles = {panelStyles}
            />
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
