// import React from 'react'
// import Image from 'gatsby-image'

// class PortfolioGrid extends React.Component {
//     render(){
//     return(
//       <ul className="project-index">

//       {query.map((item, i)=>{
//         // const img  = item.node.imgImage ? item.node.imgImage.local.asset.url : ``;
//         const photo = {}
//         const elem = item.node.imgImage
//         let gif = false
        
//         if(elem.remote){
//           photo.remote = this.checkVar(()=> elem.remote, `#`)
//           photo.remoteStatic = this.checkVar(()=> elem.remoteStatic, `#`)
//           photo.src = this.checkVar(()=> elem.remoteStatic, `#`)
//           gif = true;
//         } else {
//           photo.fluid = elem.local.asset.fluid;
//         }
//         photo.title = this.checkVar(()=> elem.title, false);
//       return(
//         <li className="project-link" key={item.node.id} style={this.state.thumbnail.style}>
//           <Link to={`/${item.node.slug.current}`}>

//           <div className="project-link-outer">
//             <div className="project-link-inner">
//               {
//               gif ?
//               (<div className="project-thumbnail" onMouseOver={()=>{this.toggleGIF(i)}} onMouseOut={()=>{this.toggleGIF(i)}}><img src={photo.src}/></div>)
//               :
//               // <Image fluid={this.state.data.imgImage.local.asset.fluid} alt={this.state.slides[0].title}/>
//               <Image key={i} className="project-thumbnail" fluid={photo.fluid}/>

//               }
//               {/* <Image key={i} className="project-thumbnail" fluid={img}/> */}
//               <div className="text-wrap-outer">
//                 <div className="text-wrap-inner">
//                   <p className="project-text">
//                     <span className="project-cat">{item.node.projectType? `${item.node.projectType.title} : ` : ``}</span>
//                     <span className="project-title">{item.node.title}</span>
//                   </p>
//                   <p className="project-client">{item.node.client.title? `${item.node.client.title} ` : ``}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           </Link>
//         </li>
//       )}}