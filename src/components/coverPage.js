
import React from "react"

const CoverPage = (props) => {
    
      return(
        <div className="cover-panels" >
            <div 
            style={props.style.textMargin} 
            className="name-wrap">
              <span className="line-1" style={props.style.text}>Joseph DeChant</span>
              <span className="line-2" style={props.style.text}>Design</span>
            </div>
            <div className="panel panel-left" onClick={(e)=>{props.handleCoverPanels(e)}} style={props.style.panels.left}>
              <div className="icon-cutout-wrap">
                <div className="y-margin top-margin"></div>
                <div className="center-row">
                  <div className="x-margin left-margin"></div>
                    <div className="icon-svg-wrap">
                      <i className="icon-logo_left"></i>
                    </div>
                  <div className="x-margin right-margin"></div>
                  </div>
                <div className="y-margin bottom-margin"></div>
              </div>
            </div>
            <div className="panel panel-right" onClick={(e)=>{props.handleCoverPanels(e)}} style={props.style.panels.right}>
            <div className="icon-cutout-wrap">
                <div className="y-margin top-margin"></div>
                <div className="center-row">
                  <div className="x-margin left-margin"></div>
                    <div className="icon-svg-wrap">
                      <i className="icon-logo_right"></i>
                    </div>
                  <div className="x-margin right-margin"></div>
                  </div>
                <div className="y-margin bottom-margin"></div>
              </div>
            </div>
        </div>
  ) 
}
export default CoverPage; 
  
