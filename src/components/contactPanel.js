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
                <li key="social-1" className="social-link"><a href={contact.socialLinks.urlGitHub} rel="noopener noreferrer" target="_blank">GitHub</a></li>
                <li key="social-2" className="social-link"><a href={contact.socialLinks.urlDribbble} rel="noopener noreferrer" target="_blank">Dribbble</a></li>
                <li key="social-3" className="social-link"><a href={contact.socialLinks.urlLinkedIn} rel="noopener noreferrer" target="_blank">LinkedIn</a></li>
                <li key="social-4" className="social-link"><a href={contact.socialLinks.urlBehance} rel="noopener noreferrer" target="_blank">Behance</a></li>
            </ul>
          </div>
        </div>
        </div>
      </section>
    )}}
  />
)