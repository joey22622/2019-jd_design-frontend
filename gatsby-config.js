module.exports = {
  siteMetadata: {
    title: `Joseph DeChant Design`,
    description: ``,
    author: `@gatsbyjs`,
  },
  pathPrefix: '/2019-jd_design-frontend',
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-162216441-1',
      },
    },

    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
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
        logo: './src/images/favicon.png',
      },
    },
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        typekit: {
          id: 'dmu1axj',
        },
      },
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
        token: `skmQKQO475UKY5T0De0blywberC7YSBWzhp3mg9UUPjxboVLJ4tO4yNysOU3TWdoUJthvOeuNhwVDx25ZvFirArSKJrPhHiIdlIzOsIGAZlfBAJSLpAWrdRdW4hSaIhwwZEYOv24GT7lMcIafiahVjZlM9e2w1ijaYrNLXQ0uNAhNgLQADwI`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
