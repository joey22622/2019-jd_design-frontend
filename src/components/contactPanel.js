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
        className ={`side-panel panel-right contact-panel `}
        style={props.data.style}        
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
            <div className="link-outer-wrap">   
              <a key="contact-1" href={`tel:${contact.phone}`}>{phoneStr}</a>
            </div>
            <div className="link-outer-wrap">
              <a key="contact-2" href={`mailto:${contact.email}`}>{contact.email}</a>
            </div>
          </div>
          <div className="social-row">
            <ul className="social-list">
                <li key="social-1" className="social-link git"><a href={contact.socialLinks.urlGitHub} rel="noopener noreferrer" target="_blank"><div className="social-underlay"></div>
                <i className="icon-social_github"/>
                </a></li>
                <li key="social-2" className="social-link drib"><a href={contact.socialLinks.urlDribbble} rel="noopener noreferrer" target="_blank"><div className="social-underlay"></div>
                <i className="icon-social_dribbble"/>
                </a></li>
                <li key="social-3" className="social-link in"><a href={contact.socialLinks.urlLinkedIn} rel="noopener noreferrer" target="_blank"><div className="social-underlay"></div>
                <i className="icon-social_linkedin"/>
                </a></li>
                <li key="social-4" className="social-link be"><a href={contact.socialLinks.urlBehance} rel="noopener noreferrer" target="_blank"><div className="social-underlay"></div>
                <i className="icon-social_behance"/>
                </a></li>
            </ul>
          </div>
        </div>
        </div>
      </section>  
    )}}
  />
)