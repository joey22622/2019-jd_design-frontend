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
        style : {},
        underlay : {}
        
      },
      {
        key : "panelRight",
        justify: "right",
        state : {
          active : false
        },
        style : {},
        underlay : {}
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

      let justify = '';
      let transform = `translate(0px)`;
      let underlay = 0;
      // const elem = this.state.elements[i];
      console.log(`elem-style-func`)
      console.log(elem)
      console.log(this.state.dimmensions.window)
      if(!elem.state.active){
        // console.log(`${elem.justify} !elem.state.active`)
        // console.log(elem.state.active)
        if(elem.justify === "left"){
          justify = "-";
        } else if(elem.justify === "right") {
          justify = "";
        }
        transform = `translate(${justify}${this.state.dimmensions.panel}px)`;
      }
      if(elem.state.active){
        underlay = this.state.dimmensions.window.w;
      }
      const panelStyles = {
        panel : {
          width: this.state.dimmensions.panel,
          marginTop: this.state.dimmensions.head,
          height: parseFloat(this.state.dimmensions.window.h - this.state.dimmensions.head), 
          transform
        },
        underlay : {
          width: underlay
        }
      }
      // console.log(panelStyles);

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
    //targets element that matches key of clicked nav item
      const index = this.state.elements.findIndex((item) => item.key === key);
      //builds new [editable] array from state
      let newArr = this.state.elements.slice();
      //maps new array
      newArr.map((elem, i) => {
        //checks if array item does not match targeted array item
        if(i !== index){
          newArr[i].state.active = false;
        } else if(newArr[i].state.active === true) {
          newArr[i].state.active = false;
        } else{
          newArr[i].state.active = true;
        }


        newArr[i].style = this.buildPanelStyle(elem, i);
      })
      this.setState({elements : newArr})
  }
  
  handleDims = () => {
    const fullW =  window.innerWidth;
    const fullH = window.innerHeight;
    const brand = document.querySelector(".title-wrap").offsetWidth;
    const panel =  parseFloat((fullW-brand)/2);
    const head = document.querySelector("header").offsetHeight;
    console.log("handleDims ran")
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
    }, () => {
        this.loadPanelStyles()
      }
    )
  }

  componentDidUpdate(){

  }
  
  componentDidMount(){
    this.handleDims(); 
    this.loadPanelStyles();
    // window.addEventListener('scroll', this.handleScroll, true);
    window.addEventListener('resize', this.handleDims, true);
    // console.log("panelLeft")
    // this.panelStyleProp("panelLeft")
    console.log(this.state)
  }




render(args) {
    console.log(args);


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
