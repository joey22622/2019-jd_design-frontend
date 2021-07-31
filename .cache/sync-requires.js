const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/graphicdesign/Sites/portfolio_revisions_2021/2019-jd_design-frontend/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/graphicdesign/Sites/portfolio_revisions_2021/2019-jd_design-frontend/src/pages/404.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/graphicdesign/Sites/portfolio_revisions_2021/2019-jd_design-frontend/src/pages/index.js"))),
  "component---src-templates-project-js": hot(preferDefault(require("/Users/graphicdesign/Sites/portfolio_revisions_2021/2019-jd_design-frontend/src/templates/project.js")))
}

