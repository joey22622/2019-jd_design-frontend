module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  pathPrefix: "/2019-jd_design-frontend",
  plugins: [
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
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
      
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
