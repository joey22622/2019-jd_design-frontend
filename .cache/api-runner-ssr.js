var plugins = [{
      plugin: require('/Users/graphicdesign/Sites/apps/jd_design-2019/frontend/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/graphicdesign/Sites/apps/jd_design-2019/frontend/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"gatsby-starter-default","short_name":"starter","start_url":"/","background_color":"#152225","theme_color":"#152225","display":"minimal-ui","icon":"src/images/favicon.png"},
    },{
      plugin: require('/Users/graphicdesign/Sites/apps/jd_design-2019/frontend/node_modules/gatsby-plugin-favicon/gatsby-ssr'),
      options: {"plugins":[],"logo":"./src/images/favicon.png"},
    },{
      plugin: require('/Users/graphicdesign/Sites/apps/jd_design-2019/frontend/node_modules/gatsby-source-sanity/gatsby-ssr'),
      options: {"plugins":[],"projectId":"7gyk03bt","dataset":"production","overlayDrafts":true,"watchMode":true,"token":"skmQKQO475UKY5T0De0blywberC7YSBWzhp3mg9UUPjxboVLJ4tO4yNysOU3TWdoUJthvOeuNhwVDx25ZvFirArSKJrPhHiIdlIzOsIGAZlfBAJSLpAWrdRdW4hSaIhwwZEYOv24GT7lMcIafiahVjZlM9e2w1ijaYrNLXQ0uNAhNgLQADwI"},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
