import '../style.scss'
import React from "react"



import Header from "./header"
import About from "./aboutPanel"
import Contact from "./contactPanel"
import CoverPage from "./coverPage"

//  const Layout = ({children}) => {
class Layout extends React.Component{
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
      action  : [
        {key : "collapseNav",
        active:  false
        },  
        {key : "linkHome",
        active:  false
        },
        {key : "collapsePage",
        active:  false
        }
      ],
      style : {
      }
    },
    mainStyles :{
      style : {
        paddingTop: 100
      }
    },
    coverPanels : {
      loaded : this.props.coverPage,
      active : true,
      style : {
        panels : {
          left : {},
          right : {},
        },
        textMargin : {},
        textColor : {}
      }
    },
    forceTop : {
      ready : false,
      isScrolling : null
    },
    state : {
      scroll : 0
    },
    timeouts : {
      scroll : null 
    },
  }

  checkVar = (a, b) => {
    try{
      return a()
    } catch (e) {
      return b
    }
  }

  handleHomeLink = (e) => {
    const navCenter = this.state.navCenter
    const actions = navCenter.action.slice()
    let action;
    let nextAction = "linkHome";
    let url = window.location.pathname+window.location.search;
    // console.log(window.location.pathname+window.location.search);
    // e.preventDefault()

    actions.map((item) => {
      console.log(item);
      if(item.active){
        action = item.key
      }
    })
    if(!action || action==="linkHome"){
      console.log("linking home")

    } else {
      e.preventDefault()
      if(action==="collapseNav"){
        // console.log("collapseNav")
        this.handleNav()
        // console.log(url)
        if(url !== '/'){
          nextAction = "linkHome"
        } else {
          nextAction = "collapsePage"
        }
        // console.log("nextAction" + nextAction)
        this.updateHomeLink(nextAction)

      } else if(action==="collapsePage"){
        // console.log("collapsePage")
        this.handleCoverPanels()
      }
    }
    console.log(action)
    console.log(actions)
    // this.updateHomeLink(action)
  }
  updateHomeLink = (nextAction) => {
    console.log("next action: " + nextAction)
    let navCenter = this.state.navCenter;
    let actions = navCenter.action.slice();
    // const index = actions.findIndex((item) => item.key === nextAction);
    actions.map((item) =>{
      if(item.key === nextAction){
        item.active = true;
      } else {
        item.active = false;
      }
    })
    console.log(actions)
    navCenter.action = actions;
    // console.log(index);
    this.setState({navCenter}, console.log(this.state.navCenter))
  }
  // buildPanelStyle = (key, justify, active) => {
  buildPanelStyle = (elem, i) => {

      let justify = '';
      let transform = `translate(0px)`;
      let underlay = 0;
      //bool determining if panels are active
    
      if(!elem.state.active){
        if(elem.justify === "left"){
          justify = "-";
        } else if(elem.justify === "right") {
          justify = "";
        }
        transform = `translate(${justify}${this.state.dimmensions.panel}px)`;
      }
      if(elem.state.active){
        underlay = this.state.dimmensions.window.w;
        this.updateHomeLink("collapseNav")
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
  loadMainStyles = () => {
    let mainStyles = this.state.mainStyles;
    mainStyles.style = {paddingTop : this.state.dimmensions.head}
    this.setState({mainStyles})
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
    console.log(this.state)
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
      this.setState({elements : newArr}, ()=>{this.handleNavCenter()},()=>{console.log(this.state)})
  }
  
  handleDims = () => {
    const fullW =  window.innerWidth;
    const fullH = window.innerHeight;
    const brand = document.querySelector(".title-wrap").offsetWidth; 
    const panel =  parseFloat((fullW-brand)/2);
    const head = document.querySelector("header").offsetHeight;
    // console.log("handleDims ran")
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
        this.handleCoverText()
        this.loadMainStyles()
      }
    )
  }
  
  handleCoverText = () => {
    if(this.state.coverPanels.loaded){
    const logo = document.querySelector(".cover-panels .icon-logo_right");
    const margin = parseFloat(logo.offsetHeight + logo.getBoundingClientRect().top );
    let coverPanels = this.state.coverPanels
    coverPanels.style.textMargin = {marginTop : margin}
    this.setState({coverPanels}) 
    }
  }
  handleNavCenter = () => {
    let style = {};
    let navCenter = this.state.navCenter;
    this.state.elements.map((elem) => {
      if(elem.state.active === true){
        // console.log("true!!");
        style = {
          height : parseFloat(.8*this.state.dimmensions.window.h)
        }
      }
      navCenter.style = style;
    });
    this.setState({navCenter},()=>{
      // console.log(this.state);

    })
  }
  handleCoverPanels = (e) => {
    if(this.state.coverPanels.loaded){
    if(e){
      e.preventDefault()
    }
    let coverPanels = this.state.coverPanels;
    let test = {}

    if(this.state.coverPanels.active){
      coverPanels.active = false;
      coverPanels.style.panels = {
        left : {marginLeft : "-50vw"},
        right : {marginRight : "-50vw"}
      }
      coverPanels.style.text = {
        color : "#152225", 
        opacity : 0,
        transform: 'translateY(30px)'
      };
    } else {
      coverPanels.active = true;
      coverPanels.style.panels = {}
      coverPanels.style.text ={color : ""};

    }
    // console.log("coverPanels")
    this.setState({coverPanels})
  }
  }

  componentDidUpdate(){

  }
  oldScroll = window.pageYOffset || document.documentElement.scrollTop;
  componentDidMount(){
    this.handleDims(); 
    window.addEventListener('resize', this.handleDims, true);
    window.addEventListener('scroll', ()=>{
      // console.log
      if(this.state.coverPanels.active){this.handleCoverPanels()}
      // this.prepForceTop()
      // handles scroll up & scroll down events 
      let newScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (newScroll === 0) newScroll = 1;
      if (newScroll > this.oldScroll){
        // downscroll code

     } else {
        // upscroll code
     }
     this.oldScroll = newScroll

    })
  }
  componentWillUnmount(){
    // clearTimeout(this.scrollTimeout)
  }
 
render() {
    // console.log(args);


    return ( 
      
      <>
      
        <Header
          handleNav = {this.handleNav}
          handleCover = {this.handleHomeLink}
          navCenter = {this.state.navCenter.style}
        />
        <div>
          {
          <CoverPage
          load = {this.state.coverPanels.loaded}
          style = {this.state.coverPanels.style}
          handleCoverPanels = {this.handleCoverPanels}
          />

          }
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
          <main style={this.state.mainStyles.style}>
          {/* {children} */}
          {this.props.data}
          {this.props.test}
          </main>
          <footer>  
          </footer>
        </div>
      </>
    )
  }
}


export default Layout
