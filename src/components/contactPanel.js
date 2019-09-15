import React from "react"
import { StaticQuery, Link, graphql } from "gatsby"

export default () => (
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
        console.log(contact);
        let phoneStr = contact.phone.toString();

        if(phoneStr.length === 10) {
          const phone1 = contact.phone.toString().slice(0,3);
          const phone2 = contact.phone.toString().slice(3,6);
          const phone3 = contact.phone.toString().slice(6,10);
          phoneStr = `${phone1}·${phone2}·${phone3}`
        }
      return(
      <section>
        <div className="contact-inner-wrap">
          <div className="address-row"></div>
          <div className="contact-row">
            <a key="contact-1" href={`tel:${contact.phone}`}>{phoneStr}</a>
            <a key="contact-2" href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
          <div className="social-row">
            <ul className="social-list">
                <li key="social-1" className="social-link"><a href={contact.socialLinks.urlGitHub} target="_blank">GitHub</a></li>
                <li key="social-2" className="social-link"><a href={contact.socialLinks.urlDribbble} target="_blank">Dribbble</a></li>
                <li key="social-3" className="social-link"><a href={contact.socialLinks.urlLinkedIn} target="_blank">LinkedIn</a></li>
                <li key="social-4" className="social-link"><a href={contact.socialLinks.urlBehance} target="_blank">Behance</a></li>
            </ul>
          </div>
        </div>
      </section>
    )}}
  />
)