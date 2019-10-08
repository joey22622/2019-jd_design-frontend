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
  oldScroll = window.pageYOffset || document.documentElement.scrollTop;
  isScrolling = null
  autoScroll = false;
  prepForceTop = () => {
    window.clearTimeout( this.isScrolling );
    let forceTop = this.state.forceTop;
        // Set a timeout to run after scrolling ends'
        this.isScrolling = setTimeout(() => {

          // Run the callback
          const top = window.pageYOffset;
          if(top === 0){
            this.autoScroll = true;
            window.scrollTo(0, 100);
            forceTop.ready = true;
          } else {
            forceTop.ready = false;
          }
          this.setState({forceTop}, console.log(this.state.forceTop))

        }, 50);
      
  }
  lauchForceTop = () => {
    // if
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
        this.handleCoverText()
      }
    )
  }
  
  handleCoverText = () => {
    const logo = document.querySelector(".cover-panels .icon-logo_right");
    const margin = parseFloat(logo.offsetHeight + logo.getBoundingClientRect().top );
    let coverPanels = this.state.coverPanels
    coverPanels.style.textMargin = {marginTop : margin}
    console.log(margin)
    // this.setState({coverPanels}) 
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
    console.log("coverPanels")
    this.setState({coverPanels},
      ()=>{
        console.log(this.state.coverPanels)
      })
  }

  componentDidUpdate(){

  }
  
  componentDidMount(){
    this.handleDims(); 
    // this.loadPanelStyles();
    window.addEventListener('resize', this.handleDims, true);
    window.addEventListener('scroll', ()=>{
      console.log("scrolling")
      if(!this.autoScroll){
      if(this.state.coverPanels.active){this.handleCoverPanels()}
      this.prepForceTop()
      // handles scroll up & scroll down events 
      let newScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (newScroll === 0) newScroll = 1;
      console.log(`newScroll ${newScroll}`)
      console.log(`oldScroll ${this.oldScroll}`)


      if (newScroll > this.oldScroll){
        // downscroll code

     } else {
        // upscroll code
        console.log(this.state.forceTop.ready)
        if(this.state.forceTop.ready === true){
          console.log(`forceTop runs`)
          }
  
     }
     this.oldScroll = newScroll
    } else {
      setTimeout(()=>{this.autoScroll=false},500)
    }
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
          // style = {this.state.coverPanels.style}
          // handleCoverPanels = {this.handleCoverPanels}
          style = {this.state.coverPanels.style}
          handleCoverPanels = {this.handleCoverPanels}
          />
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
          <main>
          {/* {children} */}
          Maecenas sed diam eget risus varius blandit sit amet non magna. Etiam porta sem malesuada magna mollis euismod. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas sed diam eget risus varius blandit sit amet non magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec ullamcorper nulla non metus auctor fringilla. Sed posuere consectetur est at lobortis. Nulla vitae elit libero, a pharetra augue. Donec sed odio dui. Sed posuere consectetur est at lobortis.

Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Maecenas faucibus mollis interdum. Nullam quis risus eget urna mollis ornare vel eu leo. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Etiam porta sem malesuada magna mollis euismod. Sed posuere consectetur est at lobortis.
          </main>
          <footer>  
          </footer>
        </div>
      </>
    )
  }
}


export default Layout
