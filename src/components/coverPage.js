
import React from "react"

const CoverPage = (props) => {
    
      return(
        <div className="cover-panels" >
            <div className="panel panel-left" onClick={(e)=>{props.handleCoverPanels(e)}} style={props.style.left}>
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
            <div className="panel panel-right" onClick={(e)=>{props.handleCoverPanels(e)}} style={props.style.right}>
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
        </div>
  ) 
}
export default CoverPage; 
  
