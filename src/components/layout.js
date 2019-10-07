import '../style.scss'
import React from "react"



import Header from "./header"
import About from "./aboutPanel"
import Contact from "./contactPanel"
import CoverPage from "./coverPage"

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
      },
  ],
  navCenter : {
      style : {
      }
  },
  coverPanels : {
    active : true,
    style : {
      left : {},
      right : {}
    }
  },

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
      //bool determining if panels are active
      // let center = {height : "hi"};
      // const elem = this.state.elements[i];
      // console.log(`elem-style-func`)
      // console.log(elem)
      // console.log(this.state.dimmensions.window)
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
        // center
      }
      // console.log(panelStyles.center);


     return panelStyles;
  }

  loadPanelStyles = () => {
    const newArr = this.state.elements.slice()
    let center = {}
    newArr.map((elem, i) =>{
      const style = this.buildPanelStyle(elem, i);
      newArr[i].style = style.panel
      newArr[i].underlay = style.underlay
      // center.style = style.center
    })

    this.setState({elements : newArr});
  }

  handleNav = (e,key) => {
    if(e){
      e.preventDefault()
    }
    //targets element that matches key of clicked nav item
      const index = this.state.elements.findIndex((item) => item.key === key);
      //builds new [editable] array from state
      let newArr = this.state.elements.slice();
      // let center = {}

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
        const style = this.buildPanelStyle(elem, i);
        newArr[i].style = style.panel
        newArr[i].underlay = style.underlay
      })
      this.setState({elements : newArr}, ()=>{this.handleNavCenter()})
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
  handleNavCenter = () => {
    let center = {};
    this.state.elements.map((elem) => {
      if(elem.state.active === true){
        console.log("true!!");
        center = {
          height : parseFloat(.8*this.state.dimmensions.window.h)
        }
      }
    });
    this.setState({navCenter : {style : center}},()=>{
      console.log(this.state);

    })
  }
  handleCoverPanels = (e) => {
    if(e){
      e.preventDefault()
    }
    let active = true;
    let style = {left:{},right:{}};
    if(this.state.coverPanels.active){
      active = false;
      style = {
        left : {marginLeft : "-50vw"},
        right : {marginRight : "-50vw"}
      }
    }
    console.log("coverPanels")
    this.setState({coverPanels : {active, style}},
      ()=>{console.log(this.state.coverPanels)})
  }

  componentDidUpdate(){

  }
  
  componentDidMount(){
    this.handleDims(); 
    this.loadPanelStyles();
    window.addEventListener('resize', this.handleDims, true);
    window.addEventListener('scroll', ()=>{
      if(this.state.coverPanels.active){this.handleCoverPanels()}
    })

  }




render() {
    // console.log(args);


    return ( 
      
      <>
      
        <Header
          handleNav = {this.handleNav}
          handleCover = {this.handleCoverPanels}
          navCenter = {this.state.navCenter.style}
        />
        <div>
          <CoverPage
          style = {this.state.coverPanels.style}
          handleCoverPanels = {this.handleCoverPanels}
          />
          {/* <div className="cover-panels" >
            <div className="panel panel-left" onClick={(e)=>{this.handleCoverPanels(e)}} style={this.state.coverPanels.style.left}>
              <div class="icon-cutout-wrap">
                <div class="y-margin top-margin"></div>
                <div class="center-row">
                  <div class="x-margin left-margin"></div>
                    <div class="icon-svg-wrap">
                      <i class="icon-logo_left"></i>
                    </div>
                  <div class="x-margin right-margin"></div>
                  </div>
                <div class="y-margin bottom-margin"></div>
              </div>
            </div>
            <div className="panel panel-right" onClick={(e)=>{this.handleCoverPanels(e)}} style={this.state.coverPanels.style.right}>
            <div class="icon-cutout-wrap">
                <div class="y-margin top-margin"></div>
                <div class="center-row">
                  <div class="x-margin left-margin"></div>
                    <div class="icon-svg-wrap">
                      <i class="icon-logo_right"></i>
                    </div>
                  <div class="x-margin right-margin"></div>
                  </div>
                <div class="y-margin bottom-margin"></div>
              </div>
            </div>
          </div> */}
          <div className="side-panels">
          <div className="underlay-left panel-underlay"
          onClick={()=>{this.handleNav()}}
          style={this.state.elements[0].underlay}
          />
          <div className="underlay-right panel-underlay"
          style={this.state.elements[1].underlay}
          onClick={()=>{this.handleNav()}}
          />

            <About
              style ={this.state.elements[0].style}
              underlay = {this.state.elements[0].underlay}

            />
            <Contact
              style ={this.state.elements[1].style}
              underlay = {this.state.elements[1].underlay}

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
