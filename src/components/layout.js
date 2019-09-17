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
    elements : [
      {panelRight : {
        justify : "right",
        state : {
          active : false
        },
        style : {}
        
      }},
      {panelLeft : {
        justify: "left",
        state : {
          active : false
        },
        style : {}
      }}
  ],

    state : {
      scroll : 0
    },
    timeouts : {
      scroll : null 
    },
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
  buildPanelStyle = (key, justify, active) => {
    if(justify === "left"){
      justify = "-";
    } else if( justify === "right") {
      justify = "";
    }
    let transform = `translate(0px)`;

    if(!active){
      transform = `translate(${justify}${this.state.dimmensions.panel}px)`;
    }
    // const panelStyles = {
      // width: this.state.dimmensions.panel,
      // marginTop:  this.state.dimmensions.head,
      // height: parseFloat(this.state.dimmensions.window.h - this.state.dimmensions.head), 
    //   transform
    // }
    // return panelStyles;
    console.log(`key`)
    console.log(key)
    console.log(`justify`)
    console.log(justify)
    console.log(`active`)
    console.log(active)
  }


  handleNav = (e,key) => {
    e.preventDefault()
    this.state.elements.map((elem, i) => {
      const keyMatch = (Object.keys(elem));
      if(keyMatch == key){
        const newArr = this.state.elements.slice();
        newArr[i][keyMatch].state.active = true;
        newArr[i][keyMatch].style = this.buildPanelStyle(key,null,true);
        this.setState({elements : newArr})
        // console.log(this.buildPanelStyle(key,null,true))
      } else {
        const newArr = this.state.elements.slice();
        newArr[i][keyMatch].state.active = false;
        newArr[i][keyMatch].style = this.buildPanelStyle(key,newArr[i][keyMatch].justify,false);
        this.setState({elements : newArr})
        // console.log(this.buildPanelStyle(key,newArr[i][keyMatch].justify,false))

      }
      // console.log(this.state.elements);
    });
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
  loadStyle = () => {
    
    const obj = {
      width: this.state.dimmensions.panel,
      marginTop:  this.state.dimmensions.head,
      height: parseFloat(this.state.dimmensions.window.h - this.state.dimmensions.head), 

    }
    console.log(obj)
  return(obj)

    // this.state.elements.map((elem, i) => {
    //   const keyMatch = (Object.keys(elem));
    //   if(keyMatch === key){
    //     return elem.style
    //   }
    // })
  }


  lastState = () => {
  }
  componentDidUpdate(){
    // localStorage.setItem("state", JSON.stringify(this.state.state));
    // console.log(JSON.parse(localStorage.state));
    // console.log(this.state)
  }
  componentDidMount(){
    this.loadStyle();
    this.lastState();
    this.handleDims();
    window.addEventListener('scroll', this.handleScroll, true);
    window.addEventListener('resize', this.handleDims, true);
    // this.handleDims
    // console.log(this.state);

    this.state.elements.map((elem, i) => {
      const keyMatch = (Object.keys(elem));
      const newArr = this.state.elements.slice();
      // console.log(`newArr`)
      // console.log(keyMatch)
      newArr[i][keyMatch].style = this.buildPanelStyle(keyMatch,newArr[i][keyMatch].justify,false);
      // this.buildPanelStyle("panelRight","right",false);
    })
  }

  handleResize = () => {
    const w = this.offsetWidth;
    // console.log(w);
  }



render() {


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
              // style ={this.style.state}
              panelWidth = {this.state.dimmensions.panel}
              head = {this.state.dimmensions.head}
              height = {parseFloat(this.state.dimmensions.window.h - this.state.dimmensions.head)}
              transform = {`translate(-${this.state.dimmensions.panel}px)`}
            />
            <Contact
              style = {this.loadStyle}
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
