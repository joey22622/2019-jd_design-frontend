import '../style.scss'
import React from "react"



import Header from "./header"
import About from "./aboutPanel"
import Contact from "./contactPanel"

//  const Layout = ({children}) => {
class Layout extends React.Component {
  state = {
    dimmensions : {
      window : {
        h: 0,
        w: 0
      },
      panel : 0,
      brand : 0,
      head : 0
    },
    elements : {
      panelRight : {
        active : false,
        styles : {
          transform : `translate(0)`
        }
      },
      panelLeft : {
        active : false,
        styles : {
          transform : `translate(0)`
        }
      }
    },
    state : {
      scroll : 0
    },
    timeouts : {
      scroll : null 
    }
    
  }
  
  handleScroll = () => {
  }

  // handleNav = (e,key) => {
  //   e.preventDefault()
  //   this.state.elements.map((elem, i) => {
  //     if(elem[key]){
  //       console.log(Object.keys(elem))
  //       this.setState({
  //         elements :[i] active: true})
  //     }
  //   })
  //   // console.log(this.state.elements);
  // }


  handleNav = (e,key) => {
    e.preventDefault()
    console.log(this.state.elements[key])

    // console.log(this.state.el)
    // this.state.elements.map((elem,i) => {
      
    //   // this.setState()
        

    // });

    this.setState(elements.panelRight.active , true)
    console.log(this.state.elements[key])
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
    const w = this.offsetWidth;
    console.log(w);
  }



render() {


  const panelStyles = {
    width: this.state.dimmensions.panel,
    marginTop:  this.state.dimmensions.head,
    height: parseFloat(this.state.dimmensions.window.h - this.state.dimmensions.head),
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
              panelWidth = {this.state.dimmensions.panel}
              head = {this.state.dimmensions.head}
              height = {parseFloat(this.state.dimmensions.window.h - this.state.dimmensions.head)}
              transform = {`translate(-${this.state.dimmensions.panel}px)`}
            />
            <Contact
              panelWidth = {this.state.dimmensions.panel}
              head = {this.state.dimmensions.head}
              height = {parseFloat(this.state.dimmensions.window.h - this.state.dimmensions.head)}
              transform = {`translate(${this.state.dimmensions.panel}px)`}
            />
          </div>
          {/* <main>{children}</main> */}
          <footer>
          </footer>
        </div>
      </>
    )
  }
}


export default Layout
