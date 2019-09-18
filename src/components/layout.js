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
      {
        key: "panelLeft",
        justify : "left",
        state : {
          active : false
        },
        style : {}
        
      },
      {
        key : "panelRight",
        justify: "right",
        state : {
          active : false
        },
        style : {}
      }
  ],

    state : {
      scroll : 0
    },
    timeouts : {
      scroll : null 
    },
  }



  // buildPanelStyle = (key, justify, active) => {
  buildPanelStyle = (elem, i) => {

      // console.log(elem);
      let justify = '';
      let transform = `translate(0px)`;
      // const elem = this.state.elements[i];
      if(!elem.state.active){
        console.log(`elem.state.active`)
        console.log(elem.state.active)
        if(elem.justify === "left"){
          justify = "-";
        } else if(elem.justify === "right") {
          justify = "";
        }
        transform = `translate(${justify}${this.state.dimmensions.panel}px)`;
      }
      const panelStyles = {
        width: this.state.dimmensions.panel,
        marginTop:  this.state.dimmensions.head,
        height: parseFloat(this.state.dimmensions.window.h - this.state.dimmensions.head), 
        transform
      }
      console.log(panelStyles);
     return panelStyles;
  }

  loadPanelStyles = () => {
    const newArr = this.state.elements.slice()
    newArr.map((elem, i) =>{
      newArr[i].style = this.buildPanelStyle(elem, i);
    })

    this.setState({elements : newArr});
  }

  handleNav = (e,key) => {
    e.preventDefault()
      const index = this.state.elements.findIndex((item) => item.key === key);
      const newArr = this.state.elements.slice();
      newArr.map((elem, i) => {
        if(i !== index){
          newArr[i].state.active = false;
        }
        newArr[i].style = this.buildPanelStyle(elem, i);
      })
      newArr[index].state.active = true;  
      this.setState({elements : newArr})
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
  componentDidUpdate(){

  }
  // panelStyleProp = (key) => {
  //   // const key = "panelLeft"
  //   const style = this.state.elements.find(item => item.key === key).style
    
  //   console.log("style")
  //   console.log(style)

  //   return(style)
  //   // return this.state.elements.find(key).style;
  //   return(key)
  // }
  componentDidMount(){
    this.handleDims();
    this.loadPanelStyles();
    window.addEventListener('scroll', this.handleScroll, true);
    window.addEventListener('resize', this.handleDims, true);
    // console.log("panelLeft")
    // this.panelStyleProp("panelLeft")
    console.log(this.state)
  }




render() {


    return ( 
      
      <>
      
        <Header
          handleNav = {this.handleNav}
        />
        <div>
          <div className="side-panels">
            <About
              style ={this.state.elements[0].style}

            />
            <Contact
              style ={this.state.elements[1].style}

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
