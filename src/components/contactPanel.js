import React from "react"
import { StaticQuery, graphql } from "gatsby"

export default (props) => (
  <StaticQuery
    query={graphql`
    {
      allSanityProfile {
        edges {
          node{
            phone
            email
            address {
              street
              city
              state
              zip
            }
            socialLinks{
              urlGitHub
              urlBehance
              urlDribbble
              urlLinkedIn
            }
          } 
        }
      }
    } 
     `}
    render={data => {
        const contact = data.allSanityProfile.edges[0].node;
        let phoneStr = contact.phone.toString();

        if(phoneStr.length === 10) {
          const phone1 = contact.phone.toString().slice(0,3);
          const phone2 = contact.phone.toString().slice(3,6);
          const phone3 = contact.phone.toString().slice(6,10);
          phoneStr = `${phone1}·${phone2}·${phone3}`
        }
      return(
      <section 
        className ="side-panel panel-right contact-panel"
        // style={{height: `200px`}}
        style={props.style}        
      >

        <div className="panel-inner-wrap">
        <div className="contact-inner-wrap">
          <div className="address-row">
            <div className="address-wrap">
              <p className="address-line-1">{contact.address.street}</p>
              <p className="address-line-2">{contact.address.city}, {contact.address.state} {contact.address.zip}</p>
            </div>

          </div>
          <div className="contact-row">
            <a key="contact-1" href={`tel:${contact.phone}`}>{phoneStr}</a>
            <a key="contact-2" href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
          <div className="social-row">
            <ul className="social-list">
                <li key="social-1" className="social-link git"><a href={contact.socialLinks.urlGitHub} rel="noopener noreferrer" target="_blank"><div className="social-underlay"></div><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><title>social_github</title><path id="Path_6-2" data-name="Path 6-2" className="cls-1" d="M0,0V500H500V0ZM302,405c-8,1-11-4-11-8V353c0-15-5-25-11-30,36-4,73-18,73-79a61.42,61.42,0,0,0-16-43,59.57,59.57,0,0,0-2-42s-13-5-44,16a175.12,175.12,0,0,0-40-5,132.82,132.82,0,0,0-40,5c-31-20-44-16-44-16-9,22-4,38-2,42a63.23,63.23,0,0,0-16,43c0,61,37,75,73,79a34.52,34.52,0,0,0-10,21c-10,4-33,11-47-13-3-4-12-16-25-16-14,1-6,8,0,11a68.5,68.5,0,0,1,16,23c3,9,14,26,54,19v30c0,5-3,9-11,8a161,161,0,1,1,103-1Z"/></svg></a></li>
                <li key="social-2" className="social-link drib"><a href={contact.socialLinks.urlDribbble} rel="noopener noreferrer" target="_blank"><div className="social-underlay"></div><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><title>social_dribbble</title><path id="Path_5-2" data-name="Path 5-2" className="cls-1" d="M500,500H0V0H500ZM387,229a131,131,0,0,0-46-83,140.13,140.13,0,0,0-72-33,33.72,33.72,0,0,0-10-1H241c-4,1-8,1-12,2a135.73,135.73,0,0,0-83,46,140.09,140.09,0,0,0-33,72,33.66,33.66,0,0,0-1,10v18c1,4,1,8,2,12a131.06,131.06,0,0,0,46,83,140.18,140.18,0,0,0,72,33,34,34,0,0,0,10,1h18c4-1,8-1,12-2a135.81,135.81,0,0,0,83-46,140.18,140.18,0,0,0,33-72,34,34,0,0,0,1-10V241A50.41,50.41,0,0,1,387,229Zm-62-68a216.1,216.1,0,0,1-59,37c-13-21-26-41-39-62A120.82,120.82,0,0,1,325,161ZM146,198a113.26,113.26,0,0,1,55-53c2-1,2-1,3,1a617.28,617.28,0,0,1,39,60,1,1,0,0,0,1,1h0a385,385,0,0,1-106,17A71.88,71.88,0,0,1,146,198Zm4,110a107.31,107.31,0,0,1-14-39c-1-7-1-15-2-22a2.65,2.65,0,0,1,2.25-3,2.36,2.36,0,0,1,.75,0l48-3a393.45,393.45,0,0,0,68-15c1,0,1,0,2-1,4,8,8,17,12,25a229.86,229.86,0,0,0-105,74,60.8,60.8,0,0,1-12-16Zm145,49a120.25,120.25,0,0,1-56,9,109.63,109.63,0,0,1-62-25,216.78,216.78,0,0,1,97-69c0,1,1,1,1,2a442.37,442.37,0,0,1,22,79C298,355,297,356,295,357Zm24-13a400,400,0,0,0-22-77c8-4,53-3,68,2a121.68,121.68,0,0,1-46,75Zm-31-98c-4-9-8-18-13-28a222.66,222.66,0,0,0,65-41,115.2,115.2,0,0,1,26,69,204.78,204.78,0,0,0-78,0Z"/></svg></a></li>
                <li key="social-3" className="social-link in"><a href={contact.socialLinks.urlLinkedIn} rel="noopener noreferrer" target="_blank"><div className="social-underlay"></div><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><title>social_linkedin</title><path id="Path_7-2" data-name="Path 7-2" className="cls-1" d="M500,500H0V0H500ZM181,208H128V366h53Zm2-52a23,23,0,0,0-12-18,26.18,26.18,0,0,0-17-5c-3,0-6,1-8,1A26.76,26.76,0,0,0,125,160a25.08,25.08,0,0,0,15,24,38,38,0,0,0,21,2,22.35,22.35,0,0,0,15-8,28,28,0,0,0,7-22ZM367,260a71.55,71.55,0,0,0-7-25,49.52,49.52,0,0,0-34-29,81.62,81.62,0,0,0-27-1,43.59,43.59,0,0,0-21,9,107.61,107.61,0,0,0-14,16h0V208H211V365h53V275a29.41,29.41,0,0,1,4-16,25.43,25.43,0,0,1,23-14,30.79,30.79,0,0,1,13,3,21.51,21.51,0,0,1,9,12,56.54,56.54,0,0,1,3,18v87h53v-1c0-29,0-98-2-104Z"/></svg></a></li>
                <li key="social-4" className="social-link be"><a href={contact.socialLinks.urlBehance} rel="noopener noreferrer" target="_blank"><div className="social-underlay"></div><svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500"><title>social_behance</title><path id="Path_12-2" data-name="Path 12-2" className="cls-1" d="M128,233l-1-47c17,0,35-1,51,0a60.17,60.17,0,0,1,12,2,18.23,18.23,0,0,1,14,14c4,20-5,29-22,31-17,1-36,1-53,1a1,1,0,0,1-1-1Zm65,40a56.54,56.54,0,0,0-18-3H126v57h49a67.43,67.43,0,0,0,14-2,23.41,23.41,0,0,0,17-15,42.72,42.72,0,0,0,2-19A21.58,21.58,0,0,0,193,273Zm153-42c-18,1-34,17-33,33h69a32.35,32.35,0,0,0-31.45-33.23,32.93,32.93,0,0,0-4.55.2ZM500,0V500H0V0ZM304,178h87V157H304Zm-56,93a53,53,0,0,0-21-21l-6-3a21.49,21.49,0,0,0,5-3c17-11,22-27,21-46-2-29-22-46-48-50-5-1-8-1-13-2H77V363H185c6-1,13-2,19-3a61.81,61.81,0,0,0,49-56A48.44,48.44,0,0,0,248,271Zm177,0c-1-4-1-7-2-11-5-26-18-46-43-56a102.4,102.4,0,0,0-46-5c-26,4-45,16-55,40a100,100,0,0,0-5,66,62.29,62.29,0,0,0,32,45,90.29,90.29,0,0,0,72,8,63.53,63.53,0,0,0,40-32,67.08,67.08,0,0,0,6-15H385c-2,0-4,1-4,3a38.54,38.54,0,0,1-15,13,38,38,0,0,1-21,2,35,35,0,0,1-31-38,86.58,86.58,0,0,0,17,1h94Z"/></svg></a></li>
            </ul>
          </div>
        </div>
        </div>
      </section>
    )}}
  />
)