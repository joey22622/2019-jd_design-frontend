import '../style.scss'
import React from "react"
import SEO from "../components/seo"
import Header from "./header"
import About from "./aboutPanel"
import Contact from "./contactPanel"
import CoverPage from "./coverPage"

class Layout extends React.Component{
  state = {
    page :  {
      path : `/`,
      hash : ``
    },
    bodyClass : "home",
    path : 'home',
    panelsActive : false,
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
        active : false,
        style : {},
        underlay : {}
        
      },
      {
        key : "panelRight",
        justify: "right",
        active : false,
        style : {},
        underlay : {}
      },
    ],
    navCenter : {
      active: false,
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
        paddingTop: `50px`,
        minHeight: `100vh`
      }
    },
    coverPanels : {
      loaded : this.props.coverPage,
      active : false,
      style : {
        panels : {},
        textMargin : {},
        text : {}
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
    homeHover : {
      hoverClass : false
    }
  }

  checkVar = (a, b) => {
    try{
      return a()
    } catch (e) {
      return b
    }
  }
  handleHomeHover = (bool) => {
    let homeHover = this.state.homeHover;
    homeHover.hoverClass = bool;
    console.log(this.state.homeHover);
    this.setState({homeHover});
  }
  handleHomeLink = (e) => {
    if(this.state.panelsActive){
      e.preventDefault()
      this.handleNav()
    } else if(this.state.page.path.length < 2) {
      e.preventDefault()
      this.handleCoverPanels()
    
      // this.setState({bodyClass : "home"})
    }
  } 

  buildPanelStyle = (elem, i) => {

      let justify = '';
      if(elem.justify === "left"){
        justify = "";
      } else if(elem.justify === "right") {
        justify = "-";
      }
      let transform = `translateX(0)`;
      let underlay = `translateX(0)`;
      //bool determining if panels are active
    
      if(elem.active){
        transform = `translateX(${justify}100%)`;
      }
      if(elem.active){
        underlay = `translateX(${justify}100%)`;
        // this.updateHomeLink("collapseNav")
      }


      const panelStyles = {
        panel : {
          width: this.state.dimmensions.panel,
          marginTop: this.state.dimmensions.head,
          height: parseFloat(this.state.dimmensions.window.h - this.state.dimmensions.head), 
          transform
        },
        underlay : {
          transform: underlay
        }
        // center
      }
      // console.log(panelStyles.center);


     return panelStyles;
  }  
  loadMainStyles = () => {
    let mainStyles = this.state.mainStyles;
    mainStyles.style = {
      paddingTop : this.state.dimmensions.head,
      minHeight : this.state.dimmensions.window.h - this.state.dimmensions.head
    }
    this.setState({mainStyles})
  }

  loadPanelStyles = () => {
    const newArr = this.state.elements.slice()
    newArr.forEach((elem, i) =>{
      const style = this.buildPanelStyle(elem, i);
      newArr[i].style = style.panel
      newArr[i].underlay = style.underlay
    })

    this.setState({elements : newArr});
  }

  handleNav = (e,key) => {
    if(e){
      e.preventDefault()
    }
    let active = false;
    //targets element that matches key of clicked nav item
      const index = this.state.elements.findIndex((item) => item.key === key);
      //builds new [editable] array from state
      let newArr = this.state.elements.slice();
      // let center = {}

      //maps new array
      newArr.forEach((elem, i) => {
       
        if(i !== index){
          newArr[i].active = false;
        } else if(newArr[i].active === true) {
          newArr[i].active = false;
        } else{
          newArr[i].active = true;
          active = true;
        }
        const style = this.buildPanelStyle(elem, i);
        newArr[i].style = style.panel
        newArr[i].underlay = style.underlay
      })
      const underlay = document.querySelector(".panel-underlay").offsetHeight/2 - window.innerHeight/2;
      document.querySelector(".underlay-left").scrollTo(0,underlay);
      document.querySelector(".underlay-right").scrollTo(0,underlay);

      // window.scrollTo(0,100)

      this.setState({elements : newArr}, ()=>{this.handleNavCenter()},()=>{console.log(this.state)})
      this.setState({panelsActive : active});
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
  checkHome = () => {
    
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
    navCenter.active = false;
    this.state.elements.forEach((elem) => {
      if(elem.active === true){
        style = {
          height : parseFloat(.8*this.state.dimmensions.window.h)
        }
        navCenter.active = true;
      }
      navCenter.style = style;
    });
    this.setState({navCenter},()=>{
      // console.log(this.state);

    })
  }
  handleCoverPanels = (e, init) => {
    if(this.state.coverPanels.loaded){
    if(e){
      e.preventDefault()
    }
    let coverPanels = this.state.coverPanels;
    coverPanels.style.text = {transition: '.3s'}
    coverPanels.style.panels = {transition: '.3s'}
    
    if(!init){
    if(this.state.coverPanels.active){
        coverPanels.active = false;
  
     } else {
        coverPanels.active = true;
      }
    }
      this.setState({coverPanels}) 
    }
  }
  
  componentDidUpdate(){
    const body = document.querySelector("body")
    if(this.state.page.path.length < 2 && this.state.page.hash.length <= 0){
      body.className = `home`
    } else {
      body.className = this.props.bodyClass;
    }
  }
  componentDidMount(){
    let state = this.state;
    let page = state.page;
    page.path = window.location.pathname;
    page.hash = window.location.hash;
    this.handleHomeHover(false)
    
    if(page.path.length < 2 && page.hash.length <= 0){
      state.coverPanels.active = true;
    } else {
      state.coverPanels.active = false;
    }
    this.setState({state},(e)=>{
    this.handleDims(); 
    this.handleNav()
    this.handleCoverPanels(e, true)
    window.addEventListener('resize', this.handleDims, true);
    window.addEventListener('scroll', ()=>{
      if(this.state.coverPanels.active){this.handleCoverPanels()}
    })
  })
  }

render() {

    return ( 
      
      <>
        <SEO
          title="sasdf"
        />
        <Header
          handleNav = {this.handleNav}
          homeLink = {'/#portfolio'}
          handleCover = {this.handleHomeLink}
          navCenter = {this.state.navCenter}
          handleHomeHover = {this.handleHomeHover}
          // name = {this.state.pathname}
          // path = {this.state.search}
          leftClass = {this.state.elements[0].active}
          rightClass = {this.state.elements[1].active}
          hovered = {this.state.homeHover.hoverClass}
        />
        <div>
          {
          <CoverPage
          data = {this.state.coverPanels}
          load = {this.state.coverPanels.loaded}
          style = {this.state.coverPanels.style}
          handleCoverPanels = {this.handleCoverPanels}
          />
          }
          <div className="side-panels">
          <div className="underlay-left panel-underlay"
          onClick={(e)=>{this.handleHomeLink(e)}}
          onScroll={()=>{this.handleNav()}}
          style={this.state.elements[0].underlay}
          ><div className="underlay-inner"/></div>
          <div className="underlay-right panel-underlay"
          style={this.state.elements[1].underlay}
          onClick={(e)=>{this.handleHomeLink(e)}}
          onScroll={()=>{this.handleNav()}}
          ><div className="underlay-inner"/></div>

            <About
              data ={this.state.elements[0]}
            />
            <Contact
              data ={this.state.elements[1]}
            />
          </div>
          <main style={this.state.mainStyles.style}>
          {/* {children} */}
          {this.props.data}
          {this.props.test}
          <div className="site-backdrop"></div>
          </main>
          <footer>  
          </footer>
        </div>
      </>
    )
  }
}


export default Layout


/*
issue: disable coverPage unless already at arriving at

*/