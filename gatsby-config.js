module.exports = {
  siteMetadata: {
    title: `Joseph DeChant Design`,
    description: ``,
    author: `@gatsbyjs`,
  },
  pathPrefix: "/2019-jd_design-frontend",
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-162216441-1",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        // exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
        // Enables Google Optimize using your container Id
        optimizeId: "GTM-P8FPPQK",
        // Enables Google Optimize Experiment ID
        experimentId: "Z9jt8FzlRKaPRi5QZQZPrA",
        // Set Variation ID. 0 for original 1,2,3...
        // variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
        // Any additional optional fields
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        // cookieDomain: "example.com",
      },
    },

    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#152225`,
        theme_color: `#152225`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
      
    },
    {    
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/images/favicon.png",
      }
    },
      `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        typekit: {
          id: 'dmu1axj'
        }
      }
    },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: '7gyk03bt',
        dataset: 'production',
        // a token with read permissions is required
        // if you have a private dataset
        overlayDrafts: true,
        watchMode: true,
        token: `skmQKQO475UKY5T0De0blywberC7YSBWzhp3mg9UUPjxboVLJ4tO4yNysOU3TWdoUJthvOeuNhwVDx25ZvFirArSKJrPhHiIdlIzOsIGAZlfBAJSLpAWrdRdW4hSaIhwwZEYOv24GT7lMcIafiahVjZlM9e2w1ijaYrNLXQ0uNAhNgLQADwI`
        // token: "skeSAty9rko9U46l9WBx2MQJVd8touQz8PhBjRlD3ktkACoAkywi4PlBPwrTdziiuDA96KkvsgukU5dfBSxPFeaVlvrQsJmTSEWzDsmQK2cMh9CAanZJZLoZTHYQwYQIVFahOSeWcCfqu8Hmyd4A44BIlZnfI1uBwMdxzu873v1UMIO3XUop"
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`, 
    
  ],
}
