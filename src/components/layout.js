import '../style.scss'
import React from "react"



import Header from "./header"
import About from "./aboutPanel"
import Contact from "./contactPanel"
import CoverPage from "./coverPage"

//  const Layout = ({children}) => {
class Layout extends React.Component{
  state = {
    // pathname : this.props.pathname,
    // search : this.props.search,
    home : this.props.home,
    homeLink : '/',
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
      active : window.location.search.length > 1 ? true : false,
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
    if(this.state.panelsActive){
      e.preventDefault()
      this.handleNav()
    } else if(window.location.pathname.length <= 1){
      e.preventDefault()
      this.handleCoverPanels()
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
    
      if(elem.state.active){
        transform = `translateX(${justify}100%)`;
      }
      if(elem.state.active){
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
    let active = false;
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
          active = true;
        }
        const style = this.buildPanelStyle(elem, i);
        newArr[i].style = style.panel
        newArr[i].underlay = style.underlay
      })
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
    console.log(this.state.coverPanels.loaded)
    if(this.state.coverPanels.loaded){
    if(e){
      e.preventDefault()
    }
    let coverPanels = this.state.coverPanels;
    let test = {}

    if(this.state.coverPanels.active){
      console.log( `0 0  0 0 0 0 `)
      coverPanels.active = false;
      coverPanels.style.panels = {
        left : {transform : "translateX(0%)", transition: '.3s'},
        right : {transform : "translateX(0%)", transition: '.3s'}
      }
      coverPanels.style.text = {
        color : "#152225", 
        opacity : 0,
        transform: 'translateY(30px)'
      };
    } else {
      console.log( `100  100 100 `)

      coverPanels.active = true;
      coverPanels.style.panels = {
        left : {transform : "translateX(100%)", transition: '.3s'},
        right : {transform : "translateX(-100%)", transition: '.3s'}
      }
      coverPanels.style.text ={color : ""};

    }
    // console.log("coverPanels")
    this.setState({coverPanels})
  }
  }
  componentWillUpdate(){

  }
  componentDidUpdate(){
    const body = document.querySelector("body")
    if(this.state.home){
      body.className ="home";
    } else {
      body.className = ""
    }
  }
  oldScroll = window.pageYOffset || document.documentElement.scrollTop;
  componentDidMount(){
    console.log(window.location.pathname.length)
    console.log(`window.location.pathname.length`)
    console.log(this.state.pathname)
    this.handleDims(); 
    this.handleCoverPanels()
    window.addEventListener('resize', this.handleDims, true);
    window.addEventListener('scroll', ()=>{
      if(this.state.coverPanels.active){this.handleCoverPanels()}
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
          homeLink = {this.checkVar(()=> this.props.homeLink, `/?home`)}
          handleCover = {this.handleHomeLink}
          navCenter = {this.state.navCenter.style}
          name = {this.state.pathname}
          path = {this.state.search}
        />
        <div>
          {
          <CoverPage
          // class = {this.props.pageState.home}
          load = {this.state.coverPanels.loaded}
          style = {this.state.coverPanels.style}
          handleCoverPanels = {this.handleCoverPanels}
          />
          }
          <div className="side-panels">
          <div className="underlay-left panel-underlay"
          onClick={(e)=>{this.handleNav()}}
          style={this.state.elements[0].underlay}
          />
          <div className="underlay-right panel-underlay"
          style={this.state.elements[1].underlay}
          onClick={(e)=>{this.handleHomeLink(e)}}
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
